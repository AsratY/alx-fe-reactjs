import React, { useState } from 'react';
import { fetchUser } from '../services/githubService';

const Home = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const data = await fetchUser(username);
      setUserData(data);
      setError('');
    } catch (err) {
      setError('User not found');
      setUserData(null);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter GitHub username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}
      {userData && (
        <div>
          <h2>{userData.login}</h2>
          <img src={userData.avatar_url} alt={userData.login} width="100" />
          <p>Followers: {userData.followers}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
