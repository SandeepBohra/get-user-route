import React,  { Component } from 'react';
import './DirectionInfo.css'

export const DirectionInfo = (props) => (
    <div className="DirectionInfo">
        <div className="route-distance">
            <label>{`Total distance: ${props.totalDistance}`}</label>
        </div>
        <div className="route-time">
            <label>{`Total time: ${props.totalTime}`}</label>
        </div>
    </div>
)