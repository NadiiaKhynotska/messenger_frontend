import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Box, Button, Container, CssBaseline, TextField, Typography} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {IAuth} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authActions} from "../../redux/slices";
import {useNavigate} from "react-router-dom";

const theme = createTheme();

const RegistrationForm = () => {
    const {handleSubmit, control, reset} = useForm<IAuth>();
    const dispatch = useAppDispatch();
    const {errors} = useAppSelector((state) => state.auth);
    const navigate = useNavigate()


    const onSubmit: SubmitHandler<IAuth> = async (user: IAuth) => {
        const {meta:{requestStatus}} = await dispatch(authActions.register({user}))

        if( requestStatus === 'fulfilled'){
            reset()
            navigate('/login')
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Registration
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Name"
                                    autoComplete="name"
                                    autoFocus
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    autoComplete="email"
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{mt: 3, mb: 2}}
                        >
                            Register
                        </Button>
                        {errors?.messages && <Typography>Email must be unique</Typography>}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export {RegistrationForm};
