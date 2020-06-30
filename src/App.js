import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repos, setRepos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    async function fetchRepos() {
      try {
        const { data } = await api.get('/repositories');

        setRepos(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchRepos();
  }, []);

  async function handleAddRepository() {
    try {
      const repo = { title };
      const { data } = await api.post('/repositories', repo);

      setRepos((prevRepos) => [...prevRepos, data]);
      setTitle('');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      const updatedRepos = repos.filter((repo) => repo.id !== id);
      setRepos(updatedRepos);
    } catch (error) {
      console.log(error);
    }
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
        <button className="btn-add" onClick={handleAddRepository}>
          Adicionar
        </button>
      </div>

      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button
              className="btn-remove"
              onClick={() => handleRemoveRepository(repo.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;