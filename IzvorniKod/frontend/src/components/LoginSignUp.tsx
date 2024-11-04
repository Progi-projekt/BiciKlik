import React from 'react';
import "./loginsignup.css";

const loginsignup =() => {
    return (
    <div className="loginsignup">
        <form action="" method="post">

            <div className="container">
                <label htmlFor="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required />

                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required />

                <button type="submit">Login</button>
            </div>
        </form>

    </div>
    );
  }

export default loginsignup;