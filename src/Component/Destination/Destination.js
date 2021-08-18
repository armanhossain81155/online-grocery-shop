import React, { useContext } from 'react';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import map from '../../images/Map.png'
import Gmap from '../Gmap/Gmap';
import './Destination.css'

const Destination = () => {
    const [destination, setDestiantion] = useState({
        pickFrom:'',
        pickTo: ''
    })
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const handleDestination = (e) => {
        
        if(e.target.name === "pickFrom"){
            const pickFrom =  e.target.value;
            setDestiantion(pickFrom)
            setLoggedInUser(pickFrom)
        }
        if(e.target.name === "pickTo"){
            const pickTo = e.target.value;
            setDestiantion(pickTo)
            setLoggedInUser(pickTo)
        }

        e.preventDefault()
        
    }
    return (
        <div className="container destination-div">
            
            <div className="main-pick">
                <div className="pick-option">

                    <form action="handleDestination">
                        <h5>Pick From</h5>
                        <input name="pickFrom" onBlur={handleDestination} type="text" required/>
                        <br />
                        <h5>Pick To</h5>
                        <input name="pickTo" onBlur={handleDestination} type="text" required/>
                        <br />
                       

                        <input className="date-option"  type="datetime-local" name="" id="" />
                        


                       <br />
                        <Link><input className="search-option" type="submit" value="Search" /></Link>
                        
                    </form>
                    

                </div>
                <div className="map">
                    <Gmap></Gmap>
                </div>
            </div>
        </div>
    );
};

export default Destination;