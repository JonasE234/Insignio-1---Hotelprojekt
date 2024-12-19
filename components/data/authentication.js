import {api} from "@/components/data/api";
import { useRouter } from 'next/router';
import { use } from "react";

class User
{
    LOGIN_URL = 'Authentication/verifyLoginData';

    REGISTER_URL = 'Authentication/';

    USER_TOKEN = '';

    setToken (response) {
        USER_TOKEN = response.token;
        let router = useRouter();
        router.push('/');
    };

    login (username, password)
    {
        try {
            api.call(this.LOGIN_URL, 'POST', (response) => {this.setToken(response); }, {
                'username': username,
                'password': password,
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    register(username, password)
    {

    }
}

/**
 * "use client"
 * import {user} from "@/components/data/user";
 */
export const user = new User()
