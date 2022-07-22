/* global kakao */
import React, { useEffect, useRef, useState } from "react";
import "../Styles/Map.css";
import "../Styles/MMap.css";
import {
  Map,
  MarkerClusterer,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { useQuery } from "@apollo/client";
import MLandMap from "../MobileScreen/MLandMap";
import { FIND_IN_MAP } from "../GraphQL/gqlList";
const MIN_LEVEL = "10";

function LandMap() {
  const mapRef = useRef();
  const [info, setInfo] = useState();
  const [mapLoading, setMapLoading] = useState(false);
  const [initial, setInitial] = useState(true);
  const [housings, setHousings] = useState([]);
  const [initPoint, setInitPoint] = useState({
    lat: 0,
    lng: 0,
  });
  const { houseData, houseLoading, houseError } = useQuery(FIND_IN_MAP, {
    variables: initial
      ? {
          swLat: 0,
          swLong: 0,
          neLat: 0,
          neLong: 0,
        }
      : {
          swLat: info.swLatLng.lat,
          swLong: info.swLatLng.lng,
          neLat: info.neLatLng.lat,
          neLong: info.neLatLng.lng,
        },
  });

  useEffect(() => {
    initMapCenter();

    //console.log(houseData);
    //getMapInfo();
  }, []);
  useEffect(() => {}, [mapLoading]);
  const initMapCenter = () => {
    // 현재 위치값 받아오기.
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude, // 위도
          lng = position.coords.longitude; // 경도

        setInfo({
          center: {
            lat: parseInt(lat),
            lng: parseInt(lng),
          },
          level: MIN_LEVEL,
          swLatLng: {
            lat: parseInt(lat) - 0.06,
            lng: parseInt(lng) - 0.086,
          },
          neLatLng: {
            lat: parseInt(lat) + 0.06,
            lng: parseInt(lng) + 0.086,
          },
        });
        setInitPoint({ lat: lat, lng: lng });

        setMapLoading(true);
        setInitial(false);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      // lat: 36.59933075229118,
      // lng: 127.52583998406159,
      setInitPoint({ lat: 36.59933075229118, lng: 127.52583998406159 });
    }
    return true;
  };
  const getHousingGql = () => {
    if (houseData) {
      console.log("매물 : ", houseData.readMapHousing.housings);
      setHousings(houseData.readMapHousing.housings);
    }
  };
  const getMapInfo = () => {
    const map = mapRef.current;
    setInfo({
      center: {
        lat: map.getCenter().getLat(),
        lng: map.getCenter().getLng(),
      },
      level: map.getLevel(),
      swLatLng: {
        lat: map.getBounds().getSouthWest().getLat(),
        lng: map.getBounds().getSouthWest().getLng(),
      },
      neLatLng: {
        lat: map.getBounds().getNorthEast().getLat(),
        lng: map.getBounds().getNorthEast().getLng(),
      },
    });
    setMapLoading(true);

    console.log("drag finish", info);
    getHousingGql();
  };
  return (
    <>
      <MLandMap initPoint={initPoint} />
      <div className="MapView">
        {
          <div className="Map-body">
            <div>
              <span>hello kakaoMap</span>
              <ul>
                {housings.map((house) => (
                  <li key={house.idx}>
                    <span>
                      {house.title}
                      {house.deposit}
                      {house.idx}
                    </span>
                  </li>
                ))}
              </ul>
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
                lat: initPoint.lat,
                lng: initPoint.lng,
              }}
              style={{
                // 지도의 크기
                width: "70%",
                height: "90vh",
              }}
              level={7} // 지도의 확대 레벨
              ref={mapRef}
              onDragEnd={getMapInfo}
              onZoomChanged={getMapInfo}
              onMouseMove={() => {
                console.log("loading...");
                setMapLoading(false);
              }}
            >
              <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
              <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
              <MarkerClusterer
                averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
                minLevel={10} // 클러스터 할 최소 지도 레벨
              >
                {housings.map((house) => (
                  <MapMarker // 마커를 생성합니다
                    key={house.idx}
                    position={{
                      // 마커가 표시될 위치입니다
                      lat: house.lat,
                      lng: house.long,
                    }}
                  />
                ))}

                {/* {mapList.positions.map((pos, idx) => (
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
                ))} */}
              </MarkerClusterer>
            </Map>
          </div>
        }
      </div>
    </>
  );
}

export default LandMap;
