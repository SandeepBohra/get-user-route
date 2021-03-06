import axios from 'axios';
import { MOCK_API_DETAILS, API_STATUS } from '../../constants/mockApiConfig';


// post AJAX call to submit the entered locations by user
export const getTokenFromAPI = async (orig, dest) => {
    const url = MOCK_API_DETAILS.url + MOCK_API_DETAILS.route;

    const response = await axios.post(url, {orig, dest});
    return response.data.token;
};


// get AJAX request to get the route/directions
export const getUserRoute = async token => {
    const url = MOCK_API_DETAILS.url + MOCK_API_DETAILS.route + "/" + token;
    const response = await axios.get(url);
    return response;
};

// POST and GET AJAX call to get the token and then use it to get the route
export const getUserRouteAndToken = async (orig, dest) => {
    const token = await getTokenFromAPI(orig, dest);
    let response = await getUserRoute(token);

    if (response && response.data.status === API_STATUS.inProgress) {
        response = await getUserRouteAndToken(orig, dest);
    }
    return response;
};

