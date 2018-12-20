import React, { Component } from 'react';
import { googleMaps } from '../../../directions/services/google-maps/googleMap'
import './InputPlacesAutocomplete.css'

class InputPlacesAutocomplete extends Component {
    inputAutoComplete;
    constructor(props) {
        super(props)
        this.state = {
            address: '',
        }
    }

    componentDidMount() {
        this.renderAutoComplete();
    }

    renderAutoComplete = async () => {
        const maps = await this.props.googleMaps();
        this.inputAutoComplete = new maps.places.Autocomplete(this.inputElem);
        this.inputAutoComplete.addListener('place_changed', ()=>{
            const place = this.inputAutoComplete.getPlace()
            if (place) {
                this.props.handleOnSelectAddress(place, this.props.inputName)
            }
        })
    };

    componentDidUpdate() {
        if(!this.props.location) {
            this.inputElem.value = null
        }
    }


    render() {
        return(
            <div className="input-places-autocomplete">
                <p>{this.props.label}</p>
                <input 
                    type="text" 
                    name={this.props.inputName} 
                    ref={elem => (this.inputElem = elem)}
                />
            </div>
        )
    }
}

export default InputPlacesAutocomplete;

InputPlacesAutocomplete.defaultProps = {
    googleMaps,
}
