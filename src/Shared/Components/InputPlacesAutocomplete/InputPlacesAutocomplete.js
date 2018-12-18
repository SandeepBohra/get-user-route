import React, { Component } from 'react';
import './InputPlacesAutocomplete.css'

class InputPlacesAutocomplete extends Component {
    render() {
        return(
            <div className="InputPlacesAutocomplete">
                <p>{this.props.label}</p>
                <input 
                    type="text" 
                    name={this.props.inputName} 
                    ref={this.props.fieldRef}
                    onChange={this.props.handleInputChange}
                />
            </div>
        )
    }
}

export default InputPlacesAutocomplete;