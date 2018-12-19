import React, { Component } from 'react';
import { googleMaps } from '../../services/google-maps/googleMap';
import DirectionInfo from '../direction-info/DirectionInfo';
import { InputPlacesAutocomplete } from '../../../shared/components/index';
import './LocationDetailsForm.css';


class LocationDetailsForm extends Component {
    constructor() {
        super()
        this.state = {
            submitEnabled: false,
            startingLocation: '',
            dropOffPoint: '',
            clearInputField: false,
        }
    }

    handleSubmit = () => {
        const startingPoint = this.state.startingLocation;
        const dropPoint = this.state.dropOffPoint;
        this.props.sendLocationAndGetRoute(startingPoint, dropPoint)
    }

   enableSubmit = () => {
       const startingLocation = this.state.startingLocation
       const dropOffPoint = this.state.dropOffPoint
        return startingLocation && dropOffPoint
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({
            [name]: value,
        })
    }

    handleOnSelectAddress = (place, name) => {
        this.setState({
            [name]: place,
        })
    }

    clearInputFields = () => {
        this.setState({
            startingLocation: '',
            dropOffPoint: '',
        })
        this.setState({
            clearInputField: true,
        })
    }

    resetLocationDetails = () => {
        this.clearInputFields();
        this.props.resetExistingRouteInformation()
    }

    render() {
        const { routeDetails } = this.props
        return (
            <div className="LocationDetailsForm">
                <InputPlacesAutocomplete 
                    label="Strarting location"
                    handleOnSelectAddress={this.handleOnSelectAddress}
                    ref={elem => (this.originInput = elem)}
                    location={this.state.startingLocation}
                    inputName="startingLocation"
                />
                <InputPlacesAutocomplete 
                    label="Drop-off point"
                    handleOnSelectAddress={this.handleOnSelectAddress}
                    ref={elem => (this.destInput = elem)}
                    location={this.state.dropOffPoint}
                    inputName="dropOffPoint"
                />
                {this.props.showRouteDistAndTime ?
                <DirectionInfo 
                    totalDistance={routeDetails.routeDistance}
                    totalTime={routeDetails.routeTime}
                />
                : null}
                <div className="form-buttons">
                    <button 
                        disabled={!this.enableSubmit()} 
                        style={{marginRight: `30%`}} 
                        onClick={this.handleSubmit}>Submit</button>
                    <button 
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