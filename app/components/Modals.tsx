import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
}

const Modals: React.FC<EditModalProps> = ({ open, handleOpen, handleClose, message }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md">
                            <h1 className='font-bold text-2xl'>{message}</h1>
                            <div className="mt-4">
                                <label className="block text-gray-700 font-bold mb-2">Name</label>
                                <input type="text"
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                                    placeholder="Enter blog name" />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 font-bold mb-2">Date</label>
                                <input type="text" className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"/>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 font-bold mb-2">Description</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                                    placeholder="Enter your description"></textarea>
                            </div>

                            <div className="mt-4">
                                <button id="login-btn"
                                    className="w-full px-4 py-2 text-white bg-[#01307c] rounded-lg hover:bg-[#01307c] transition ease-in-out hover:duration-300 focus:outline-none">
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Modals;