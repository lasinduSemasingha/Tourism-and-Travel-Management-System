import axios from 'axios';

const API_URL = 'http://localhost:5000/api/destinations';

const getAllDestinations = () => {
    return axios.get(API_URL);
};

const addDestination = (destination) => {
    return axios.post(API_URL, destination);
};

const destinationService = {
    getAllDestinations,
    addDestination,
    // Add other destination related methods here (e.g., updateDestination, deleteDestination)
};

export default destinationService;
