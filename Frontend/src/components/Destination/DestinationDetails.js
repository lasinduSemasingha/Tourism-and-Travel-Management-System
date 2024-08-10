import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import destinationService from '../../services/destinationService';

const DestinationDetails = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState(null);

    useEffect(() => {
        destinationService.getDestinationById(id)
            .then(data => setDestination(data))
            .catch(error => console.error(error));
    }, [id]);

    if (!destination) return <div>Loading...</div>;

    return (
        <div>
            <h2>{destination.name}</h2>
            <p>{destination.description}</p>
            <p>Location: {destination.location}</p>
            <p>Price: ${destination.price}</p>
            <p>Availability: {destination.availability ? 'Available' : 'Unavailable'}</p>
        </div>
    );
};

export default DestinationDetails;
