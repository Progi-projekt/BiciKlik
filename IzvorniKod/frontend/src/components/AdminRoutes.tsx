import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AdminRoutes = () => {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const response = await fetch('/api/auth/getAuthorization');
                const data = await response.json();
                setAuth(data.is_admin);
                setAuth(true); // EVERYONE IS ADMIN FOR TESTING PURPOSES, REMOVE LATER!!!
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

    return auth ? <Outlet /> : <Navigate to='/notAllowed' />;
};

export default AdminRoutes;