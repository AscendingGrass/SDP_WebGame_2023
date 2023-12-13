import React, { createContext, useContext, useReducer } from 'react';
const initialState = {
  user: null,
  access_token: null
};

// Define your reducer function
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user, access_token: action.access_token };
    case `LOGOUT_USER`:
      return {...state, user: null, access_token: null};
    default:
      return state;
  }
};

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export { DataProvider, useData };
