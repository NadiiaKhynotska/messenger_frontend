    const baseURL = process.env.REACT_APP_API

    const auth = '/auth';
    const users = '/users';
    const messages = '/messages';


    const urls = {
        auth:{
            registration: `${auth}/sign-up`,
            sign_in: `${auth}/sign-in`,
            logout: `${auth}/logout`,
            refresh:`${auth}/refresh`,
        },
        users:{
            getAll:`${users}`,
            findMe:`${users}/me`,
            deleteMe:(userId:string)=>`${users}/${userId}`,
        },
        message:{
            postMessage :(recipient_id :string)=>`${messages}/${recipient_id}`,
            getAllMessages: `${messages}`,
            updateMessage: (message_id :string)=>`${messages}/${message_id}`,
            deleteMessage:(message_id :string)=>`${messages}/${message_id}`
        }

    }


    export {
        baseURL,
        urls,
    }
