<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;

class PostController extends Controller
{
    
    public function postsByAuthor(User $user) {
        return $user->posts()->with('user:id, name')->get();
    }

    public function store(Request $request) {
        
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
        ]);

        $post = $request->user()->posts()->create($validated);

        return response()->json($post->load('user:id, name'), 201);
    }
}
