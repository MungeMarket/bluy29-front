/* global kakao */
import React, { useEffect, useState } from "react";
import "../Styles/Map.css";
import "../Styles/MMap.css";
import {
  Map,
  MarkerClusterer,
  MapMarker,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import MBottomHouse from "./MBottomHouse";

function MLandMap(prop) {
  const [swipeableVisibility, setSwipeableVisibility] = useState(false);

  const toggleSwipeable = () => {
    console.log("Toggle visibility");
    setSwipeableVisibility(!swipeableVisibility);
  };
  const mapList = {
    positions: [
      {
        lat: 36.59933075229118,
        lng: 127.52583998406159,
      },
      {
        lat: 36.59835668706214,
        lng: 127.52536526611102,
      },
    ],
  };
  useEffect(() => {
    console.log("prop", prop);
  }, []);

  return (
    <div className="MobileMapView">
      <div className="mMap-body">
        <div className="mMap-Header">
          <span>hello kakaoMap</span>
          Swipeable bottom sheet
          <button className="toggler" onClick={toggleSwipeable}>
            toggleSwipeable
          </button>
        </div>
        <div className="cneterBtn">
          <button>click</button>
        </div>
        {/* <div
          className="MapContainer"
          id="map"
          style={{
            // 지도의 크기
            width: window.screen.width * 0.8,
            height: window.screen.height - 80,
          }} 
        ></div> */}

        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: prop.initPoint.lat,
            lng: prop.initPoint.lng,
          }}
          style={{
            // 지도의 크기
            width: "100vw",
            height: "90vh",
          }}
          level={7} // 지도의 확대 레벨
        >
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={10} // 클러스터 할 최소 지도 레벨
          >
            {/* <MapMarker // 마커를 생성합니다
              position={{
                // 마커가 표시될 위치입니다
                lat: 36.5993,
                lng: 127.5258,
              }}
            /> */}
            {mapList.positions.map((pos, idx) => (
              <CustomOverlayMap
                key={`${pos.lat}-${pos.lng}`}
                position={{
                  lat: pos.lat,
                  lng: pos.lng,
                }}
              >
                <div
                  style={{
                    color: "black",
                    textAlign: "center",
                    background: "white",
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                  }}
                >
                  {idx}
                </div>
              </CustomOverlayMap>
            ))}
          </MarkerClusterer>
        </Map>
      </div>
      <MBottomHouse
        visibility={swipeableVisibility}
        visibilityToggler={setSwipeableVisibility}
      />
    </div>
  );
}

export default MLandMap;
