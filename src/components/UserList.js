import React, { useState } from 'react';
import UserDetails from './UserDetails';
import '../styles/Dashboard.css';

const UserList = ({ users, subscriptions }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); 
    const [sortedUsers, setSortedUsers] = useState(users); 
    const usersPerPage = 10; 

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const getSubscription = (userId) => {
        return subscriptions.find(sub => sub.user_id === userId.toString());
    };

    
    const filteredUsers = sortedUsers.filter(user =>
        user.first_name.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase())
    );


    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;


    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

 
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

   
    const handleForwardClick = () => {
        if (indexOfLastUser < filteredUsers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleBackwardClick = () => {
        if (indexOfFirstUser > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFirstClick = () => {
        setCurrentPage(1);
    };

    const handleLastClick = () => {
        setCurrentPage(totalPages);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

  
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setCurrentPage(1); 
    };

   
    const handleSort = (sortField) => {
        const sorted = [...filteredUsers].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[sortField].localeCompare(b[sortField]);
            } else {
                return b[sortField].localeCompare(a[sortField]);
            }
        });
        setSortedUsers(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); 
        setCurrentPage(1); 
    };

    return (
        <div className="user-list">
            <h2>Users</h2>

            <div className='float-end'>
                <input
                    type="text"
                    placeholder="First name or email"
                    value={filter}
                    onChange={handleFilterChange}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>SN</th>
                        <th onClick={() => handleSort('first_name')}>First Name</th>
                        <th onClick={() => handleSort('last_name')}>Last Name</th>
                        <th onClick={() => handleSort('email')}>Email</th>
                        <th>User Status</th>
                        <th>Package</th>
                        <th>Subscription Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td>{indexOfFirstUser + index + 1}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.active === '1' ? 'Active' : 'Inactive'}</td>
                            <td>{getSubscription(user.id)?.package || ''}</td>
                            <td>{getSubscription(user.id)?.expires_on && new Date(getSubscription(user.id).expires_on) > new Date() && user.active === '1' ? 'Active' : 'Inactive'}</td>
                            <td><button onClick={() => handleUserClick(user)}>View</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedUser && (
                <UserDetails
                    user={selectedUser}
                    subscription={getSubscription(selectedUser.id)}
                    onClose={handleCloseModal}
                />
            )}

            <div className="pagination">
                {currentPage > 1 && (
                    <>
                        <button onClick={handleFirstClick}>First</button>
                        <button onClick={handleBackwardClick}>&laquo; Back</button>
                    </>
                )}
                <button onClick={handleForwardClick} disabled={indexOfLastUser >= filteredUsers.length}>
                    Next &raquo;
                </button>
                {currentPage < totalPages && (
                    <button onClick={handleLastClick}>Last</button>
                )}
            </div>
        </div>
    );
};

export default UserList;
