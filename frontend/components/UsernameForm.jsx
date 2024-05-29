import { useState } from 'react';
import { useSession } from 'next-auth/react';

const UsernameForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(username);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UsernameForm;
