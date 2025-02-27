import React from 'react';
import AllRoutes from './Routes/AllRoutes';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return(
    <Router>
    <AllRoutes/>
    </Router>
  )
}

export default App;
