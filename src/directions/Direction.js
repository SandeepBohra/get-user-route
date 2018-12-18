import React, { Component } from 'react';
import LocationDetailsForm from './components/location-details-form/LocationDetailsForm';
import { googleMaps } from './services/google-maps/googleMap';
import { getUserRouteAndToken } from './services/mock-API/index';
import { MOCK_API_ERROR } from './constants/errorTypes';
import { Loader, MapComponent } from '../shared/components/index'
import './Direction.css';


class Direction extends Component {
    mapContainer
    constructor() {
        super();
        this.googleMaps = {};
        this.renderMap = {};
        this.state = {
            isLoading: false,
            routeDetails: {
                showRouteDistAndTime: false,
                routeDistance: '',
                routeTime: '',
            },
            errorMsg: '',
        }
    }
    componentDidMount() {
        this.initializeGoogleMaps();
    }
    
    initializeGoogleMaps = async () => {
        const { googleMaps } = this.props
        this.googleMaps = await googleMaps();
        this.renderMap = new this.googleMaps.Map(this.mapContainer, this.props.mapSettings);
    }

    drawRouteOnMap = (path) => {
        const directionService = new this.googleMaps.DirectionsService();
        const directionRenderer = new this.googleMaps.DirectionsRenderer();
        const origin = path[0];
        const dest = path[path.length -1];
        directionRenderer.setMap(this.renderMap);
        directionService.route({
            origin: new this.googleMaps.LatLng(origin[0], origin[1]),
            destination: new this.googleMaps.LatLng(dest[0], dest[1]),
            travelMode: "DRIVING"
            },  (response, status) => {
            if (status === 'OK') {
                directionRenderer.setDirections(response);
            }
        });
    }

    showLoader = (set) => {
        this.setState({
            isLoading: set
        })
    }

    clearPerviousRoueteDetails = () => {
        this.setState(prevState => ({
            routeDetails: {
                ...prevState.routeDetails,
                routeDistance: '',
                routeTime: '',
                showRouteDistAndTime: false,
            }
        }))
        this.setState({
            errorMsg: '',
        })
    }
    sendLocationAndGetRoute = async (orig, dest) => {
        this.showLoader(true)
        this.clearPerviousRoueteDetails()
        const response = await getUserRouteAndToken(orig, dest).catch(e => {
            this.setState({
                errorMsg: MOCK_API_ERROR,
            })
        });;
        this.showLoader(false)
        if(response && response.data.path) {
            this.setState(prevState => ({
                routeDetails: {
                    ...prevState.routeDetails,
                    routeDistance: response.data.total_distance,
                    routeTime: response.data.total_time,
                    showRouteDistAndTime: true,
                }
            }))
            const { path } = response.data
            this.drawRouteOnMap(path);
        } else if(response && response.data.error) {
            this.setState({
                errorMsg: response.data.error
            })
        }
    }

    resetExistingRouteInformation = () => {
        this.clearPerviousRoueteDetails();
        this.initializeGoogleMaps();
    }

    render() {
        return (
            <div className="Direction">
                <div className="location-details-form">
                {this.state.isLoading 
                ? <Loader />
                : null}
                <LocationDetailsForm
                    sendLocationAndGetRoute={this.sendLocationAndGetRoute}
                    showRouteDistAndTime={this.state.routeDetails.showRouteDistAndTime}
                    routeDetails={this.state.routeDetails}
                    resetExistingRouteInformation={this.resetExistingRouteInformation}
                />
                </div>
                <div className="error-container">
                    {this.state.errorMsg}
                </div>
                <MapComponent 
                    fieldRef={elem => (this.mapContainer = elem)}
                />
            </div>
        )
    }
}

export default Direction;

Direction.defaultProps = {
    googleMaps,
    mapSettings: {
        zoom: 12,
        center: { lat: 22.372081, lng: 114.107877 }
    }
}