import React from 'react';
import './App.css'; // Optional: CSS for global styles
import JobApplicationForm from './components/JobApplicationForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Application Form</h1>
      </header>
      <main className="App-main">
        <JobApplicationForm />
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
