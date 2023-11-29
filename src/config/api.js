import axios from "axios";

// For more than one API, create seperate versions of this file or .env file

// Creates an instance of axios
export default axios.create({
    baseURL: "https://college-api.vercel.app/api",
    // headers: {
    //     common: {       // Adds to every request
    //         Authorization: ""
    //     },
    //     post: {         // Adds to only post requests

    //     }
    // }
});  


// export default axios.create({
//     baseURL: "https://festivals-api.vercel.app/api"
// });  

// export {
//     weatherAPI,
//     otherAPI
// }

// To import
// import {weatherAPI, otherAPI} from ...
// weatherAPI.get