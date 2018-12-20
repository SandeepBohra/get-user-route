import React from 'react';
import './DirectionInfo.css'

// This component is used to show the route details like route distance and route time, after receiving the response
class DirectionInfo extends React.PureComponent {
    render() {
        return (
            <div className="direction-info">
                <div>
                    <label>{`Total distance: ${this.props.totalDistance}`}</label>
                </div>
                <div>
                    <label>{`Total time: ${this.props.totalTime}`}</label>
                </div>
            </div>
        )
    }
}


export default DirectionInfo;