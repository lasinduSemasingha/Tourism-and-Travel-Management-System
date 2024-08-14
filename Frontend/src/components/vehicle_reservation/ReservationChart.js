import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Container, Typography, Select, MenuItem, CircularProgress } from '@mui/material';
import 'chart.js/auto'; // Import Chart.js components

const ReservationChart = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState('day'); // day or week
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vehiclereservations');
                setReservations(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching vehicle reservations:", err.response ? err.response.data : err.message);
                setError('Error fetching vehicle reservations');
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    useEffect(() => {
        if (!reservations.length) return;

        // Prepare chart data based on reservations and selected date range
        const aggregateData = () => {
            const vehicleCounts = {
                car: 0,
                bike: 0,
                truck: 0,
                cab: 0,
                van: 0
            };

            reservations.forEach(reservation => {
                const vehicleType = reservation.vehicleId.vehicleType?.toLowerCase();
                if (vehicleCounts[vehicleType] !== undefined) {
                    vehicleCounts[vehicleType]++;
                }
            });

            // Create chart data
            const data = {
                labels: ['Car', 'Bike', 'Truck', 'Cab', 'Van'],
                datasets: [
                    {
                        label: 'Number of Reservations',
                        data: [
                            vehicleCounts.car,
                            vehicleCounts.bike,
                            vehicleCounts.truck,
                            vehicleCounts.cab,
                            vehicleCounts.van
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)', // Color for Car
                            'rgba(54, 162, 235, 0.2)', // Color for Bike
                            'rgba(255, 206, 86, 0.2)', // Color for Truck
                            'rgba(75, 192, 192, 0.2)', // Color for Cab
                            'rgba(153, 102, 255, 0.2)' // Color for Van
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)', // Border color for Car
                            'rgba(54, 162, 235, 1)', // Border color for Bike
                            'rgba(255, 206, 86, 1)', // Border color for Truck
                            'rgba(75, 192, 192, 1)', // Border color for Cab
                            'rgba(153, 102, 255, 1)' // Border color for Van
                        ],
                        borderWidth: 1
                    }
                ]
            };

            setChartData(data);
        };

        aggregateData();
    }, [reservations, dateRange]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container>
            <Typography variant="h4">Reservations by Vehicle Type</Typography>
            <Select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
            >
                <MenuItem value="day">Daily</MenuItem>
                <MenuItem value="week">Weekly</MenuItem>
            </Select>
            <div style={{ marginTop: '40px' }}>
                {chartData ? <Bar data={chartData} options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(0); // Ensure integer values
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1 // Ensures y-axis values are integers
                            }
                        }
                    }
                }} /> : <Typography>No data available</Typography>}
            </div>
        </Container>
    );
};

export default ReservationChart;
