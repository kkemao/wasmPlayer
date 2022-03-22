import React, { useEffect, useRef, useState } from "react";

function WasmPlayer(props) {
  const playDom = useRef();
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    let player = getPlayer();
    player && setPlayer(player);
    window.download = getMp4Url;
    return () => {
      player && player.stop();
    };
  }, []);

  useEffect(() => {
    if (!player || !props.url) return;
    // player && player.stop();
    props.url && player.play(props.url, 1);
    playDom.current.ondblclick = () => {
      if (player.fullScreenFlag) {
        player.canvasExitFullscreen();
        player.fullScreenFlag = false;
      } else {
        player.canvasFullscreen();
        player.fullScreenFlag = true;
      }
    };
    return () => {
      player && player.stop();
    };
  }, [player, props.url]);

  const callbackFun = (e) => {
    console.log(e);
  };

  const getPlayer = () => {
    if (!props.url) return null;
    try {
      // 新版本播放器只支持dom id为字符串
      // @ts-ignore
      let player = new window.WasmPlayer(
        null,
        "playDom",
        (status) => {
          // status   stop play closeAudio object
          if (status && status.code && status.code !== 200) {
            console.log("zkf-status", status);
            message.error("视频流拉取异常，请重试");
            destroy();
          }
        },
        {
          // @ts-ignore
          cbUserPtr: window.metaInfo,
          decodeType: "auto",
          enableAudio: false,
          showTimeLabel: false,
          openAudio: 0,
          BigPlay: true,
          Height: true,
          downloadUrl: !!alarmId, // 通过事件ID来判断是否需要显示下载按钮  兼容其他单独查询实时视频流模块
        }
      );
      return player;
    } catch (error) {
      console.error(error);
    }
  };

  const getMp4Url = () => {
    const url = ""; //一般通过后台接口获取mp4地址，然后下载到本地
    const resp = await fetch(url);
    const blob = await resp.blob();
    const blobUrl = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${alarmId || new Date().getTime()}.mp4`;
    a.click();
    a.remove();
  };

  return (
    <div
      style={{
        minWidth: "200px",
        minHeight: "160px",
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
        ref={playDom}
        id={"playDom" || playUrl}
      >
        {!props.url && (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              background: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#c1c1c1",
              fontSize: "14px",
            }}
          >
            <svg width="60px" height="57px" viewBox="0 0 60 57" version="1.1">
              <title>无地址</title>
              <desc>Created with Sketch.</desc>
              <g
                id="优化界面"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="人脸解析"
                  transform="translate(-650.000000, -269.000000)"
                  fill-rule="nonzero"
                >
                  <g id="无地址" transform="translate(650.000000, 269.000000)">
                    <g id="编组" transform="translate(0.000000, 11.876250)">
                      <ellipse
                        id="椭圆形"
                        fill="#092247"
                        cx="25.423875"
                        cy="40.08375"
                        rx="25.423875"
                        ry="4.7505"
                      ></ellipse>
                      <path
                        d="M45.763125,26.12775 L36.790875,15.085875 C36.360375,14.566125 35.731125,14.2515 35.0685,14.2515 L15.7785,14.2515 C15.11625,14.2515 14.487,14.566125 14.0565,15.085875 L5.085,26.12775 L5.085,31.896375 L45.763125,31.896375 L45.763125,26.12775 L45.763125,26.12775 Z"
                        id="路径"
                        fill="#092247"
                      ></path>
                      <path
                        d="M43.161375,32.33025 L35.32125,22.91325 C34.945875,22.460625 34.381125,22.213125 33.80325,22.213125 L16.9815,22.213125 C16.404,22.213125 15.838875,22.460625 15.4635,22.91325 L7.623375,32.33025 L7.623375,37.50225 L43.161375,37.50225 L43.161375,32.33025 Z"
                        id="路径"
                        fill="#000000"
                      ></path>
                      <path
                        d="M12.68625,0 L38.161125,0 C38.9895521,0 39.661125,0.671572875 39.661125,1.5 L39.661125,36.504 C39.661125,37.3324271 38.9895521,38.004 38.161125,38.004 L12.68625,38.004 C11.8578229,38.004 11.18625,37.3324271 11.18625,36.504 L11.18625,1.5 C11.18625,0.671572875 11.8578229,0 12.68625,0 Z"
                        id="路径"
                        fill="#37527B"
                      ></path>
                      <path
                        d="M16.00425,3.732375 L34.843125,3.732375 C35.2573386,3.732375 35.593125,4.06816144 35.593125,4.482375 L35.593125,13.84125 C35.593125,14.2554636 35.2573386,14.59125 34.843125,14.59125 L16.00425,14.59125 C15.5900364,14.59125 15.25425,14.2554636 15.25425,13.84125 L15.25425,4.482375 C15.25425,4.06816144 15.5900364,3.732375 16.00425,3.732375 Z M16.1025,18.662625 L34.744875,18.662625 C35.2133505,18.662625 35.593125,19.0423995 35.593125,19.510875 C35.593125,19.9793505 35.2133505,20.359125 34.744875,20.359125 L16.1025,20.359125 C15.6340245,20.359125 15.25425,19.9793505 15.25425,19.510875 C15.25425,19.0423995 15.6340245,18.662625 16.1025,18.662625 Z M16.1025,23.07375 L34.744875,23.07375 C35.2134541,23.07375 35.5933125,23.4536084 35.5933125,23.9221875 C35.5933125,24.3907666 35.2134541,24.770625 34.744875,24.770625 L16.1025,24.770625 C15.6339209,24.770625 15.2540625,24.3907666 15.2540625,23.9221875 C15.2540625,23.4536084 15.6339209,23.07375 16.1025,23.07375 L16.1025,23.07375 Z M45.679875,39.387 C45.38925,40.538625 44.3685,41.397 43.15425,41.397 L7.693125,41.397 C6.478875,41.397 5.458125,40.53825 5.167875,39.387 C5.11251705,39.1675454 5.08462487,38.942079 5.08462487,38.71575 L5.08462487,26.128125 L14.953875,26.128125 C16.044,26.128125 16.922625,27.046125 16.922625,28.160625 L16.922625,28.175625 C16.922625,29.28975 17.811375,30.189375 18.9015,30.189375 L31.945875,30.189375 C33.036,30.189375 33.92475,29.2815 33.92475,28.167 L33.92475,28.1625 C33.92475,27.048 34.803375,26.12775 35.8935,26.12775 L45.76275,26.12775 L45.76275,38.716125 C45.76275,38.9475 45.733875,39.172125 45.679875,39.387 Z"
                        id="形状"
                        fill="#1A355C"
                      ></path>
                    </g>
                    <path
                      d="M46.920375,12.4845 L44.359125,13.47825 C44.2248547,13.5304637 44.0725429,13.5011412 43.9672551,13.4028087 C43.8619674,13.3044761 43.8223201,13.1545202 43.86525,13.017 L44.591625,10.689375 C43.62075,9.585375 43.05075,8.239125 43.05075,6.786375 C43.05075,3.03825 46.845,0 51.52575,0 C56.205375,0 60,3.03825 60,6.786375 C60,10.5345 56.20575,13.57275 51.525375,13.57275 C49.827375,13.57275 48.246375,13.173 46.920375,12.4845 Z"
                      id="路径"
                      fill="#1A355C"
                    ></path>
                    <g
                      id="编组"
                      transform="translate(47.118750, 5.768625)"
                      fill="#37527B"
                    >
                      <ellipse
                        id="椭圆形"
                        cx="7.74525"
                        cy="1.187625"
                        rx="1.068375"
                        ry="1.055625"
                      ></ellipse>
                      <path
                        d="M2.13675,2.11125 L0,2.11125 L1.08675,0.264 L2.13675,2.11125 Z M3.472125,0.264 L5.3415,0.264 L5.3415,2.11125 L3.472125,2.11125 L3.472125,0.264 Z"
                        id="形状"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <span style={{ marginTop: 5 }}>无视频流!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default WasmPlayer;
