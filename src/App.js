import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const matrix = document.getElementById("matrix")
    const context = matrix.getContext("2d")
    matrix.height = window.innerHeight
    matrix.width = window.innerWidth
    let drop = []
    const font_size = 12
    const columns = matrix.width / font_size
    for (let i = 0; i < columns; i++) {
      drop[i] = 1
    }

    function drawMatrix() {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)'
      context.fillRect(0, 0, matrix.width, matrix.height)
      context.fillStyle = 'green'
      context.font = font_size + "px"
      for (let i = 0; i < columns; i++) {
        console.log(Math.floor(Math.random() * 2), i * font_size, drop[i] * font_size);
        context.fillText(Math.floor(Math.random() * 2), i * font_size, drop[i] * font_size)
        if (drop[i] * font_size > (matrix.height * 2 / 3) && Math.random() > 0.85)
          drop[i] = 0
        drop[i]++
      }
      // window.requestAnimationFrame(drawMatrix);
    }

    setInterval(drawMatrix, 50)
    // window.requestAnimationFrame(drawMatrix);
  }, []);

  return (
    <div className="App">
      <canvas id="matrix" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></canvas>
      <div style={{
        display: 'flex',
        margin: 20
      }}>
        <Button onClick={() => control('add')}>加一路</Button>
        <Button onClick={() => control('reduce')}>减一路</Button>
      </div>
      {
        num == 0 ? <Empty description={<span>无视频流!</span>} /> : new Array(num).fill('http://192.168.13.92:7080/live/h265.flv').map((url, index) => <div className="box" key={index}>
          <WasmPlayer url={url} />
        </div>)
      }
    </div>
  );
}

export default App;
