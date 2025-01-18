import React, { useState, useEffect, useCallback } from 'react';
import './sidebar.css';

interface SidebarProps {
  onUserSelect: (email: string) => void; // Function to notify parent of user selection
}

const Sidebar: React.FC<SidebarProps> = ({ onUserSelect }) => {
  const [contacts, setContacts] = useState<string[]>([]); // Contacts now store only emails
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search input value

  // Fetch recent contacts on load
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/chat');
        if (response.ok) {
          const data = await response.json();
          const emails = data.map((contact: { email: string }) => contact.email); // Extract emails
          setContacts(emails);
        } else {
          console.error('Failed to fetch contacts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  // Memoized search handler
  const handleSearch = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault(); // Prevent default form submission behavior

      if (!searchTerm || !searchTerm.trim()) {
        console.error('Search term is empty or undefined. Skipping API call.');
        return;
      }

      console.log('Sending API request to:', `/api/chat/${searchTerm.trim()}`);
      try {
        const response = await fetch(`/api/chat/${searchTerm.trim()}`);
        if (response.ok) {
          const user = searchTerm.trim();

          // Add the email to contacts if it doesn't already exist
          if (!contacts.includes(user)) {
            setContacts((prevContacts) => [...prevContacts, user]);
          }

          setSearchTerm(''); // Clear search input
          onUserSelect(user); // Notify parent of user selection
        } else {
          console.error('Failed to find user:', response.statusText);
        }
      } catch (error) {
        console.error('Error searching for user:', error);
      }
    },
    [contacts, onUserSelect, searchTerm]
  );

  return (
    <div className="sidebar">
      <h2>Contacts</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search email."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {contacts.map((email) => (
          <li
            key={email}
            className="contact"
            onClick={() => onUserSelect(email)}
          >
            {email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
