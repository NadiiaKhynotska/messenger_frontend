
import React from 'react';
import {Card, CardMedia} from "@mui/material";

// @ts-ignore
import error from '../assets/404-error.jpeg';

const NotFoundPage = () => {

    return (
        <Card
            sx={{
                margin: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
            <CardMedia
                component='img'
                height={'800'}
                image={error}
                alt={"404 error"}
            />

        </Card>
    );
};

export {NotFoundPage};
