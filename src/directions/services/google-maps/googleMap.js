import GoogleMapsLoader from 'google-maps';

const googleAPIKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY

const initializeGoogleMapSettings = () => {
    GoogleMapsLoader.KEY = googleAPIKey;
    GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
}

initializeGoogleMapSettings();

let google;
const loadMap = () =>
    new Promise((resolve, reject) => {
        if (google) {
            resolve(google);
        } else {
            GoogleMapsLoader.load(api => {
                google = api;
                resolve(api);
            });
        }
    });

export const googleMaps = async () => {
    const google = await loadMap();
    return google.maps;
};








