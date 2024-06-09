
import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/Api';
import UserList from './UserList';
import Summary from './Summary';
import '../styles/Dashboard.css';
import SubscriptionChart from './SubscriptionChart';


const Dashboard = () => {
    const [data, setData] = useState({ users: [], subscriptions: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedData = await fetchData();
                setData(fetchedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="dashboard">
        <div className='layout'>
        <Summary users={data.users} subscriptions={data.subscriptions} />
        <SubscriptionChart subscriptions={data.subscriptions} />
        </div>
        <UserList users={data.users} subscriptions={data.subscriptions} />
    </div>
    );
};

export default Dashboard;
