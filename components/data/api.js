class Api
{
    constructor()
    {
        // get api token here? Through config?
        console.log('api const')
    }

    call(url, method, callback, headers = {}, body = {}) {
        const options = {
            method: method,
            headers: headers || { 'Content-Type': 'application/json' }
        };

        if (method !== 'GET') {
            options.body = body || '';//JSON.stringify({ title: 'React PUT Request Example' })
        }

        fetch(url, options)
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