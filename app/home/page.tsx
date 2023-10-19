"use client";

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
    const router = useRouter()
    const [allBlogs, setAllBlogs] = useState([]);

    useEffect(() => {
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5000/blogs/all-blogs',
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
        <div className="container my-12 mx-auto px-4 md:px-12 ">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">

                {allBlogs?.map((blog: any) => {
                    return (
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <div className="overflow-hidden rounded-lg shadow-lg">
                                <img alt="Placeholder" className="block h-auto w-full" src="https://picsum.photos/600/400/?random" />
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
    );
};

export default Home;

