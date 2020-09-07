import React from 'react';
import './App.css';
import CustomerLogin from './components/CustomerLogin';

function App() {
  const handleOnLogin = () => {

  };
  return (
    <div>
      <CustomerLogin onLogin={handleOnLogin} />
    </div>
  );
}

export default App;
