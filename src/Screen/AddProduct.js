import React, { useEffect, useState } from "react";
import "../Styles/AddProduct.css";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";

const API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

function AddProduct() {
  const [addrFind, setAddrFind] = useState(false);
  const [finalAddr, setFinalAddr] = useState();
  const [latLng, setLatLng] = useState({}); //x,y 좌표값 보낼 때 latLng 같이 보내기
  const findAddr = () => {
    setAddrFind(true);
  };

  const getLatLng = async (addr) => {
    console.log("좌표 찾기 주소 : ", addr);
    await axios({
      method: "get",
      url: "https://dapi.kakao.com/v2/local/search/address.json",
      Host: "dapi.kakao.com",
      headers: { Authorization: `KakaoAK ${API_KEY}` },
      params: { query: `${addr}` },
    }).then(function (response) {
      console.log(response.data.documents[0].road_address.x);
      setLatLng(response.data.documents[0].road_address);
    });
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    // console.log(data);
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddrFind(false);
    setFinalAddr(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    getLatLng(fullAddress);
  };
  const contractionHandle = (event) => {
    console.log(event.target.value);
  };
  const buildingHandle = (event) => {
    console.log(event.target.value);
  };
  const houseTypeHandle = (event) => {
    console.log(event.target.value);
  };
  const isParkingHandle = (event) => {
    console.log(event.target.value);
  };

  const postCodeStyle = {
    width: "50%",
    height: "70vh",
  };
  return (
    <div className="addPd">
      {addrFind ? (
        <div className="addPd-addrSearch">
          <span className="addPd-addrSearch">
            <DaumPostcode onComplete={handleComplete} style={postCodeStyle} />
          </span>
        </div>
      ) : (
        <div className="addPd-view">
          <div className="addPd-Name addition">
            <div>제목 : </div>
            <span>{finalAddr}</span>
            <input placeholder="제목"></input>
          </div>
          <div className="addPd-Addr addition">
            <div>주소 : </div>
            <button onClick={findAddr}> 검색 </button>
          </div>
          <div className="addPd-Contraction">
            {/* addPd-Contraction -> rentType*/}
            <span>계약 형태 : </span>
            <ul>
              <li>
                <input
                  type="radio"
                  value="monthly"
                  name="contraction"
                  id="monthly"
                  onChange={contractionHandle}
                />{" "}
                월세
              </li>
              <li>
                <input
                  type="radio"
                  value="charter"
                  name="contraction"
                  id="charter"
                  onChange={contractionHandle}
                />{" "}
                전세
              </li>
              <li>
                <input
                  type="radio"
                  value="trading"
                  name="contraction"
                  id="trading"
                  onChange={contractionHandle}
                />{" "}
                매매
              </li>
            </ul>
          </div>
          <div>시설 tag</div>
          <div className="addPd-building">
            {/* addPd-building ->  buildingType*/}
            <span>건물 종류 : </span>
            <ul>
              <li>
                <input
                  type="radio"
                  value="apartment"
                  name="building"
                  id="apartment"
                  onChange={buildingHandle}
                />
                아파트
              </li>
              <li>
                <input
                  type="radio"
                  value="vila"
                  name="building"
                  id="vila"
                  onChange={buildingHandle}
                />
                빌라
              </li>
              <li>
                <input
                  type="radio"
                  value="house"
                  name="building"
                  id="house"
                  onChange={buildingHandle}
                />
                단독주택
              </li>
            </ul>
          </div>
          <div className="addPd-houseType">
            {/* roomType*/}
            <span>방 구조 : </span>
            <ul>
              <li>
                <input
                  type="radio"
                  value="oneRoom"
                  name="building"
                  id="oneRoom"
                  onChange={houseTypeHandle}
                />{" "}
                원룸
              </li>
              <li>
                <input
                  type="radio"
                  value="twoRoom"
                  name="building"
                  id="twoRoom"
                  onChange={houseTypeHandle}
                />{" "}
                투룸
              </li>
              <li>
                <input
                  type="radio"
                  value="twoBay"
                  name="building"
                  id="twoBay"
                  onChange={houseTypeHandle}
                />{" "}
                투베이
              </li>
              <li>
                <input
                  type="radio"
                  value="threeRoom"
                  name="building"
                  id="threeRoom"
                  onChange={houseTypeHandle}
                />{" "}
                쓰리룸
              </li>
            </ul>
          </div>
          <div className="addpd-price">
            <span> 금액 : </span>
            <input placeholder="보증금"></input>
            <input placeholder="월세"></input>
            <input placeholder="관리비"></input>
          </div>
          <div>주변시설 tag</div>
          <div className="addPd-isparking">
            <span>주차 가능 여부 : </span>
            <ul>
              <li>
                <input
                  type="radio"
                  value="true"
                  name="building"
                  id="true"
                  onChange={isParkingHandle}
                />{" "}
                가능
              </li>
              <li>
                <input
                  type="radio"
                  value="false"
                  name="building"
                  id="false"
                  onChange={isParkingHandle}
                />{" "}
                불가능
              </li>
              <li>
                <input placeholder="세대당 주차 수"></input>
              </li>
            </ul>
          </div>
          <div>매물등록</div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
