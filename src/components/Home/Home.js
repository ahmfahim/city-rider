import React from 'react';
import './Home.css';
import Navigation from '../Navigation/Navigation';
import RideTo from '../RideTo/RideTo';
import { FakeData} from './FakeInfo'

const Home = () => {
    const [data, setData] = [FakeData];
    return (
        <div className="home-body">
            <Navigation/>
            {
                data.map(info => <RideTo rideInfo={info}/>)
            }
            
        </div>
    );
};

export default Home;