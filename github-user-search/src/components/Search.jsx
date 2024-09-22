import React, { useState } from 'react';
import { searchUsers, fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState(0);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUserData([]);

    try {
      const data = await searchUsers(username, location);
      const filteredUsers = data.filter(user => user.public_repos >= minRepos);
      setUserData(filteredUsers);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (login) => {
    try {
      const userDetails = await fetchUserData(login);
      setSelectedUser(userDetails);
      setError(''); 
    } catch (err) {
      setError("Looks like we can't find the user");
      setSelectedUser(null); 
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(Number(e.target.value))}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {userData.length > 0 && userData.map((user) => (
        <div key={user.id}>
          <h2>{user.login}</h2>
          <img src={user.avatar_url} alt={user.login} width="100" />
          <p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault(); 
                handleUserClick(user.login);
              }}
            >
              View Profile
            </a>
          </p>
        </div>
      ))}

      {
      }
      {selectedUser && (
        <div>
          <h3>{selectedUser.name}</h3>
          <p>{selectedUser.bio}</p>
          <p>Public Repos: {selectedUser.public_repos}</p>
          <p>Followers: {selectedUser.followers}</p>
          <p>Following: {selectedUser.following}</p>
        </div>
      )}
    </div>
  );
};

export default Search;
