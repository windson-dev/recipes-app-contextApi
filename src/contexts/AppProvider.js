import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextApp = {
    email,
    password,
    setEmail,
    setPassword,
  };

  return (
    <AppContext.Provider value={ contextApp }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
