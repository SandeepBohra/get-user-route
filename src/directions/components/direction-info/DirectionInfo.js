import React from 'react';
import './DirectionInfo.css'

class DirectionInfo extends React.PureComponent {
    render() {
        return (
            <div className="direction-info">
                <div className="route-distance">
                    <label>{`Total distance: ${this.props.totalDistance}`}</label>
                </div>
                <div className="route-time">
                    <label>{`Total time: ${this.props.totalTime}`}</label>
                </div>
            </div>
        )
    }
}


export default DirectionInfo;