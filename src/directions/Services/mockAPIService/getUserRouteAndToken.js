import {getTokenFromAPI, getUserRoute } from './index';

// POST and GET AJAX call to get the token and then use it to get the route
const getUserRouteAndToken = async (orig, dest) => {
    let [token, response] = await Promise.all([getTokenFromAPI(orig, dest), getUserRoute(token)]);

    if (response && response.data.status === 'in progress') {
        response = await getUserRouteAndToken(orig, dest);
    }
    return response;
};

export default getUserRouteAndToken;
