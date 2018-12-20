import * as MapService from '../googleMap';
import { googleMaps } from '../googleMap';

describe("check if the google maps api is returning google object", () => {

    test("whether googleMaps() method returns a valid Object", async () => {
        const mapName = 'Google Maps';
        const google = { maps: mapName }; // Sample Object

        const mapsMethod = jest.spyOn(MapService, "googleMaps");

        mapsMethod.mockImplementation(() => {
            return Promise.resolve(google);
        });

        const mapObject = await googleMaps();

        expect(mapObject).toBeTruthy();
        expect(mapObject.maps).toBe(mapName);

        mapsMethod.mockRestore();
    });
})
