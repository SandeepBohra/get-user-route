import axios from 'axios';
import { getUserRouteAndToken, getTokenFromAPI, getUserRoute } from '../routeDirectionsApi';

describe("check getUserRouteAndToken() function which is calling getToken and getRoute()", () => {

    const requestToken = 'some-token';

    const mockResponseToken = {
        token: 'some-token',
    };

    const requestPayload = {
        origin: ["1", "2"],
        destination: ["3", "4"],
    };


    const mockFailureResponse = {
    status: 'failure',
    error: 'Location not accessible by car'
    }

    const errorMessage = "Internal server error"

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const statusObj = { 
        data: {
                status: null,
                path: null
        }
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

    test('should receive token as response from getTokenFromAPI()', async () => {
        const postService = jest.spyOn(axios, 'post');
        postService.mockImplementation(() =>
            Promise.resolve({ data:  mockResponseToken})
        );

        const response = await getTokenFromAPI(requestPayload.origin, requestPayload.destination);
        expect(response).toBeDefined();
        expect(response).toBe("some-token");
        postService.mockRestore();
    });

    test('should return route details from getUserRoute()', async () => {
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
            Promise.reject({ data: mockFailureResponse })
        );

        await getUserRoute(requestToken).catch(e => {
            expect(e).toBeDefined();
            expect(e.data.status).toEqual("failure");
        });

        getService.mockRestore();
    });

    test("Whether recusion occurs on 'in progress' state", async () => {
        const postService = jest.spyOn(axios, 'post');
        const getService = jest.spyOn(axios, 'get');
        const sampleToken = {
            token: 123
        }
        let timesCalled = 0;

        getService.mockImplementation(() => {
            const apiBehaviour = getRandomInt(0, 4);

            if (apiBehaviour === 0) {
                statusObj.data.status = 500;
            } else if (apiBehaviour === 1) {
                statusObj.data.status = 'in progress'; // Should cause recursions
            } else if (apiBehaviour === 2) {
                statusObj.data.status = 'failure';
            } else {
                statusObj = Object.create(mockRouteResponse); 
            }

            return Promise.resolve(statusObj);
        })

        postService.mockImplementation(() => {
            const apiBehaviour = getRandomInt(0, 1);
            timesCalled++;

            if (apiBehaviour === 0)
            return Promise.reject(errorMessage); // Will throw an error;
            else
            return  Promise.resolve({data: sampleToken});
        });

        const res = await getUserRouteAndToken({}, {}).catch((errormsg) => {
            expect(errormsg).toBe(errorMessage); // Should match server error;
            expect(postService).toHaveBeenCalledTimes(timesCalled);
        }); // Sending Sample Data

        expect(postService).toHaveBeenCalledTimes(timesCalled);

        postService.mockRestore();
        getService.mockRestore();

    })
})