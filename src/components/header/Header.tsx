import React from 'react';
import {AppBar, Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (

        <AppBar position={"sticky"} color={"primary"}>
            <Stack direction='row' spacing={12} sx={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}} >
                <Stack direction='row' spacing={2} sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                        MESSAGE PROJECT
                    </Typography>
                </Stack>

                <Stack spacing={2} direction={"row"}>
                    <Button size='large'  color='inherit' onClick={() => navigate('registration')}>Registration</Button>
                    <Button size='large'  color='inherit' onClick={() => navigate('login')}>Login</Button>
                    <Button size='large'  color='inherit' onClick={() => navigate('all_users')}>All users</Button>
                </Stack>
            </Stack>
        </AppBar>

    );
};

export {Header};
