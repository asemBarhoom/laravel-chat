<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use App\Events\ChatEvent;
use Auth;
class ChatController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth');
	}

    public function chat()
    {
    	return view('chat');
    }

    public function send(Request $request)
    {
    	 // return $request->all();
    	$user = User::find(Auth::id());
    	// event(new ChatEvent($request->message,$user));
        $this->saveToSession($request);
        ChatEvent::dispatch($request->message,$user);
    }

    // public function saveToSession($request)
    // {
    //     session()->put('chat',$request->message);
    // }

    public function getOldMessages()
    {
        return session('chat');
    }

    public function saveToSession(Request $request)
    {
        session()->put('chat',$request->chat);
    }
    public function deleteSession()
    {
        session()->forget('chat');
    }


}
