import React, { Component } from 'react';
import { googleMaps } from '../../../directions/services/google-maps/googleMap'
import './InputPlacesAutocomplete.css'

// Component which shows suggestions of places as user starts to type in the input field
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

    // The below method is used to suggest places as the user starts typing in the inputs
    renderAutoComplete = async () => {
        const maps = await this.props.googleMaps();
        this.inputAutoComplete = new maps.places.Autocomplete(this.inputElem);
        // Below event gets invloked if the user selects any place from the autocomplete dropdown
        this.inputAutoComplete.addListener('place_changed', ()=>{
            const place = this.inputAutoComplete.getPlace()
            if (place) {
                this.props.handleOnSelectAddress(place, this.props.inputName)
            }
        })
    };

    componentDidUpdate() {
        // The below logic is used to clear out the input field values
        if(!this.props.location) {
            this.inputElem.value = null
        }
    }

    // The below method ensures not to submit the empty values to the API
    handleOnChange = (e) => {
        const userInput = e.target.value.trim();

        if (!Boolean(userInput)) {
            this.props.handleOnSelectAddress('', this.props.inputName);
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
                    onChange={this.handleOnChange}
                />
            </div>
        )
    }
}

export default InputPlacesAutocomplete;

InputPlacesAutocomplete.defaultProps = {
    googleMaps,
}
