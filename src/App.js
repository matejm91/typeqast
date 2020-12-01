import './App.css';
import React from 'react';
import AppHeader from "./components/app/layout/AppHeader";
import 'antd/dist/antd.css';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <AppHeader />
      <div className='AppLayout'>
        {props.children}
      </div>
    </div>
  );
}

export default App;
