import React, {useEffect} from 'react';
import {AppBar, Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux/slices";
import {authService} from "../../services";

const Header = () => {

    const navigate = useNavigate();
    const {me} = useAppSelector((state)=> state.auth);
    const dispatch = useAppDispatch();

    console.log(me)

    useEffect(() => {
        if (authService.getAccessToken() && !me) {
           dispatch(authActions.findMe());
        }
    }, [dispatch, me]);


    const logout =()=>{
        dispatch(authActions.logout())
        navigate('login')
    }

    return (

        <AppBar position={"sticky"} color={"primary"}>
            <Stack direction='row' spacing={12} sx={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}} >
                <Stack direction='row' spacing={2} sx={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
                    <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                        MESSAGE PROJECT
                    </Typography>
                </Stack>
                    {me?
                        <Stack   spacing={2}
                                 direction="row"
                                 alignItems="center"
                                 justifyContent="center"
                                 sx={{ height: '100%' }}>
                            <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                                {me?.name}
                            </Typography>
                            <Button size='large'  color='inherit' onClick={logout}>Logout</Button>
                        </Stack>
                        :
                        <Stack spacing={2} direction={"row"}>
                            <Button size='large'  color='inherit' onClick={() => navigate('registration')}>Registration</Button>
                            <Button size='large'  color='inherit' onClick={() => navigate('login')}>Login</Button>
                            <Button size='large'  color='inherit' onClick={() => navigate('all-users')}>All users</Button>
                        </Stack>
                    }
            </Stack>
        </AppBar>

    );
};

export {Header};
