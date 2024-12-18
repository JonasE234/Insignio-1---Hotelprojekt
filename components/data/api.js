class Api
{
    BASE_URL = 'http://localhost/Insignio-1---Hotelprojekt/rest/api.php/';
    BASE_HEADER =  {
        //'Content-Type': 'application/json',
        //'rest_token' : '1234' ,
        //'Access-Control-Allow-Origin' : '*',
        //'Access-Control-Allow-Credentials' : true
    }
    BASE_BODY = {
        'rest_token' : '1234'
    }

    constructor()
    {
        // get api token here? Through config?
        console.log('api const')
    }

    call(url, method, callback, body = []) {
        // atm only POST method works
        method = 'POST';
        const options = {
            method: method
        };

        if (method !== 'GET') {
            options.body = JSON.stringify(Object.assign(this.BASE_BODY, {args : body}));
        }

        fetch(this.BASE_URL + url, options)
            .then((res) => res.json())
            .then(
                (result) => {
                    callback(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            )
    }
}

export var api = new Api();
/**
 * "use client"
 * import {api} from "@/components/data/api";
 */