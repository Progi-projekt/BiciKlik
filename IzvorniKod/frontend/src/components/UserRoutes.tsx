import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const UserRoutes = () => {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const response = await fetch('/api/auth/getAuthorization');
                const data = await response.json();
                setAuth(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setAuth(false);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthStatus();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    return auth.error == null ? <Outlet /> : <Navigate to='/notAllowed' />;
};

export default UserRoutes;