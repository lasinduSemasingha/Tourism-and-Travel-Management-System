import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reservations';

const getAllReservations = () => {
    return axios.get(API_URL);
};

const addReservation = (reservation) => {
    return axios.post(API_URL, reservation);
};

const reservationService = {
    getAllReservations,
    addReservation,
    // Add other reservation related methods here (e.g., updateReservation, deleteReservation)
};

export default reservationService;
