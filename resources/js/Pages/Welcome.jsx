import { Link, Head, useForm } from '@inertiajs/react';
import { Avatar, Button, Card, Dropdown, Modal, Navbar } from 'flowbite-react';
import DropdownComponent from '@/Components/Dropdown';
import { useState } from 'react';
import Logo from '../../../public/img/bullhorn.png'
import InputError from '@/Components/InputError';
import Posts from './Posts';

export default function Welcome({ auth,user ,DataKonten ,session }) {
    const [openModal, setOpenModal] = useState(false);
    // simpan post konten
    const {setData,post, errors} = useForm({
        content: "",
        image: null
    });

    const postData = (e) => {
        e.preventDefault();
        post(route("store"));
    }

    // image change
    const [selectedImage, setSelectedImage] = useState();
    const imageChange = (e) => {
        setData("image", e.target.files[0]);
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0])
        }
    }
    return (
        <>
         <Navbar fluid rounded>
            <Navbar.Brand as={Link} href={route('index')}>
                <img src={Logo} alt="Logo" className='w-10' />
                <span className="self-center whitespace-nowrap text-xl font-bold text-blue-800 dark:text-white ms-2">Curhatin</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <ul className="font-medium flex flex-col lg:items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 dark:px-4">
                {auth.user ? (
                    <li>
                       <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                auth.user.gambar ? (

                                    <Avatar alt="User settings" img={"/storage/profile/" +
                                    auth.user.gambar} rounded />
                                    ) : (
                                    <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                                )
                            }
                            >
                            <Dropdown.Header>
                                <span className="block text-sm">{user.name}</span>
                                <span className="block truncate text-sm font-medium">{auth.user.email}</span>
                            </Dropdown.Header>
                            <Dropdown.Item href={route('profile.edit')}>Profile</Dropdown.Item>
                            <Dropdown.Divider />
                            <DropdownComponent.Link href={route('logout')} method="post" as="button">
                                Log Out
                            </DropdownComponent.Link>
                        </Dropdown>
                        </div>
                    </li>
                ) : (

                    <>
                        <li>
                            <Link href={route('login')} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link href={route('register')} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                                Register
                            </Link>
                        </li>
                    </>
                 )}
                </ul>
            </Navbar.Collapse>
            </Navbar>
            <Head title="Welcome" />
            <div className="relative h-fit bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="max-w-4xl mx-auto p-6 lg:p-8 space-y-5">
                {session.success && (
                    <div
                        className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                        role="alert"
                        >
                        <svg
                            className="flex-shrink-0 inline w-4 h-4 mr-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">Berhasil!</span> {session.success}
                        </div>
                    </div>

                )}
                {session.error && (
                    <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        <span className="font-medium">Danger alert!</span> {session.error}.
                    </div>


                )}
                    {auth.user ? (
                        <>
                            <Card>
                                <div className='space-y-4'>
                                    <div className='flex content-between items-center'>
                                        <div className=''>
                                            <div className=' flex'>
                                                <img className="w-10 h-10 rounded" src="https://flowbite-react.com/images/people/profile-picture-5.jpg" alt="Default avatar"/>
                                                <div className='flex flex-col'>
                                                    <span className='ms-2 font-bold'>{user.name}</span>
                                                    <span className='ms-2 font-thin text-xs'>{user.username}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        <div className="flex justify-end pt-6 mt-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                            <Button onClick={() => setOpenModal(true)}>Tambah Content</Button>
                                        </div>
                                    <hr />


                                </div>

                            </Card>
                            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                                <Modal.Header>Curhatan</Modal.Header>
                                <Modal.Body>

                                    <form
                                        encType="multipart/form-data"
                                        onSubmit={postData}>
                                        <div className="space-y-6">
                                            <div>
                                                        <label
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            htmlFor="user_avatar"
                                                        >
                                                            Post Hari Ini
                                                        </label>
                                                        <textarea
                                                                    id="content"
                                                                    rows="4"
                                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    placeholder="Curhatan hari ini..."
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "content",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                >
                                                        </textarea>
                                                        <InputError
                                                            message={errors.image}
                                                            className="mb-2"
                                                        />
                                            </div>
                                            <div className="mb-3">
                                                <figure className="max-w-lg">
                                                    <img
                                                        className="h-auto w-1/2 rounded-lg"
                                                        src={selectedImage == null ? "https://flowbite.com/docs/images/examples/image-1@2x.jpg" : URL.createObjectURL(selectedImage)}
                                                        alt="image description"
                                                    />
                                                    <figcaption className="mt-2 mb-4 text-sm text-start text-gray-500 dark:text-gray-400">
                                                        Image caption
                                                    </figcaption>
                                                </figure>
                                                <label
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    htmlFor="user_avatar"
                                                >
                                                    Upload Thumbnail
                                                </label>
                                                <input
                                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                    aria-describedby="user_avatar_help"
                                                    id="image"
                                                    type="file"
                                                    name='image'
                                                    accept=".png, .jpg, .jpeg"
                                                    onChange={imageChange}
                                                />
                                                <div
                                                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                                    id="user_avatar_help"
                                                >
                                                Upload Thumbnail dengan format png
                                                </div>
                                                <InputError
                                                    message={errors.image}
                                                    className="mb-2"
                                                />
                                            </div>
                                            <div className="flex justify-end pt-6 mt-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                <Button color='blue' type='submit' >Simpan</Button>
                                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                                    Decline
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </Modal.Body>
                            </Modal>
                        </>
                    ) : (
                        ''
                    )}
                    <Posts posts={DataKonten} auth={user}/>
                    {/* {DataKonten.map((item, index) => (
                        <Card  key={index}>
                            <div className='flex justify-between border p-3 items-center content-center'>
                                <div className='flex content-center items-center'>
                                    <img className="w-10 h-10 rounded" src="https://flowbite-react.com/images/people/profile-picture-5.jpg" alt="Default avatar"/>
                                    <div className='flex flex-col'>
                                        <span className='ms-2 font-bold text-lg'>{item.user.name}</span>
                                        <span className='ms-2 font-serif text-xs'>{item.user.username}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img
                                    src={
                                        "/storage/image/" +
                                        item.image
                                    }
                                    className="rounded"
                                />
                                <p className='font-sans mt-5'>{item.content}</p>
                            </div>
                            <div className='p-3 border flex justify-between'>
                                <div className='flex items-center'>
                                    <a href='' className='flex items-center'>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z" clipRule="evenodd"/>
                                        </svg>
                                        <span className='font-semibold text-xs'>Suka</span>
                                    </a>
                                    <div className='flex items-center ms-4'>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475"/>
                                        </svg>

                                        <span className='font-semibold text-xs'>Tidak Suka</span>
                                    </div>
                                </div>
                                <div>
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Comment
                                        <svg className="w-4 h-4 ms-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z"/>
                                        </svg>

                                    </button>
                                </div>
                            </div>
                        </Card>
                        )
                    )} */}
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
