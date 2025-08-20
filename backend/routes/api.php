<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;

/**
 * Route to login
 */
Route::post('/login', [LoginController::class, 'login']);

/**
 * Route to list all posts of an author
 */
Route::get('/posts', [PostController::class, 'posts']);

/**
 * Route to create a new post
 */
Route::middleware('auth:sanctum')->group( function() {
    Route::post('/posts', [PostController::class, 'store']);
});