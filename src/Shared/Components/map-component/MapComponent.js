import React,{ Component } from 'react';
import './MapComponent.css'

class MapComponent extends Component {
    render() {
        return(
            <div className="MapComponent">
                <div className="map-container">
                    <div id='map' ref={this.props.fieldRef}></div>
                </div>
            </div>
        )
    }
}

export default MapComponent;