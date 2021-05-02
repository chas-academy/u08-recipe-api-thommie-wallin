<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\UserList;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'recipe_nr',
        'user_lists_id'
    ];


    // Relationships

    /**
    * Get the list for the recipes.
    */
    public function userlist()
    {
    return $this->belongsToMany(UserList::class);
    }
}
