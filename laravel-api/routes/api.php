<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserListController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\AuthController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });



// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function() {
  
  Route::post('/logout', [AuthController::class, 'logout']);

  Route::get('/userlist', [UserListController::class, 'index']);
  Route::get('/userlist/{id}', [UserListController::class, 'show']);
  Route::get('/userlist/search/{title}', [UserListController::class, 'search']);
  Route::post('/userlist', [UserListController::class, 'store']);
  Route::put('/userlist/{id}', [UserListController::class, 'update']);
  Route::delete('/userlist/{id}', [UserListController::class, 'destroy']);

  Route::get('/recipe/{id}', [RecipeController::class, 'index']);
  Route::post('/recipe/{id}', [RecipeController::class, 'store']);
  Route::put('/recipe/{id}', [RecipeController::class, 'update']);
  Route::delete('/recipe/{recipeId}/fromlist/{userListId}', [RecipeController::class, 'destroy']);
});
