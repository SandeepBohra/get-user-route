import React, { Component } from 'react';
import { googleMaps } from '../../Services/googleMap'
import { DirectionInfo } from '../DirectionInfo/DirectionInfo'
import { GooglePlacesAutocomplete } from '../../../Shared/Components/index'
import './LocationDetailsForm.css'


class LocationDetailsForm extends Component {
    originInput;
    originInputAutoComplete;
    destInputAutoComplete;
    destInput;
    constructor() {
        super()
        this.state = {
            submitEnabled: false,
            startingLocation: '',
            dropOffPoint: '',
        }
    }

    renderAutoComplete = async () => {
        const maps = await this.props.googleMaps();

        this.originInputAutoComplete = new maps.places.Autocomplete(this.originInput);
        this.destInputAutoComplete = new maps.places.Autocomplete(this.destInput);
    };

    componentDidMount() {
        this.renderAutoComplete();
    }

    handleSubmit = () => {
        const startingPoint = this.originInputAutoComplete.getPlace();
        const dropPoint = this.destInputAutoComplete.getPlace();
        this.props.sendLocationAndGetRoute(startingPoint, dropPoint)
    }

   enableSubmit = () => {
       const startingLocation = this.state.startingLocation
       const dropOffPoint = this.state.dropOffPoint
        return startingLocation && dropOffPoint
    }

    handleChange = e => {
        debugger
        const {name, value} = e.target
        this.setState({
            [name]: value,
        })
    }

    clearInputFields = () => {
        this.setState({
            startingLocation: '',
            dropOffPoint: '',
        })
        this.originInput.value = '';
        this.destInput.value = '';
    }

    resetLocationDetails = () => {
        this.clearInputFields();
        this.props.resetExistingRouteInformation()
    }

    render() {
        const {routeDistance, routeTime} = this.props
        return (
            <div className="LocationDetailsForm">
                <GooglePlacesAutocomplete 
                    label="Strarting location"
                    handleInputChange={this.handleChange}
                    fieldRef={elem => (this.originInput = elem)}
                    inputName="startingLocation"
                />
                <GooglePlacesAutocomplete 
                    label="Drop-off point"
                    handleInputChange={this.handleChange}
                    fieldRef={elem => (this.destInput = elem)}
                    inputName="dropOffPoint"
                />
                {this.props.showRouteDistAndTime ?
                <DirectionInfo 
                    totalDistance={routeDistance}
                    totalTime={routeTime}
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