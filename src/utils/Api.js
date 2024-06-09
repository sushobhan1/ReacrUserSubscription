// src/utils/api.js
export const fetchData = async () => {
    const usersResponse = await fetch('/data/users.json', {
        headers: {
            'Cache-Control': 'no-cache'
        }
    });

    if (!usersResponse.ok) {
        throw new Error('Failed to fetch users');
    }

    const users = await usersResponse.json();
    
    const subscriptionsResponse = await fetch('/data/subscriptions.json', {
        headers: {
            'Cache-Control': 'no-cache'
        }
    });

    if (!subscriptionsResponse.ok) {
        throw new Error('Failed to fetch subscriptions');
    }

    const subscriptions = await subscriptionsResponse.json();
    
    return { users, subscriptions };
};
