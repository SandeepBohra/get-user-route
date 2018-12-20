import * as googleMap from '../googleMap';
import GoogleMapsLoader from 'google-maps';


const googleMapObj = {
    someMethod: () => {

    }
}
describe("check if the google maps api is returning goole object",() => {
    test("testing google map API", async () => {
        const googleService = jest.spyOn(googleMap, "loadMap");
        googleService.mockImplementation(() => {
            Promise.resolve({googleMapObj})
        })
        const res = await googleMap.loadMap()
        expect(res).toBeTruthy();
    })
})