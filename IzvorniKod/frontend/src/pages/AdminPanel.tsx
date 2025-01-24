import React, { useState } from 'react';
import '../components/adminpanel.css';

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
            const response = await fetch(`/api/admin/user/${email}/archive`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reason: 'Banned by admin' }),
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

    const promoteUser = async () => {
        try {
            const response = await fetch(`/api/admin/user/${email}/promote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: 'organizer' }), // Adjust the body as needed
            });
            if (response.ok) {
                alert('User promoted successfully!');
                fetchUserInfo();
            } else {
                alert('Error promoting user!');
            }
        } catch (err) {
            throw new Error('Error promoting user');
        }
    };

    const demoteUser = async () => {
        try {
            const response = await fetch(`/api/admin/user/${email}/demote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: 'user' }), // Adjust the body as needed
            });
            if (response.ok) {
                alert('User demoted successfully!');
                fetchUserInfo();
            } else {
                alert('Error demoting user!');
            }
        } catch (err) {
            throw new Error('Error demoting user');
        }}

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
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
                    <button onClick={banThisGuyNOW}>Ban</button>
                    {userInfo.is_organizer ? <button onClick={demoteUser}>Demote user</button> : <button onClick={promoteUser}>Promote user to Organizer</button>}  
                </div>
            )}
        </div>
    );
};

export default AdminPanel;