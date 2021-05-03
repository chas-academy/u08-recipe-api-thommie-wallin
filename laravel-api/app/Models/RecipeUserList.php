<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RecipeUserList extends Pivot
{
    protected $fillable = [
        'recipe_id',
        'user_list_id',
    ];
}
