import React, { useEffect } from 'react';
import './index.css';

function WasmPlayer(props) {
    useEffect(() => {
        var Player265 = new window.WasmPlayer(
            props.url || "http://192.168.13.92:7080/live/h265.flv",
            props.id || "265Player",
            callbackFun,
            {
                cbUserPtr: this,
                decodeType: "auto",
                openAudio: 1,
                BigPlay: true,
                Height: true,
            }
        );
        Player265.play(props.url || "http://192.168.13.92:7080/live/h265.flv", 1);
    }, []);
    const callbackFun = e => {
        console.log(e);
    };

    const test = () => {
        //   document.onclick = function () {
        //     // Player265.canvasFullscreen();
        //     // Player265.canvasExitFullscreen();
        //     // Player265.stop();
        //     // Player265.play("http://192.168.13.95:5056/live/43.flv", 1);
        //   };
    }

    return <div className="container">
        <div id={props.id}></div>
    </div>;
}

export default WasmPlayer;
