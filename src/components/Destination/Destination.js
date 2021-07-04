import React, { useState } from 'react';
import './Destination.css';
import mapImg from '../../images/Map.png';
import Navigation from '../Navigation/Navigation';
import './SearchForm.css'
import { useParams } from 'react-router-dom';
import { FakeData } from '../Home/FakeInfo';

const Destination = () => {
    const { ID } = useParams();
    const vehicleInfo = FakeData.find(info => info.id === ID);
    const [info, setInfo] = useState(vehicleInfo);

    const getInfo = [vehicleInfo, vehicleInfo, vehicleInfo];

    const [error, setError] = useState('');
    const [search, setSearch] = useState(false);

    const [pick, setPick] = useState({ pickFrom: "", pickTo: "" })

    const handleBlur = (e) => {
        if (e.target.name === 'pickfrom') {
            setPick({ ...pick, pickFrom: e.target.value });
        }
        if (e.target.name === 'pickto') {
            setPick({ ...pick, pickTo: e.target.value });
        }
    }

    const handleSearch = () => {
        if (pick.pickTo === '' && pick.pickFrom === '') {
            setError("Input Your Location");
        } else {
            setSearch(true);
        }

    }

    return (
        <div>
            <Navigation />
            <div className="container">
                <div className="row destination-row">

                    <div className="search-column col-lg-5 col-md-4 col-sm-12">

                        {
                            search ? (<div className="result-body">
                                <ul className="destination">
                                    <div className="borderLeft">
                                        <li>{pick.pickFrom}</li>
                                        <li>{pick.pickTo}</li>
                                    </div>
                                </ul>
                                {
                                    getInfo.map(result => <div className="displayResult d-flex justify-content-center">
                                        <img className="resultImg" src={result.imgUrl} alt="" />
                                        <p className="result-text">{result.name}</p>
                                        <strong className="result-text">Rent: {result.cost}</strong>
                                    </div>)
                                }
                            </div>) : (
                                <form onSubmit={handleSearch} className="form-body">
                                    {<p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                                    <p className="input-title">Pick From</p>
                                    <input
                                        className="input-body"
                                        type="text"
                                        name="pickfrom"
                                        placeholder="Your Current Location"
                                        required
                                        onBlur={handleBlur} />

                                    <p className="input-title">Pick To</p>

                                    <input
                                        className="input-body"
                                        type="text"
                                        name="pickto"
                                        placeholder="Your Destination"
                                        required
                                        onBlur={handleBlur} />

                                    <p className="input-title">Date</p>

                                    <input
                                        className="input-body"
                                        type="date"
                                        name=""
                                        id=""
                                        required />

                                    <p className="input-title">Time</p>

                                    <input
                                        className="input-body"
                                        type="time" name=""
                                        id=""
                                        required />

                                    <input
                                        className="input-body search-btn"
                                        type="submit"
                                        value="Search" />
                                </form>
                            )
                        }

                    </div>

                    <div className="map-column col-lg-7 col-md-8 col-sm-12">
                        <img src={mapImg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destination;