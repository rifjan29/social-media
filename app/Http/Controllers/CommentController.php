<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function like(Request $request, Post $post) {
        $like = Like::updateOrCreate(
            ['user_id' => Auth::id(), 'post_id' => $post->id],
            ['type' => 'like']
        );

        // return response()->json(['success' => 'You liked the post.']);
    }

    public function dislike(Request $request, Post $post)
    {
        $dislike = Like::updateOrCreate(
            ['user_id' => Auth::id(), 'post_id' => $post->id],
            ['type' => 'dislike']
        );

        // return response()->json(['success' => 'You disliked the post.']);
    }


    public function store(Request $request, $postId)
    {
        $request->validate([
            'comment' => 'required|string',
        ]);

        $post = Post::findOrFail($postId);

        $comment = new Comment;
        $comment->content = $request->input('comment');
        $comment->user_id = Auth::id();
        $comment->post_id = $post->id;
        $comment->save();

        return redirect()->back()->with('success', 'Comment added successfully');
    }

    public function destroy($commentId)
    {
        $comment = Comment::findOrFail($commentId);

        if ($comment->user_id !== Auth::id()) {
            return redirect()->back()->with('error', 'You do not have permission to delete this comment');
        }

        $comment->delete();

        return redirect()->back()->with('success', 'Comment deleted successfully');
    }
}
