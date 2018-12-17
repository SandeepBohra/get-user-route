import React, { Component } from 'react';
import { googleMaps } from '../../Services/googleMap'
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
        debugger
        return this.state.startingLocation && this.state.dropOffPoint
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({
            [name]: value,
        })
    }

    render() {
        const {routeDistance, routeTime} = this.props
        return (
            <div className="LocationDetailsForm">
                <div className="form-control">
                    <p>Starting location</p>
                    <input type="text" 
                        ref={elem => (this.originInput = elem)} 
                        onChange={this.handleChange}
                        name="startingLocation"
                    />
                </div>
                <div className="form-control">
                    <p>Drop-off point</p>
                    <input type="text" 
                        ref={elem => (this.destInput = elem)} 
                        onChange={this.handleChange}
                        name="dropOffPoint"
                    />
                </div>
                {this.props.showRouteDistAndTime ?
                    <div className="route-details">
                        <div>{`Total distance: ${routeDistance}`}</div>
                        <div>{`Total time: ${routeTime}`}</div>
                    </div>
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