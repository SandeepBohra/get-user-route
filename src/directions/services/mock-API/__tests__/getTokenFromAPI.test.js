import { getTokenFromAPI } from '../index';
import { MOCK_API_DETAILS } from '../../../Constants/apiURL';
import axios from 'axios';

const mockResponseToken = {
    token: `some-token`,
};

const requestPayload = {
    origin: ["1", "2"],
    destination: ["3", "4"],
};

const url = MOCK_API_DETAILS.URL+MOCK_API_DETAILS.Route;

const errorMessage = "Internal server error";

describe('get token from Mock API', () => { 
    test('should receive token as response', async () => {
        const postService = jest.spyOn(axios, 'post');
        postService.mockImplementation(() =>
            Promise.resolve({ data:  mockResponseToken})
        );

        const response = await getTokenFromAPI(requestPayload.origin, requestPayload.destination);
        expect(response).toBeDefined();
        expect(response).toBe("some-token");
        postService.mockRestore();
    });
});

