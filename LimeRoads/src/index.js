import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './App.css'
import { Provider } from 'react-redux';
import store from './Redux/store';
import {AuthProvider} from "./Context/AuthContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <Provider store={store}>
    
    <App />
    
  </Provider>
  </AuthProvider>

);


