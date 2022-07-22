/* global kakao */
import React, { useEffect, useRef, useState } from "react";
import "../Styles/Map.css";
import "../Styles/MMap.css";
import { FIND_IN_MAP } from "../GraphQL/gqlList";
import { useQuery } from "@apollo/client";
import {
  Map,
  MarkerClusterer,
  MapMarker,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import { HouseModal } from "../Components/HouseModal";
import { useNavigate } from "react-router-dom";
const MIN_LEVEL = "10";

function MLandMap(prop) {
  const mapRef = useRef();
  const [info, setInfo] = useState();
  const [mapLoading, setMapLoading] = useState(false);
  const [initial, setInitial] = useState(true);
  const [housings, setHousings] = useState([]);
  const [center, setCenter] = useState({
    // 지도의 초기 위치
    center: { lat: 33.452613, lng: 126.570888 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });

  const navigate = useNavigate();

  const [initPoint, setInitPoint] = useState({
    lat: 0,
    lng: 0,
  });
  const [swipeableVisibility, setSwipeableVisibility] = useState(false);
  useEffect(() => {
    console.log("prop", prop);

    initMapCenter();
  }, []);
  useEffect(() => {
    console.log("Mapdatadata : ", data);
  }, [info]);

  const { data, loading, error } = useQuery(FIND_IN_MAP, {
    variables: initial
      ? {
          swLat: 0,
          swLong: 0,
          neLat: 0,
          neLong: 0,
        }
      : {
          swLat: parseFloat(info.swLatLng.lat),
          swLong: parseFloat(info.swLatLng.lng),
          neLat: parseFloat(info.neLatLng.lat),
          neLong: parseFloat(info.neLatLng.lng),
        },
  });

  const toggleSwipeable = () => {
    navigate(-1);
  };

  const getMapInfo = () => {
    console.log("gql :", loading, error);
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
  // const mapList = {
  //   positions: [
  //     {
  //       lat: 36.59933075229118,
  //       lng: 127.52583998406159,
  //     },
  //     {
  //       lat: 36.59835668706214,
  //       lng: 127.52536526611102,
  //     },
  //   ],
  // };

  const getHousingGql = async () => {
    if (await data) {
      //console.log("매물 : ", data.readMapHousing.data);
      console.log("매물 : ", data.readMapHousingForMap.housings);
      setHousings(data.readMapHousingForMap.housings);
    }
  };

  const initMapCenter = async () => {
    // 현재 위치값 받아오기.
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation !== null) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      await navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude, // 위도
          lng = position.coords.longitude; // 경도
        getHousingGql();
        setInfo({
          center: {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
          },
          level: MIN_LEVEL,
          swLatLng: {
            lat: parseFloat(lat) - 0.006,
            lng: parseFloat(lng) - 0.0056,
          },
          neLatLng: {
            lat: parseFloat(lat) + 0.006,
            lng: parseFloat(lng) + 0.0056,
          },
        });
        setInitPoint({ lat: lat, lng: lng });
        console.log("좌표 가져오기 완료");
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
  return (
    <div className="MobileMapView">
      <div className="mMap-body">
        <div className="mMap-Header">
          <div className="Search">
            <button className="toggler" onClick={toggleSwipeable}>
              검색
            </button>
            <input type={"text"} placeholder="지역 검색"></input>
            <button className="filter" onClick={toggleSwipeable}>
              필터
            </button>
          </div>
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
            height: "88vh",
          }}
          level={5} // 지도의 확대 레벨
          ref={mapRef}
          onDragEnd={getMapInfo}
          onZoomChanged={getMapInfo}
          onMouseMove={() => {
            console.log("loading...");
            setMapLoading(false);
          }}
        >
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={1} // 클러스터 할 최소 지도 레벨
          >
            {housings.map((pos, idx) => (
              <MapMarker // 마커를 생성합니다
                key={idx}
                position={{
                  // 마커가 표시될 위치입니다
                  lat: pos.lat,
                  lng: pos.long,
                }}
              />
            ))}
            {/* {console.log("data : ", data)} */}

            {housings.map((pos, idx) => (
              <CustomOverlayMap
                key={idx}
                position={{
                  lat: pos.lat,
                  lng: pos.long,
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

      {info && <HouseModal info={info} />}
      {/* <MBottomHouse
        visibility={swipeableVisibility}
        visibilityToggler={setSwipeableVisibility}
        location={info}
      /> */}
    </div>
  );
}

export default MLandMap;
