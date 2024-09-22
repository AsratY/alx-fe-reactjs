import { useState } from 'react';
import './App.css';
import Home from './components/Home'; // Import the Home component

function App() {
  return (
    <>
      <div>
        <h1>GitHub User Search</h1>
      </div>
      <Home /> {/* Render the Home component here */}
    </>
  );
}

export default App;
