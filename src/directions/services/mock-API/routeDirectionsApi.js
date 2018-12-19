import axios from 'axios';
import { MOCK_API_DETAILS } from '../../constants/apiURL';


// post AJAX call to submit the entered locations by user
export const getTokenFromAPI = async (orig, dest) => {
    const url = MOCK_API_DETAILS.URL+MOCK_API_DETAILS.Route;

    const response = await axios.post(url, {orig, dest});
    return response.data.token;
};


// get AJAX request to get the route/directions
export const getUserRoute = async token => {
    const url = MOCK_API_DETAILS.URL + MOCK_API_DETAILS.Route + "/" + token;
    const response = await axios.get(url);
    return response;
};

// POST and GET AJAX call to get the token and then use it to get the route
export const getUserRouteAndToken = async (orig, dest) => {
    // let [token, response] = await Promise.all([getTokenFromAPI(orig, dest), getUserRoute(token)]);
    const token = await getTokenFromAPI(orig, dest);
    const response = await getUserRoute(token);

    if (response && response.data.status === 'in progress') {
        response = await getUserRouteAndToken(orig, dest);
    }
    return response;
};
