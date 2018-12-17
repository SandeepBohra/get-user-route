import React, { Component } from 'react';
import LocationDetailsForm from './LocationDetailsForm/LocationDetailsForm';
import { googleMaps } from '../Services/googleMap'
import { getTokenAndRoute } from '../Services/getUserRoute'
import './Direction.css';


class Direction extends Component {
    mapContainer
    constructor() {
        super();
        this.localMapVariable = {};
        this.renderMap = {};
        this.state = {
            isLoading: false,
            routeReceived: null,
            showRouteDistAndTime: false,
            routeDistance: '',
            routeTime: '',
        }
    }
    componentDidMount() {
        this.initializeGoogleMaps();
    }
    
    initializeGoogleMaps = async () => {
        const mapSettings = {
            zoom: 12,
            center: { lat: 22.372081, lng: 114.107877 }
        }
        const { googleMaps } = this.props
        this.localMapVariable = await googleMaps();
        this.renderMap = new this.localMapVariable.Map(this.mapContainer, mapSettings);
    }

    drawRouteOnMap = (path) => {
        const directionService = new this.localMapVariable.DirectionsService();
        const directionRenderer = new this.localMapVariable.DirectionsRenderer();
        const origin = path[0];
        const dest = path[path.length -1];
        directionRenderer.setMap(this.renderMap);
        directionService.route({
            origin: new this.localMapVariable.LatLng(origin[0], origin[1]),
            destination: new this.localMapVariable.LatLng(dest[0], dest[1]),
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

    sendLocationAndGetRoute = async (orig, dest) => {
        this.showLoader(true)
        const response = await getTokenAndRoute(orig, dest);
        this.showLoader(false)
        if(response.data && response.data.path) {
            this.setState({
                showRouteDistAndTime: true,
                routeDistance: response.data.total_distance,
                routeTime: response.data.total_time
            })
            const { path } = response.data
            this.drawRouteOnMap(path);
        } else if(response.data && response.data.error) {
            alert(response.data.error);
        }
    }

    renderLoader = () => {
        return (
            <div className="loader-container">
                <div className="loader" />
            </div>
        )
    }

    render() {
        return (
            <div className="Direction">
                <div className="location-details-form">
                {this.state.isLoading 
                ? this.renderLoader()
                : null}
                <LocationDetailsForm
                    sendLocationAndGetRoute={this.sendLocationAndGetRoute}
                    showRouteDistAndTime={this.state.showRouteDistAndTime}
                    routeDistance={this.state.routeDistance}
                    routeTime={this.state.routeTime}
                />
                </div>
                <div className="map-container">
                    <div id='map' ref={elem => (this.mapContainer = elem)}></div>
                </div>
            </div>
        )
    }
}

export default Direction;

Direction.defaultProps = {
    googleMaps,
}