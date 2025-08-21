<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    
    /**
     * Get all posts with User infos.
     * 
     * @param Request
     * @return JsonResponse with all posts with user 'id' and 'name'.
     */
    public function posts(Request $request) {

        // Getting all posts from Database
        $posts = Post::with('user:id,name')->get();

        return response()->json($posts);
    }

    /**
     * Creates a new post associated with the authenticated user.
     * 
     * @param Request
     * @return JsonResponse
     */
    public function store(Request $request) {
        
        // Validating request parameters
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
        ]);

        // Creates new post
        $post = $request->user()->posts()->create($validated);

        return response()->json($post->load('user:id,name'), 201);
    }
}
