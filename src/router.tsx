import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts";
import {AllUsersPage, ChatPage, LoginPage, NotFoundPage, RegistrationPage,} from "./pages";

const router = createBrowserRouter([
    {
        path: '',
        element:<MainLayout/>,
        children:[
            {
                index: true,
                element:<Navigate to={'login'}/>
            },
            {
                path: 'registration',
                element:<RegistrationPage/>
            },
            {
                path:'login',
                element:<LoginPage/>
            },
            {
                path: 'all-users',
                element: <AllUsersPage/>
            },
            {
                path: 'chat',
                element: <ChatPage/>,
            },
            {
                path:'*',
                element:<NotFoundPage/>
            }
        ]
    }
])

export {
    router
}
