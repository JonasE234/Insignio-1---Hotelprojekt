import {api} from "@/components/data/api";
class User
{
    name = 'EMPTY'
    id = 1
    token = ''

    login (username, password, register = 0)
    {
        let url =  'https://catfact.ninja/fact'
        let method = 'GET'
        api.call(url, method, this._handleLogin)
    }

    register(username, password)
    {

    }

    _handleLogin(response)
    {
        console.log(response);
        // save user token in user obj.
    }

}

export const user = new User()
/**
 * "use client"
 * import {user} from "@/components/data/user";
 */