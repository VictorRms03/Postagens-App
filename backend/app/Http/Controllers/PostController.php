<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    
    public function index() {
        return Post::with('user:id, name')->latest()->get();
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
