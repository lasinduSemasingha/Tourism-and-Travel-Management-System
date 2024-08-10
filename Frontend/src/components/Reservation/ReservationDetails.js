import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import reservationService from '../../services/reservationService';

const ReservationDetails = () => {
    const { id } = useParams();
    const [reservation, setReservation] = useState(null);

    useEffect(() => {
        reservationService.getReservationById(id)
            .then(data => setReservation(data))
            .catch(error => console.error(error));
    }, [id]);

    if (!reservation) return <div>Loading...</div>;

    return (
        <div>
            <h2>Reservation Details</h2>
            <p>Destination: {reservation.destination.name}</p>
            <p>Ticket Details: {reservation.ticketDetails}</p>
            <p>Status: {reservation.status}</p>
            <p>Reserved At: {new Date(reservation.reservedAt).toLocaleDateString()}</p>
        </div>
    );
};

export default ReservationDetails;
