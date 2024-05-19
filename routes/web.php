<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/{id}/delete', [WelcomeController::class,'destroy'])->name('delete');
Route::post('/{id}/update', [WelcomeController::class,'update'])->name('update');
Route::post('/store', [WelcomeController::class,'store'])->name('store');
Route::get('/create', [WelcomeController::class,'create'])->name('create');
Route::get('/', [WelcomeController::class,'index'])->name('index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Like Dislike
    Route::post('posts/{post}/like',[CommentController::class,'like'])->name('posts.like');
    Route::post('posts/{post}/dislike',[CommentController::class,'dislike'])->name('posts.dislike');
    // Comment store
    Route::post('comment/{id}/store',[CommentController::class,'store'])->name('comments.store');
    Route::post('/comments/delete/{commentId}', [CommentController::class, 'destroy'])->name('comments.destroy');
    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
