<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Recipe;

class UserList extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'user_id',
    ];
    

    // Relationships

    /**
    * Get the recipes for the list.
    */
    public function recipes()
    {
        // return $this->belongsToMany(Recipe::class, 'recipe_user_list', 'user_list_id', 'recipe_id');
        return $this->belongsToMany(Recipe::class);
    }
}
