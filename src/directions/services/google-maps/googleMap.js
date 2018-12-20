import GoogleMapsLoader from 'google-maps';

const googleAPIKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY

const checkIfGoogleApiKeyAvailable = () => {
    if(!googleAPIKey) {
        alert("Google API key not found, please refer readme.md for more information!!");
    } else {
        return true;
    }
}

const initializeGoogleMapSettings = () => {
    if(checkIfGoogleApiKeyAvailable()) {
        GoogleMapsLoader.KEY = googleAPIKey;
    }
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








