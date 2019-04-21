
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

 require('./bootstrap');

 window.Vue = require('vue');

// ES6
import Vue from 'vue'
// scroll
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
// tostaer

import Toaster from 'v-toaster'

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-toaster/dist/v-toaster.css'

// optional set default imeout, the default is 10000 (10 seconds).
Vue.use(Toaster, {timeout: 5000})


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('message', require('./components/message.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

 const app = new Vue({
  el: '#app',
  data:{
   message:'',
   chat:{
    message:[],
    user:[],
    color:[],
    time:[]
  },
  typing:'',
  numOfUsers:''
},
watch:{
  message(){
    Echo.private('chat')
    .whisper('typing', {
      name: this.message
    });
  }
},
methods:{
 send(){
  if (this.message.length!=0) {
    this.chat.message.push(this.message);
    this.chat.color.push('success');
    this.chat.user.push('you');
    this.chat.time.push(this.getTime());

    axios.post('/send', {
      message:this.message,
      chat:this.chat
    })
    .then(response=>{
      console.log(response);
      this.message=''

    })
    .catch(error=>{
      console.log(error);
    });
  }
},
getOldMessages(){
 axios.post('/getOldMessages').then(response=>{

  if (response.data!='') {
    this.chat = response.data ;
  }
});
},
deleteSession(){
 axios.post('/deleteSession').then(response=>{
  this.$toaster.error('deleted done . .');
  this.chat=''
   // axios.get('/chat').then(response=>{});
 });
},
getTime(){
  let time = new Date();
  return time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
}
},

mounted(){
  this.getOldMessages();  
  Echo.private('chat')
  .listen('ChatEvent', (e) => {
    this.chat.message.push(e.message);
    this.chat.user.push(e.user.name);     
    this.chat.color.push('info');
    this.chat.time.push(this.getTime());

    axios.post('/saveToSession' , {
      chat : this.chat
    }).then(response=>{

    });

  },

  )
  .listenForWhisper('typing', (e) => {
   if (e.name !='') {
     this.typing = "t y p i n g  - n o w  .   .   .";
   }else
   this.typing = ''
 });
  // joining & leaving

  Echo.join('chat')
  .here((users) => {
    this.numOfUsers = users.length ;

        // console.log(users);
      })
  .joining((user) => {
    this.numOfUsers +=1;
        // console.log(user.name);
        this.$toaster.success(user.name+' | Join Now .');
      })
  .leaving((user) => {
   this.numOfUsers-=1;
        // console.log(user.name);
        this.$toaster.warning(user.name+' | Leave .');
      });
},

});
