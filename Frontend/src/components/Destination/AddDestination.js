import React, { useState } from 'react';
import destinationService from '../../services/destinationService';

const AddDestination = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: '',
        description: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        destinationService.addDestination(formData)
            .then(() => {
                setSuccessMessage('Destination added successfully!');
                setFormData({
                    name: '',
                    location: '',
                    price: '',
                    description: '',
                });
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" onChange={handleChange} />
            <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
            <button type="submit">Add Destination</button>
        </form>
    );
};

export default AddDestination;
