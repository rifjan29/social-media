import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Button, Card, Dropdown } from 'flowbite-react';

const Post = ({ post, auth }) => {
    const { post: submit, setData, errors } = useForm({ content: '' });
    const [isEditing, setIsEditing] = useState(false);

    // like
    const handleLike = () => {
        setData('type', 'like');
        submit(route('posts.like', post.id), { preserveScroll: true });
    };

    // dislike
    const handleDislike = () => {
        setData('type', 'dislike');
        submit(route('posts.dislike', post.id), { preserveScroll: true });
    };

    // comment
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        submit(route('comments.store', post.id), {
            data: {
                content: submit.content,
            },
            reset: true,
            preserveScroll: true,
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
        setData('content', post.content);
    };
    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        submit(route('update', post.id), {
            data: {
                content: submit.content,
            },
            reset: true,
            preserveScroll: true,
        });
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this post?')) {
            submit(route('delete', post.id));
        }
    };

    return (
        <Card className='mb-4'>
            <div className='flex justify-between'>
                <div className='flex content-center items-center'>
                    <img className="w-10 h-10 rounded" src="https://flowbite-react.com/images/people/profile-picture-5.jpg" alt="Default avatar"/>
                    <div className='flex flex-col'>
                        <span className='ms-2 font-bold text-lg'>{post.user.name}</span>
                        <span className='ms-2 font-serif text-xs'>{post.user.username}</span>
                    </div>
                </div>
                <div>
                    {auth != null && (
                        <Dropdown label=":">
                            <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleDelete}>Hapus</Dropdown.Item>
                        </Dropdown>
                    )}
                </div>

            </div>
            <div>
                {isEditing ? (
                    <div className='border p-3 bg-gray-100'>
                        <textarea
                            name="content"
                            className='block mb-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={submit.content}
                            onChange={(e) => setData('content', e.target.value)}
                        />
                        <div className='flex gap-3'>
                            <Button onClick={handleUpdate}>Update</Button>
                            <Button color="red" onClick={handleCancel}>Cancel</Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <img
                            src={
                                "/storage/image/" +
                                post.image
                            }
                            className="rounded"
                        />
                        <p className='font-sans mt-5'>{post.content}</p>
                    </div>
                )}
            </div>
            <hr />
            <div className="flex space-x-4 border p-4">
                <Button color="blue" onClick={handleLike}>{post.like_count} Likes</Button>
                <Button color="red" onClick={handleDislike}>{post.dislike_count} Dislikes</Button>
            </div>
            <div className='border p-4 bg-gray-100'>
                <div className="mt-4">
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            className='block mb-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            name="comment"
                            placeholder="Add a comment..."
                            onChange={(e) => setData('comment', e.target.value)}
                        />
                        <Button type="submit">Add Comment</Button>
                        {errors.comment && <div>{errors.comment}</div>}
                    </form>
                </div>
                <div className="mt-4">
                    {post.comments.map((comment) => (
                        <div key={comment.id} className="border-t pt-2">
                            <div className="flex justify-between">
                                <div>
                                    <strong>{comment.user.name}</strong>
                                    <p>{comment.content}</p>
                                </div>
                                <div>
                                    {auth != null && (
                                        <>
                                            {comment.user_id === auth.id && (
                                                <Button color='red' onClick={() => submit(route('comments.destroy', comment.id))}>
                                                    Delete
                                                </Button>
                                            )}
                                        </>

                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default function Posts({ posts, auth }) {
    return (
        <div className="max-w-4xl mx-auto">
            {posts.map((post) => (
                <Post key={post.id} post={post} auth={auth} />
            ))}
        </div>
    );
}
