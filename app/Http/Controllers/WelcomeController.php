<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('user','comments')->latest()->get()->map(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'image' => $post->image,
                'like_count' => $post->likeCount(),
                'dislike_count' => $post->dislikeCount(),
                'user' => $post->user,
                'comments' => $post->comments
            ];
        });
        return Inertia::render('Welcome',[
            'user' => auth()->user(),
            'DataKonten' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'content' => 'required',
            'image' => 'mimes:png,jpg,jpeg',
        ]);
        try {
            DB::beginTransaction();
            $tambah = new Post;
            $tambah->content = $request->get('content');
            if ($request->has('image')) {
                $date = Carbon::now()->format('his');
                $file = $request->file('image');
                $filename = 'thumbnail-'.$date.'.'.$file->extension();
                $file->storeAs('public/image',$filename);
                $tambah->image = $filename;
            }
            $tambah->user_id = Auth::user()->id;
            $tambah->save();
            DB::commit();
            return Redirect::route('index')->with('success','Data Berhasil Disimpan');
        } catch (Exception $th) {
            return $th;

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $this->validate($request,[
            'content' => 'required',
        ]);
        try {
            DB::beginTransaction();
            $update = Post::find($id);
            $update->content = $request->get('content');
            // if ($request->has('image')) {
            //     $date = Carbon::now()->format('his');
            //     $file = $request->file('image');
            //     $filename = 'thumbnail-'.$date.'.'.$file->extension();
            //     $file->storeAs('public/image',$filename);
            //     $update->image = $filename;
            // }
            $update->user_id = Auth::user()->id;
            $update->save();
            DB::commit();
            return Redirect::route('index')->with('success','Data mengganti Disimpan');
        } catch (Exception $th) {
            return $th;

        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $delete = Post::find($id);
        $delete->delete();
        return Redirect::route('index')->with('success','Data Terhapus');
    }
}
