import axios from 'axios';

export const API = () => {
    return {
        type: "GET_DATA",
        payload: axios({
            method: 'GET',
            url: 'https://api.covid19api.com/summary'
        })
    }
}