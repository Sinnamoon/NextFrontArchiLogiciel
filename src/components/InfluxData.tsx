import { useState, useEffect } from 'react';
import { fetchInfluxData, InfluxData as IInfluxData } from '~/lib/influxdbService';

export default function InfluxData() {
    const [data, setData] = useState<IInfluxData[]>([]);
    const [error, setError] = useState<Error|null>(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchInfluxData()
                .then(setData)
                .catch(setError);
        }, 3000); // Poll every 3 seconds

        // Fetch data initially
        fetchInfluxData()
            .then(setData)
            .catch(setError);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>InfluxDB Data</h2>
    <ul>
    {data.map((item, index) => (
            <li key={index}>
                {item._id} - {item.brand} - {item.model} - {item.plate} - {item.mileage} - {item.acceleration} - {item.lat} - {item.lon} - {item.year} - {item.speed}
                </li>
        ))}
    </ul>
    </div>
);
}
