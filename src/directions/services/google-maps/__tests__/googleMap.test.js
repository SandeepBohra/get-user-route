import * as googleMap from '../googleMap';
import { googleMaps } from '../googleMap';

let google;

const googleMapObj = {
    someMethod: () => {

    }
}
describe("check if the google maps api is returning google object",() => {
    test("testing google map API", async () => {
        const googleMapService = jest.spyOn(googleMap, "googleMaps");
        googleMapService.mockImplementation(() => {
            if(!google)
            return Promise.resolve(googleMapObj);
            else
            return Promise.resolve(google)
        })
        const response = await googleMaps();
        console.log(response)
        expect(response).toBeTruthy();
        expect(response).toBeDefined();
    });
})
