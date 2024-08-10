import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import destinationService from '../../services/destinationService';

const UpdateDestination = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: '',
        description: '',
    });

    useEffect(() => {
        destinationService.getDestinationById(id)
            .then(data => setFormData(data))
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        destinationService.updateDestination(id, formData)
            .then(() => {
                // handle success
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} placeholder="Name" onChange={handleChange} />
            <input type="text" name="location" value={formData.location} placeholder="Location" onChange={handleChange} />
            <input type="number" name="price" value={formData.price} placeholder="Price" onChange={handleChange} />
            <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange}></textarea>
            <button type="submit">Update Destination</button>
        </form>
    );
};

export default UpdateDestination;
