import React, { FC, PropsWithChildren } from 'react';
import { IUser } from "../../interfaces";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IProps extends PropsWithChildren {
    user: IUser;
}

const UserComponent: FC<IProps> = ({ user }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/chat', { state: { user, recipientId:user.id  } });
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {user.email}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={handleClick}>
                    Start Chatting
                </Button>
            </CardActions>
        </Card>
    );
};

export { UserComponent };
