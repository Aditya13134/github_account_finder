// UserSearch.js
import './UserSearch.css'
import React, { useState } from 'react';
import axios from 'axios';

// Profile component
const UserProfile = ({ userData }) => {
  return (
    <div>
      <h2>{userData.login}</h2>
      <img src={userData.avatar_url} alt="User Avatar" />
      <p>Name: {userData.name}</p>
      <p>Location: {userData.location}</p>
    </div>
  );
};

// Repositories component
const UserRepositories = ({ repos }) => {
  return (
    <div>
      <h3>Repositories</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const UserSearch = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
      const reposResponse = await axios.get(response.data.repos_url);
      setRepos(reposResponse.data);
    } catch (error) {
      console.error(error);
      // Handle error state or display a message to the user
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {userData && <UserProfile userData={userData} />}

      {repos.length > 0 && <UserRepositories repos={repos} />}
    </div>
  );
};

export default UserSearch;
