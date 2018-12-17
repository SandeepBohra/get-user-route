import React,  { Component } from 'react';
import './DirectionInfo.css'

export const DirectionInfo = ({totalDistance, totalTime}) => (
    <div className="DirectionInfo">
        <div className="route-distance">
            <label>{`Total distance: ${totalDistance}`}</label>
        </div>
        <div className="route-time">
            <label>{`Total time: ${totalTime}`}</label>
        </div>
    </div>
)