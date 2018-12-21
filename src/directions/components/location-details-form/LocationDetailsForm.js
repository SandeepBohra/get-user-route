import React, { Component } from 'react';
import { googleMaps } from '../../services/google-maps/googleMap';
import DirectionInfo from '../direction-info/DirectionInfo';
import { InputPlacesAutocomplete } from '../../../shared/components/index';
import './LocationDetailsForm.css';


// This component is used to get the start and drop off location from the user and also to submit the locations to
// the API to get the path details
class LocationDetailsForm extends Component {
    constructor() {
        super();
        this.state = {
            startingLocation: '',
            dropOffPoint: '',
        }
    }

    handleSubmit = () => {
        const { startingLocation, dropOffPoint } = this.state;
        this.props.sendLocationAndGetRoute(startingLocation, dropOffPoint);
    }

    // Below method enables or disables the submit button
    enableSubmit = () => {
       const { startingLocation, dropOffPoint } = this.state;
        return startingLocation && dropOffPoint;
    }

    // Method to enable or disable button if input fields have some value
    enableReset = () => {
        const { startingLocation, dropOffPoint } = this.state;
        return startingLocation || dropOffPoint;
    }

    // update states(startingLocation and DropOffPoint) on selecting the places from autocomplete
    handleOnSelectAddress = (place, name) => {
        this.setState({
            [name]: place,
        })
    }

    // clear the values from form input fields
    clearInputFields = () => {
        this.setState({
            startingLocation: '',
            dropOffPoint: '',
        })
    }

    // Below method is used to reset the form inputs as well as reset the route on Map
    resetLocationDetails = () => {
        this.clearInputFields();
        this.props.resetExistingRouteInformation();
    }

    render() {
        const { routeDetails } = this.props;
        return (
            <div className="location-details-form">
                <InputPlacesAutocomplete 
                    label="Starting location"
                    handleOnSelectAddress={this.handleOnSelectAddress}
                    location={this.state.startingLocation}
                    inputName="startingLocation"
                />
                <InputPlacesAutocomplete 
                    label="Drop-off point"
                    handleOnSelectAddress={this.handleOnSelectAddress}
                    location={this.state.dropOffPoint}
                    inputName="dropOffPoint"
                />
                {
                  this.props.showRouteDistAndTime 
                  ? <DirectionInfo 
                      totalDistance={routeDetails.routeDistance}
                      totalTime={routeDetails.routeTime} />
                  : null
                }
                <div className="form-buttons">
                    <button 
                        disabled={!this.enableSubmit()} 
                        style={{marginRight: `30%`}} 
                        onClick={this.handleSubmit}>Submit</button>
                    <button 
                        disabled={!this.enableReset()}
                        onClick={this.resetLocationDetails}>Reset</button>
                </div>
            </div>
        );
    }
}

export default LocationDetailsForm;

LocationDetailsForm.defaultProps = {
    googleMaps,
}