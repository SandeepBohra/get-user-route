import { getUserRoute } from '../index';
import { MOCK_API_DETAILS } from '../../../Constants/apiURL'
import axios from 'axios'

const requestToken = 'some-token'

const mockRouteResponse = {
    status: 'success',
		path: [
			["22.372081", "114.107877"],
			["22.326442", "114.167811"],
			["22.284419", "114.159510"]
		],
		total_distance: 20000,
		total_time: 1800
}

const mockFailureResponse = {
    status: 'failure',
    error: 'Location not accessible by car'
}

const mockInProgressResponse = {
    status: 'in progress',
}

const url = MOCK_API_DETAILS.URL+MOCK_API_DETAILS.Route;

const apiClient = axios.create({
    baseURL: url,
});

const errorMessage = "Internal server error"

describe('getUserRoute() API should return route details', () => { 
    test('should return route details', async () => {
        const getService = jest.spyOn(axios, 'get');
        getService.mockImplementation(() =>
            Promise.resolve({ data: mockRouteResponse })
        );

        const response = await getUserRoute(requestToken);

        expect(response).toBeDefined();
        expect(response.data.status).toEqual("success");
        expect(response.data.total_distance).toBe(20000)
        getService.mockRestore();
    });

    test('check for failure of the gteUserRoute() API', async () => {
        const getService = jest.spyOn(axios, 'get');
        getService.mockImplementation(() =>
            Promise.resolve({ data: mockFailureResponse })
        );

        const response = await getUserRoute(requestToken);

        expect(response).toBeDefined();
        expect(response.data.status).toEqual("failure");
        getService.mockRestore();
      });

      test('check for in-progress of the gteUserRoute() API', async () => {
        const getService = jest.spyOn(axios, 'get');
        getService.mockImplementation(() =>
            Promise.resolve({ data: mockInProgressResponse })
        );

        const response = await getUserRoute(requestToken);

        expect(response).toBeDefined();
        expect(response.data.status).toEqual("in progress");
        getService.mockRestore();
      });

      test('check for error message on failing of the gteUserRoute() API', async () => {
        const getService = jest.spyOn(axios, 'get');
    
        getService.mockImplementation(() => {
            Promise.reject({
                errorMsg: errorMessage,
            })
        })
    
        await getUserRoute(requestToken).catch((error) => {
          expect(error).toBe(errorMessage);
          getService.mockRestore();
        });
      });
});

