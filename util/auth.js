import axios from "axios";
import dayjs from "dayjs";
import { useSelector } from 'react-redux';

const API_KEY ='API_KEY';

export async function createUser(email,password) {

    const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+API_KEY,{
        email:email.trim(),
        password:password.trim(),
        returnSecureToken:true
    });

    return {
        token:res.data.idToken,
        tokenExpireDate: dayjs().add(res.data.expiresIn, 'second')
    };
}

export async function loginUser(email,password) {

    const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+API_KEY,{
        email:email.trim(),
        password:password.trim(),
        returnSecureToken:true
    });

    return {
        token:res.data.idToken,
        tokenExpireDate: dayjs().add(res.data.expiresIn, 'second')
    };
}

export async function getMessage(token) {
    var res = await axios.get(`https://react-burger-7899f.firebaseio.com/message.json?auth=${token}`);
    return res.data;
}
