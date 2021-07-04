import React from 'react';
import './RideTo.css';
import { Link } from 'react-router-dom';

const RideTo = ({ rideInfo }) => {
    return (
        <div className="container">
            <div className="rider">
                <div className="column">
                    <Link to={`destination/${rideInfo.id}`}>
                        <img src={rideInfo.imgUrl} alt="" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RideTo;