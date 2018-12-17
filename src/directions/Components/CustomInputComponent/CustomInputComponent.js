import React, { Component } from 'react';
import './CustomInputComponent.css'

class CustomInputComponent extends Component {
    
    render() {
        return(
            <div className="CustomInputComponent">
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

export default CustomInputComponent;