import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import WasmPlayer from './component/wasmPlayer/index.js';
import flvjs from 'flv.js';
import { Button, Empty } from 'antd';

function App() {
  const [num, setNum] = useState(2);

  const control = (type) => {
    if (type == 'add') {
      setNum(num + 1)
    } else if (type == 'reduce') {
      setNum(num > 0 ? num - 1 : num)
    }
  }
  return (
    <div className="App">
      <div style={{
        display: 'flex',
        margin: 20
      }}>
        <Button onClick={() => control('add')}>加一路</Button>
        <Button onClick={() => control('reduce')}>减一路</Button>
      </div>
      {
        num == 0 ? <Empty description={<span>无视频流!</span>} /> : new Array(num).fill('http://192.168.13.92:7080/live/h265.flv' + '?v=' + Math.random()).map((url, index) => <div className="box" key={index}>
          <WasmPlayer url={url} />
        </div>)
      }
    </div>
  );
}

export default App;
