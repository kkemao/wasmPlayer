import React from 'react';
import logo from './logo.svg';
import './App.css';
import WasmPlayer from './component/wasmPlayer/index.js';

function App() {
  return (
    <div className="App">
      <WasmPlayer id={'267Player'} url={'http://192.168.13.92:7080/live/h265.flv'} />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
