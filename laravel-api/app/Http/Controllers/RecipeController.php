<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Recipe;
use App\Models\UserList;
use App\Models\RecipeUserList;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($userListId)
    {
        $response = UserList::find($userListId)->recipes()->get();
        return response($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $request->validate([
            'id' => 'required',
            'image' => 'required',
            'imageType' => 'required',
            'title' => 'required',            
        ]);
        
        // Search if recipe exist in this userlist
        $ulSearch = UserList::find($id)->recipes()->where('recipe_id', $request->id)->get();
        if (!$ulSearch->isEmpty()) {
            return response(202);
        }

        // Search if recipe exist in database
        $dbSearch = Recipe::where('id', $request->id)->get();
        
        if (!$dbSearch->isEmpty()) {
            // Add recipe to userlist but not db
            UserList::find($id)->recipes()->attach($dbSearch[0]->id);
            return response(201);
        }

        $recipe = Recipe::create($request->all());
        UserList::find($id)->recipes()->attach($request->id);
        return response(201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Recipe::find($id);
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
        $recipe = Recipe::find($id);
        $recipe->update($request->all());
        return $recipe;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($recipeId, $userListId)
    {
        $recipe = Recipe::find($recipeId);
        $userList = UserList::find($userListId);

        if ($recipe && $userList) {
            // Delete recipe from this list
            UserList::find($userListId)->recipes()->detach($recipeId);

            // Search if recipe exists on other lists
            $result = Recipe::find($recipeId)->userlists()->first();

            if ($result) {
                return $recipe;
            } else {
                Recipe::destroy($recipeId);
            }
            return $recipe;
        }
        return abort(400);
    }
}
