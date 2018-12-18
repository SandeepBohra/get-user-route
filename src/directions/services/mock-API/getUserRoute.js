import { MOCK_API_DETAILS } from '../../constants/apiURL';
import axios from 'axios';


// get AJAX request to get the route/directions
const getUserRoute = async token => {
    const url = MOCK_API_DETAILS.URL + MOCK_API_DETAILS.Route + "/" + token;
    const response = await axios.get(url);
    return response;
};

export default getUserRoute;

