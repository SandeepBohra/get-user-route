import React, { Component } from 'react';
import LocationDetailsForm from './components/location-details-form/LocationDetailsForm';
import { googleMaps } from './services/google-maps/googleMap';
import { getUserRouteAndToken } from './services/mock-API/index';
import { MOCK_API_ERROR } from './constants/errorTypes';
import { Loader } from '../shared/components/index'
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
    
    // Initializing google maps with default props settings
    initializeGoogleMaps = async () => {
        const { googleMaps } = this.props
        this.googleMaps = await googleMaps();
        this.renderMap = new this.googleMaps.Map(this.mapContainer, this.props.mapSettings);
    }

    // This method is drawing the route on the map after receving the map coordinates from the API
    drawRouteOnMap = (route) => {
        const directionService = new this.googleMaps.DirectionsService();
        const directionRenderer = new this.googleMaps.DirectionsRenderer();
        const origin = route[0];
        const dest = route[route.length -1];
        directionRenderer.setMap(this.renderMap);
        const request = {
            origin: new this.googleMaps.LatLng(origin[0], origin[1]),
            destination: new this.googleMaps.LatLng(dest[0], dest[1]),
            travelMode: "DRIVING"
        }
        directionService.route(request, (response, status) => {
            if (status === 'OK') {
                debugger
                directionRenderer.setDirections(response);
            }
        });
    }

    // the below method is used to show the loader for pending ajax state
    showLoader = (set) => {
        this.setState({
            isLoading: set
        })
    }

    // resetting previous ruote detail information
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

    // calling Mock API to get the token and then using it to get the route details
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

    // resetting all the data and re-initializing map
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
                <div className="map-container" >
                    <div className="map" ref={elem => {this.mapContainer = elem}}></div>
                </div>
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