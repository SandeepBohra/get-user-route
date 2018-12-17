import { postLocationDetails, getUserRouteURL } from '../Constants/url';
import axios from 'axios';


// post AJAX call to submit the entered locations by user
const postUserLocations = async (orig, dest) => {
    const url = postLocationDetails;
    const payload = {
        orig,
        dest
    }
    const response = await axios.post(url, payload);
    return response.data.token;
};

// get AJAX request to get the route/directions
const getUserRoute = async token => {
    const url = getUserRouteURL+token
    const response = await axios.get(url);
    return response;
};

// POST and GET AJAX call to get the token and then use it to get the route
export const getTokenAndRoute = async (orig, dest) => {
    const token = await postUserLocations(orig, dest);
    let response = await getUserRoute(token);
    if (response && response.status === 'in progress') {
        response = await getTokenAndRoute(orig, dest);
    }
    return response;
};

