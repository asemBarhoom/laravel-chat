<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   <meta name="csrf-token" content="{{ csrf_token() }}">


    <link rel="stylesheet" type="text/css" href="{{asset('css/app.css')}}">
    <title>Laravel</title>       
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <style>
    html, body {
        background-color: #fff;
        color: #636b6f;
        font-family: 'Nunito', sans-serif;
        font-weight: 200;
        height: 100vh;
        margin: 0;
    }

    .full-height {
        height: 100vh;
    }

    .flex-center {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    .position-ref {
        position: relative;
    }         
    .list-group
    {
        overflow-y: scroll;
        height: 200px;
    }
</style>
</head>
<body>
    <div class="flex-center position-ref full-height" id="app">
      
      <div class="container text-center">
          <div class="row">
            <div class="col">
               <li class="list-group-item active">Chat Room - <span class="badge badge-success badge-pill">@{{ numOfUsers }} Active</span></li>
                <ul class="list-group" v-chat-scroll>
                 
                  <message v-for="value , index in chat.message"  key=value.index
                  :color=chat.color[index] 
                  :user=chat.user[index]
                  :time=chat.time[index]
                  > @{{value}}</message>
                  
              </ul>
              <small class="badge badge-danger badge-pill">@{{ typing }}</small>
<input type="text" class="form-control" placeholder="Type Here . . . " v-model='message' @keyup.enter='send'>
<a href="" @click.prevent='deleteSession' class="btn btn-danger btn-sm">delete chat</a>
              
          </div>
          
      </div>
  </div>
</div>


<!-- Scripts  -->
<script src="{{asset('js/app.js')}}"></script>

</body>
</html>
