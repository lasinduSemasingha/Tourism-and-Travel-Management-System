import React, { useState } from 'react';
import reservationService from '../../services/reservationService';

const AddReservation = () => {
    const [formData, setFormData] = useState({
        destination: '',
        ticketDetails: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        reservationService.addReservation(formData)
            .then(() => {
                // handle success
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="destination" placeholder="Destination ID" onChange={handleChange} />
            <input type="text" name="ticketDetails" placeholder="Ticket Details" onChange={handleChange} />
            <button type="submit">Add Reservation</button>
        </form>
    );
};

export default AddReservation;
