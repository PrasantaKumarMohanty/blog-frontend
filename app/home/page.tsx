"use client";

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modals from '../components/Modals';
import AppBars from '../components/AppBar';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Home: React.FC = () => {
    const router = useRouter()
    const [allBlogs, setAllBlogs] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [getDataLoader, setGetDataLoader] = useState(false);
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = React.useState(1);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const fetchBlogs = (page: any) => {
        let data = '';
        setGetDataLoader(true);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://blogs-g2mr.onrender.com/blogs/all-blogs?page=${page}&pageSize=12`,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("data", response.data);
                setAllBlogs(response.data);
                setGetDataLoader(false);
            })
            .catch((error) => {
                console.log(error);
                setGetDataLoader(false);
                alert("Something went wrong !");
            });
    }

    useEffect(() => {
        fetchBlogs(page);
        setTotalPages(page + 1)
    }, [page]);

    return (
        <div className='relative'>
            <Modals
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                message={"Add a new Blog"}
                id={""}
            />

            <AppBars handleOpen={handleOpen} message={"Add a new Blog"} />

            {
                getDataLoader
                    ?
                    <div className="w-full mt-24 flex justify-center items-center bg-white">
                        <div className="w-7 h-7 mr-6 rounded-full animate-spin border-4 border-solid border-[#01307c] border-t-transparent"></div>
                        <span> Processing...</span>
                    </div>
                    :
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

                            <div className='w-full flex justify-end '>
                                <Stack spacing={2}>
                                    <Typography>Page: {page}</Typography>
                                    <Pagination count={totalPages} page={page} onChange={handleChange} />
                                </Stack>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Home;

