"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Modals from '@/app/components/Modals';
import AppBars from '@/app/components/AppBar';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
});

const BlogDetails = ({ params }: {
    params: {
        id(arg0: string, id: any): unknown; slug: string
    }
}) => {
    const router = useRouter();
    let id = params.id;
    const [blogdetails, setBlogdetails] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [dltLoader, setDltLoader] = useState(false);
    const [getDataLoader, setGetDataLoader] = useState(false);
    const [selectedImgFile, setSelectedImgFile] = useState(null);
    const [date, setDate] = useState();
    const [description, setDescription] = useState('');
    const [loader, setLoader] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const randomImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSezeZV4X0U6iMxfjDDDZfd6kGr_r91-kGseQ&usqp=CAU'

    useEffect(() => {
        getAllDetails();
    }, [])

    const getAllDetails = () => {
        let data = '';
        setGetDataLoader(true);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://blogs-g2mr.onrender.com/blogs/search-blog/${id}`,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("data", response.data);
                setBlogdetails(response.data);
                setGetDataLoader(false);
                setDate(response.data.createdDate?.substring(0, 10));
            })
            .catch((error) => {
                console.log(error);
                setGetDataLoader(false);
                alert("Something went wrong !");
            });
    }

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoader(true);
            let data = JSON.stringify({
                "title": values.name,
                "description": description,
                "image": selectedImgFile != null ? selectedImgFile : randomImg,
                "createdDate": date
            });

            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `https://blogs-g2mr.onrender.com/blogs/edit-blog/${id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    // console.log(response.data);
                    setLoader(false);
                    handleClose();
                    getAllDetails();
                })
                .catch((error) => {
                    setLoader(false);
                    console.log(error);
                });
        },
    });

    const deleteBlog = () => {
        let data = '';
        setDltLoader(true);
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `https://blogs-g2mr.onrender.com/blogs/delete-blog/${id}`,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("data", response.data.message);
                setDltLoader(false);
                router.push('/home');
            })
            .catch((error) => {
                console.log(error);
                setDltLoader(false);
            });
    }

    return (
        <div className='relative'>
            <Modals
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                message={"Edit the Blog"}
                setSelectedImgFile={setSelectedImgFile}
                formik={formik}
                description={description}
                setDescription={setDescription}
                loader={loader}
                date={date}
            />
            <AppBars
                handleOpen={handleOpen}
                message={"Edit the Blog"} />

            {
                getDataLoader
                    ?
                    <div className="w-full mt-24 flex justify-center items-center bg-white">
                        <div className="w-7 h-7 mr-6 rounded-full animate-spin border-4 border-solid border-[#01307c] border-t-transparent"></div>
                        <span> Processing...</span>
                    </div>
                    :

                    [blogdetails]?.map((blog: any) => {
                        return (
                            <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
                                <div className=" max-w-2xl mx-auto">
                                    <h1 className="text-gray-900 text-center font-bold text-3xl mb-2">
                                        {blog?.title}
                                    </h1>
                                    <div className="flex items-center justify-center mt-7">
                                        <img className="w-9/12 h-9/12 rounded-full" src={blog?.image} alt="Avatar" />
                                    </div>
                                </div>

                                <div className="max-w-2xl mx-auto">
                                    <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                                        <div className="">
                                            <div className="text-base leading-8 my-5">
                                                Created Date : {blog?.createdDate?.substring(0, 10)}
                                            </div>
                                            <div className="text-xl text-cente font-semibold my-5">
                                                {blog?.description}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className='flex items-center justify-center mb-4'>
                                    <button
                                        onClick={handleOpen}
                                        className="w-1/2 h-10 text-white bg-[#01307c] rounded-lg hover:bg-[#0251d0] transition ease-in-out hover:duration-300 focus:outline-none"
                                    >
                                        Edit Blog
                                    </button>
                                </div>

                                <div className='flex items-center justify-center'>
                                    <button
                                        onClick={deleteBlog}
                                        className="w-1/2 h-10 flex items-center justify-center text-white bg-[#01307c] rounded-lg hover:bg-[#0251d0] transition ease-in-out hover:duration-300 focus:outline-none"
                                    >
                                        {
                                            dltLoader
                                                ?
                                                <div className="w-7 h-7 rounded-full animate-spin border-4 border-solid border-white border-t-transparent"></div>
                                                :
                                                <div>Delete Blog</div>
                                        }

                                    </button>
                                </div>
                            </div>
                        )
                    })}
        </div>
    );
};

export default BlogDetails;

