"use client";

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modals from '../components/Modals';

const Home: React.FC = () => {
    const router = useRouter()
    const [allBlogs, setAllBlogs] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://blogs-g2mr.onrender.com/blogs/all-blogs',
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("data", response.data);
                setAllBlogs(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert("Something went wrong !");
            });
    }, []);

    // const goToDetails = () => {
    //     router.push(`/blogdetails/${blog.id}`);
    // }


    return (

        <div className='relative'>

            <Modals
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                message={"Add a new Blog"}
                id={""}
            />

            <div className='sticky top-0'>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Blogs
                            </Typography>
                            <Button
                                onClick={handleOpen}
                                color="inherit">Create new blog</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>

            <div className="container my-12 mx-auto px-4 md:px-12 ">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">

                    {allBlogs?.map((blog: any) => {
                        return (
                            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                                <div className="overflow-hidden rounded-lg shadow-lg">
                                    <img alt="Placeholder" className="block h-auto max-h-48 w-full" src={blog?.image} />
                                    <div className="flex items-center justify-between leading-tight p-2 md:p-4">
                                        <h1 className="text-lg">
                                            <div className="no-underline hover:underline text-black">
                                                {blog?.title}
                                            </div>
                                        </h1>
                                        <p className="text-grey-darker text-sm">
                                            {blog?.createdDate?.substring(0, 10)}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-center leading-none p-2 md:p-4 text-[#01307c]">
                                        <div
                                            onClick={() => router.push(`/blogdetails/${blog._id}`)}
                                            className="cursor-pointer text-center no-underline hover:underline text-sm">
                                            More Details
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;

