<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $table = 'post';
    protected $fillable = [
        'content',
        'image',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class,'user_id');
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function likeCount()
    {
        return $this->likes()->where('type', 'like')->count();
    }

    public function dislikeCount()
    {
        return $this->likes()->where('type', 'dislike')->count();
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->with('user');
    }
}
