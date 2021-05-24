<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\UserList;
use App\Models\RecipeUserList;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'image',
        'imageType',
        'title',
    ];


    // Relationships

    /**
    * Get the list for the recipes.
    */
    public function userlists()
    {
        // return $this->belongsToMany(UserList::class, 'recipe_user_list', 'recipe_id', 'user_list_id');
        return $this->belongsToMany(UserList::class);
    }
}
