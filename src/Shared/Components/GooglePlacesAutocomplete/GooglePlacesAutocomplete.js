import React, { Component } from 'react';
import './GooglePlacesAutocomplete.css'

class GooglePlacesAutocomplete extends Component {
    render() {
        return(
            <div className="GooglePlacesAutocomplete">
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

export default GooglePlacesAutocomplete;