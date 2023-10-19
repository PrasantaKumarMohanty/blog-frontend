"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

const BlogDetails = ({ params }: {
    params: {
        id(arg0: string, id: any): unknown; slug: string
    }
}) => {
    const router = useRouter()

    useEffect(() => {
        let data = '';
        let id = params.id;

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:5000/blogs/search-blog/${id}`,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("data", response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])


    return (
        <div>
            BlogDetails
        </div>
    );
};

export default BlogDetails;

