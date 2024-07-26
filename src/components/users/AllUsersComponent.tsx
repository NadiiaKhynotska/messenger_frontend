import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import { useSearchParams} from "react-router-dom";
import {userActions} from "../../redux/slices";
import {UserComponent} from "./UserComponent";
import {Container, Grid, Typography} from "@mui/material";

const AllUsersComponent = () => {
    const {allUsers} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams({limit: '10', offset: '0'});
    const limit = +query.get('limit')
    const offset = +query.get('offset')


    useEffect(() => {
        dispatch(userActions.findAll({limit, offset}))
        setQuery(prev => ({...prev, limit: prev.get('limit'), offset:prev.get('offset')}))
    }, [limit,offset, dispatch, setQuery]);


    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                All Users
            </Typography>
            <Grid container spacing={4}>
                {allUsers?.data?.map(user => (
                    <Grid item key={user.id} xs={12} sm={6} md={4}>
                        <UserComponent user={user} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export {AllUsersComponent};
