import React, { useEffect, useState } from 'react';
import reservationService from '../../services/reservationService';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        reservationService.getReservations()
            .then(data => setReservations(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Reservation List</h2>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation._id}>
                        Reservation for {reservation.destination.name} on {new Date(reservation.reservedAt).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReservationList;
