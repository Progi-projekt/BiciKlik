import React, { useState } from 'react';

const AdminPanel = () => {
    const [email, setEmail] = useState('');
    interface UserInfo {
        email: string;
        first_name: string;
        is_organizer: boolean;
        is_admin: boolean;
        archived_reason?: string;
    }

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        console.log(email);
    };

    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`/api/admin/user/${email}`);
            const data = await response.json();
            setUserInfo(data);
        } catch (err) {
            throw new Error('Error fetching user info');
        }
    };

    const banThisGuyNOW = async () => {
        try {
            const response = await fetch(`/api/admin/user/:email/archive`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userInfo?.email }),
            });
            if (response.ok) {
                alert('User banned successfully!');
                fetchUserInfo();
            } else {
                alert('Error banning user!');
            }
        } catch (err) {
            throw new Error('Error banning user');
        }
    }

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <p>Welcome to the admin panel. This is a placeholder for future functionality.</p>
            <div className="input-container">
                <input
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Enter user email"
                />
                <button onClick={fetchUserInfo}>Get User Info</button>
            </div>
            {userInfo && (
                <div className="user-info">
                    <h2>User Info</h2>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>First Name:</strong> {userInfo.first_name}</p>
                    <p><strong>Is Organizer:</strong> {userInfo.is_organizer ? 'Yes' : 'No'}</p>
                    <p><strong>Is Admin:</strong> {userInfo.is_admin ? 'Yes' : 'No'}</p>
                    <p><strong>Archived Reason:</strong> {userInfo.archived_reason || 'N/A'}</p>
                    <button onClick={banThisGuyNOW}>Ban Hammer</button>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;