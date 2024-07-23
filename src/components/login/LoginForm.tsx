import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IAuth} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate} from "react-router-dom";
import {authActions} from "../../redux/slices";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Box, Button, Container, CssBaseline, TextField, Typography} from "@mui/material";

const theme = createTheme();

const LoginForm = () => {
    const {handleSubmit, control, reset} = useForm<IAuth>();
    const dispatch = useAppDispatch();
    const {errors} = useAppSelector((state) => state.auth);
    const navigate = useNavigate()


    const onSubmit: SubmitHandler<IAuth> = async (user: IAuth) => {
        const {meta:{requestStatus}} = await dispatch(authActions.login({user}))

        if( requestStatus === 'fulfilled'){
            reset()
            navigate('/all-users')
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
                        Login
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
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
                            Login
                        </Button>
                        {errors?.messages && <Typography>{errors.messages}</Typography>}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export {LoginForm};
