<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserList;

class UserListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $response = auth()->user()->userlist()->get();
        return response($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required'
        ]);
        
        $response = UserList::create([
            'title' => $request->title,
            'user_id' => auth()->user()->id
        ]);

        return response($response, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return UserList::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $userlist = UserList::find($id);
        $userlist->update([
            'title' => $request->title,
            'user_id' => auth()->user()->id
        ]);
        return $userlist;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $response = UserList::find($id);
        UserList::find($id)->recipes()->detach();
        UserList::destroy($id);

        return response($response, 200);
    }

    /**
     * Search the specified resource from storage.
     *
     * @param  str  $title
     * @return \Illuminate\Http\Response
     */
    public function search($title)
    {
        // return UserList::where('title', 'like', '%'.$title.'%')->get();
        return auth()->user()->userlist()->where('title', 'like', '%'.$title.'%')->get();
    }
}
