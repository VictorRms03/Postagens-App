<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'content', 'user_id'];

    /**
     * Get the user who owns the post
     * 
     * @return User owner
     */
    public function user() {
        return $this->belongsTo(User::class);
    }
}
