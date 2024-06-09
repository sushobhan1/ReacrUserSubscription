
import React from 'react';
import '../styles/Dashboard.css'

const Summary = ({ users, subscriptions }) => {
   
    const userIds = users.map(user => user.id); 
    console.log(userIds)
    
    const totalUsers = users.length;
    const totalSubscription = subscriptions.length;
    const activeSubscriptions =  subscriptions.filter(sub => new Date(sub.expires_on) > new Date() && (users.filter(user=>user.id == sub.user_id).length>0) == true ).length;
    const inActiveSubscriptions = subscriptions.filter(sub => new Date(sub.expires_on) < new Date()).length;
    const totalSubscriber = subscriptions.filter(sub=> (users.filter(user=>user.id == sub.user_id).length>0)).length;
    return (
        <div className="summary">
            <h2>Summary</h2>
            <p>Total Users: {totalUsers}</p>
            <p>Total Subscriptions: {totalSubscription}</p>
            <p>Active Subscriptions: {activeSubscriptions}</p>
            <p>Inactive Subscriptions: {inActiveSubscriptions}</p>
            <p>Total Subscribers: {totalSubscriber}</p>
        </div>
    );
};

export default Summary;
