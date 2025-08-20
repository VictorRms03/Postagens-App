<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;

Route::post('/login', [LoginController::class, 'login']);
Route::get('/posts/{user}', [PostController::class, 'postsByAuthor']);

Route::middleware('auth:sanctum')->group( function() {
    Route::post('/posts', [PostController::class, 'store']);
});