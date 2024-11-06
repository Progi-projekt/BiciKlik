import React, { useState, FormEvent } from 'react';
import "./loginsignup.css";

const Loginsignup = () => {
    // Defining state types
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            });
      
            const data = await response.json();
      
            if (response.ok) {
              setMessage(data.message); // Show success message
            } else {
              setMessage(data.message); // Show error message from backend
            }
        } catch (error) {
            setMessage('An error occurred.');
        }
    };
    
    
    
    return (
    <div className="loginsignup">
        <form onSubmit={handleSubmit}>

            <div className="container">
              <p className='LogInNaslov'>User Login</p>
                <label htmlFor="mail"><b>Mail</b></label>
                <input type="text" placeholder="Email" name="mail" value={username} onChange={(e) => setUsername(e.target.value)} required />

                <label htmlFor="password"><b>Password</b></label>
                <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">Login</button>
                <p>{message}</p> {/* Display login success/error message */}
            </div>
        </form>

    </div>
    );
  };

export default Loginsignup;