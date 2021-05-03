<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Recipe;
use App\Models\UserList;
// use App\Models\RecipeUserList;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($userListId)
    {
        // $response = auth()->user()->userlist()->recipe()->get();

        // return response($response, 201);
        // $userlist = UserList::find($userListId);
        // $recipes = UserList::find($userListId)->recipes()->get();

        // foreach ($userlist->recipes as $recipe) {
        //     $recipes[] += $recipe->pivot->created_at;
        // }

        // $recipes = UserList::with('recipes')->get();

        // $response = $recipes;
        // return response($response, 200);
        return UserList::find($userListId)->recipes()->get();

        // return Recipe::all();
        // return auth()->user()->userlist()->recipe()->where('user_lists_id', $userListId)->get();
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
            'recipe_nr' => 'required',
            // 'user_lists_id' => 'required',
        ]);
        
        // Search if recipe exist in this userlist
        $ulSearch = UserList::find($id)->recipes()->where('recipe_nr', $request->recipe_nr)->get();
        if (!$ulSearch->isEmpty()) {
            return 'recipe already exist in this list';
        }

        // Search if recipe exist in database
        $dbSearch = Recipe::where('recipe_nr', $request->recipe_nr)->get();
        if (!$dbSearch->isEmpty()) {
            // Add recipe to userlist but not db
            UserList::find($id)->recipes()->attach($dbSearch[0]->id);
            return 'recipe added to userlist';
        }

        $recipe = Recipe::create($request->all());
        UserList::find($id)->recipes()->attach($recipe->id);

        // return RecipeUserList::create([
        //     'recipe_id' => $recipe->id,
        //     'user_list_id' => $id,
        // ]);

        // $recipeUserList = new RecipeUserList();
        // $recipeUserList->recipe_id = $recipe->id;
        // $recipeUserList->user_list_id = $id;
        // $recipeUserList->save();

        // $response = $recipe->id;
        // return response($response, 200);
        return $recipe;
        // return Recipe::create([
        //     'recipe_nr' => $request->recipe_nr,
        //     'user_lists_id' => $request->user_lists_id
        // ]);
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
        UserList::find($userListId)->recipes()->detach($recipeId);

        return Recipe::destroy($recipeId);
    }
}
