"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { RiFacebookCircleFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [loader, setLoader] = useState(false);
    const validationSchema = Yup.object({
        email: Yup.string()
            .matches(
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                'Invalid email address'
            )
            .email('Invalid email address')
            .required('Required'),
        password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            console.log("values", values.email, values.password)

            setLoader(true);
            let data = JSON.stringify({
                "email": values.email,
                "password": values.password
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://blogs-g2mr.onrender.com/blogs/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log("Data", response.data);
                    goToHomePage();
                    setLoader(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoader(false);
                    alert("Something went wrong !");
                });

        },
    });

    const goToHomePage = () => {
        router.push('/home');
    };

    const goToSignUp = () => {
        router.push('/signup');
    };
    function responseFacebook(response: any) {
        console.log(response)

        if(response.name){
            router.push('/home');
        }
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-[#a6cbd7]">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                    <div className="flex items-center justify-center">
                        <img
                            src="https://source.unsplash.com/random/200x200"
                            alt="Unsplash Photo"
                            className="w-20 h-20 rounded-full"
                        />
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="Enter your email"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                                placeholder="Enter your password"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500 text-sm">{formik.errors.password}</div>
                            ) : null}
                        </div>

                        <div className='text-sm text-end my-4'>
                            <span className='text-[#718092]'>
                                Dont have an account?
                            </span>&nbsp;
                            <span onClick={goToSignUp}
                                className='text-[#01307c] hover:text-[#01307c] transition ease-in-out hover:duration-300 font-medium cursor-pointer hover:underline'>
                                Sign Up
                            </span>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full h-10 w-full flex items-center justify-center text-white bg-[#01307c] rounded-lg hover:bg-[#0251d0] transition ease-in-out hover:duration-300 focus:outline-none"
                            >
                                {
                                    loader
                                        ?
                                        <div className="w-7 h-7 rounded-full animate-spin border-4 border-solid border-white border-t-transparent"></div>
                                        :
                                        <div>Log In</div>
                                }

                            </button>
                        </div>


                    </form>
{/*                     <div className='text-[#718092] w-full text-center block text-sm my-4'>
                        or continue with
                    </div> */}

                    <div className="flex items-center justify-center text-[#718092]">
                        {/* <button className="mr-4 bg-white border py-2 w-5/12 rounded-xl flex justify-center items-center text-sm hover:scale-110 duration-300 shadow-md shadow-[#c2d9fe]">
                        <FcGoogle size={25} />
                        <span className='ml-2'>Google</span>
                    </button> */}
{/*                             <FacebookLogin
                                appId='834731035056678'
                                autoLoad={true}
                                fields="name,email,picture"
                                callback={responseFacebook}
                            /> */}
                    </div>

                </div>
            </div>
        </>

    );
};

export default LoginPage;

