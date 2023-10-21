import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface EditModalProps {
    open: boolean;
    handleOpen: any;
    handleClose: any;
    message: any;
    id: any;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
});

const Modals: React.FC<EditModalProps> = ({ open, handleOpen, handleClose, message, id }) => {
    const today = new Date();
    const [selectedImgFile, setSelectedImgFile] = useState(null);
    const [date, setDate] = useState(today.toString().substring(4, 15));
    const [description, setDescription] = useState('');
    const [loader, setLoader] = useState(false);

    const cloudName = process.env.NEXT_PUBLIC_ANALYTICS_ID
    const randomImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSezeZV4X0U6iMxfjDDDZfd6kGr_r91-kGseQ&usqp=CAU'

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoader(true);

            if (message == "Add a new Blog") {
                let data = JSON.stringify({
                    "title": values.name,
                    "description": description,
                    "image": selectedImgFile != null ? selectedImgFile : randomImg,
                    "createdDate": date
                });

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://blogs-g2mr.onrender.com/blogs/add-blog',
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
                    })
                    .catch((error) => {
                        setLoader(false);
                        console.log(error);
                    });
            } else {
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
                    })
                    .catch((error) => {
                        setLoader(false);
                        console.log(error);
                    });

            }
        },
    });

    const handleFileUpload = async (event: any) => {
        const file = event.target.files[0];

        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'amrr5wut');

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log('Uploaded URL:', data);
            setSelectedImgFile(data?.secure_url);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="w-full max-w-md">
                            <h1 className='font-bold text-2xl'>{message}</h1>

                            <div className="mt-4">
                                <label className="block text-gray-700 font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                                    placeholder="Enter blog name"
                                    name="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-red-500 text-xs">{formik.errors.name}</div>
                                ) : null}
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-700 font-bold mb-2">Date</label>
                                <input
                                    value={date}
                                    type="text"
                                    disabled
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-700 font-bold mb-2">Image</label>
                                <input
                                    onChange={handleFileUpload}
                                    type="file"
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-700 font-bold mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                                    placeholder="Enter your description"
                                    rows={2}></textarea>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="w-full h-10 w-full flex items-center justify-center text-white bg-[#01307c] rounded-lg hover:bg-[#0251d0] transition ease-in-out hover:duration-300 focus:outline-none"
                                >
                                    {
                                        loader
                                            ?
                                            <div className="w-7 h-7 rounded-full animate-spin border-4 border-solid border-white border-t-transparent"></div>
                                            :
                                            <div>
                                                {
                                                    message === "Add a new Blog" ? "Create" : "Edit"
                                                }
                                            </div>
                                    }
                                </button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default Modals;