import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation'

interface AppBarsProps {
    handleOpen: any;
    message: any;
}

const AppBars: React.FC<AppBarsProps> = ({ handleOpen, message }) => {
    const router = useRouter()

    const logOut = () => {
        router.push(`/login`);
    }

    return (
        <div className='sticky top-0 z-10'>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Blogs
                        </Typography>

                        {
                            message == "Add a new Blog"
                            &&
                            <Button
                                onClick={handleOpen}
                                color="inherit">Create new blog</Button>
                        }

                        <Button
                            onClick={logOut}
                            color="inherit">Log Out</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default AppBars
