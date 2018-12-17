import { MOCK_API_DETAILS } from '../../Constants/apiURL';
import axios from 'axios';

// post AJAX call to submit the entered locations by user
const getTokenFromAPI = async (orig, dest) => {
    const url = MOCK_API_DETAILS.URL+MOCK_API_DETAILS.Route;

    const response = await axios.post(url, {orig, dest});
    return response.data.token;
};

export default getTokenFromAPI;