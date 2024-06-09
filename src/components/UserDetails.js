import React from 'react';
import '../styles/UserDetails.css';

const UserDetails = ({ user, subscription, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-button" onClick={onClose}>&times;</span>
                <h3>Details for {user.first_name} {user.last_name}</h3>
                <hr/>
                <p> <b>Username: </b> {user.username}</p>
                <p> <b>Email: </b> {user.email}</p>
                <p><b>Address: </b>{user.address}</p>
                <p><b>Country: </b>{user.country}</p>
                <p><b>Subscription: </b> {subscription?.package || ''}</p>
                { subscription?.expires_on == undefined || null || '' ? '' : new Date (subscription?.expires_on) > new Date() ? <p><b>Expries On: </b>{subscription?.expires_on || ''}</p> : <p><b>Expried On: </b>{subscription?.expires_on || ''}</p> }
                
            </div>
        </div>
    );
};

export default UserDetails;
