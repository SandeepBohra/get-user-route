import axios from 'axios';
import { getTokenFromAPI, getUserRoute } from '../routeDirectionsApi';

const requestToken = 'some-token';


const mockResponseToken = {
    token: 'some-token',
};

const requestPayload = {
    origin: ["1", "2"],
    destination: ["3", "4"],
};

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

const errorMessage = "Internal server error"

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

    test('error on failing of API', async () => {
        const getService = jest.spyOn(axios, 'post');
    
        getService.mockImplementation(() => {
            Promise.reject({
                errorMsg: errorMessage,
            })
        })
    
        await getUserRoute(requestToken).catch((error) => {
          expect(error.errorMsg).toBe(errorMessage);
          getService.mockRestore();
        });
      });
});


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

