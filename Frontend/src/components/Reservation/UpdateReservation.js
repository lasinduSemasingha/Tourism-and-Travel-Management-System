import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import reservationService from '../../services/reservationService';

const UpdateReservation = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        destination: '',
        ticketDetails: '',
        status: '',
    });

    useEffect(() => {
        reservationService.getReservationById(id)
            .then(data => setFormData(data))
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        reservationService.updateReservation(id, formData)
            .then(() => {
                // handle success
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="destination" value={formData.destination} placeholder="Destination ID" onChange={handleChange} />
            <input type="text" name="ticketDetails" value={formData.ticketDetails} placeholder="Ticket Details" onChange={handleChange} />
            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
            </select>
            <button type="submit">Update Reservation</button>
        </form>
    );
};

export default UpdateReservation;
