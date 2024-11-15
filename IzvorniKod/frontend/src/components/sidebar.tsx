import React from 'react';
import './sidebar.css';

const Sidebar = () => {
  const contacts = ['Zoran', 'Zdravko', 'Dražen', 'Siniša'];

  return (
    <div className="sidebar">
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact} className="contact">
            {contact}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;