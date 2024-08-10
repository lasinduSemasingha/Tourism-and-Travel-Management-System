import React, { useEffect, useState } from 'react';
import destinationService from '../../services/destinationService';

const DestinationList = () => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        destinationService.getDestinations()
            .then(data => setDestinations(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Destination List</h2>
            <ul>
                {destinations.map(destination => (
                    <li key={destination._id}>
                        {destination.name} - {destination.location} - ${destination.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DestinationList;
