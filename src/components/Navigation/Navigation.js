import React, { useContext } from 'react';
import './Navigation.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import {UserContext} from '../../App';
import { FakeData} from '../Home/FakeInfo'

const Navigation = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const defaultLink = FakeData[0];
    const signOut = () =>{
        setLoggedInUser({});
    }
    return (
        <div className="container">
            <Navbar collapseOnSelect expand="lg"  variant="light">
                <Navbar.Brand href="#home">
                    <Link className="nav-item logo" to="/">City Rider</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <Link className="nav-item" to="/home">Home</Link>
                        <Link className="nav-item" to={`/destination/${defaultLink.id}`}>Destination</Link>
                        <Link className="nav-item" to="/">Blog</Link>
                        <Link className="nav-item" to="/">Contact</Link>
                        {
                            loggedInUser.email ? (
                                <Link onClick={signOut} className="nav-item login-btn"> Logout</Link>
                            ):(
                                <Link className="nav-item login-btn" to="/login">Login</Link>
                            )
                        }
                        {loggedInUser.name && <strong style={{ marginLeft: '5px',marginTop:'8px',color:'tomato' }}>{loggedInUser.name}</strong>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navigation;