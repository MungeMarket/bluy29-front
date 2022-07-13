import React, { useEffect, useState } from "react";
import "../Styles/AddProduct.css";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";
import { ADD_PRODUCT, VERIFY_TEST } from "../GraphQL/gqlList";

const API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

//토큰 지우기
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTc3ODY2MjAsImlkeCI6MSwiaWF0IjoxNjU3NzAwMjIwfQ.pLyTuFqqiF3FM6zFdHOE2-8xw9oeBNNytbGy_y5fUqE";
//x-jwt,
const AUTHORIZATION = "x-jwt";

function AddProduct() {
  const [addrFind, setAddrFind] = useState(false);
  const [finalAddr, setFinalAddr] = useState();
  const [latLng, setLatLng] = useState({}); //x,y 좌표값 보낼 때 latLng 같이 보내기
  const [imgList, setImgList] = useState([]); // 매물 사진
  const findAddr = () => {
    setAddrFind(true);
  };
  useEffect(() => {
    verify1();
  }, []);

  const [verifyTest, { data1, loading1, error1 }] = useMutation(VERIFY_TEST, {
    context: {
      headers: {
        "x-jwt": TOKEN,
        //token
      },
    },
  });

  const [createHousingMutation, { data, loading, error }] = useMutation(
    ADD_PRODUCT,
    {
      context: {
        headers: {
          "x-jwt": TOKEN,
          //token
        },
      },
    }
  );

  const verify1 = () => {
    verifyTest();
    console.log(data1);
  };

  const inputProduct = () => {
    createHousingMutation({
      variables: {
        rentType: {
          name: "월세",
        },
        deposit: 5000000,
        monthly: 300000,
        manageFee: 30000,
        manageInclude: "인터넷, 수도사용료, 기타",
        manageNotInclude: "전기료, 가스사용료",
        parkingArea: 0,
        shortTerm: false,
        images: imgList,
        housingName: "와르르멘션",
        roomType: {
          name: "원룸",
        },
        totalFloor: 5,
        floor: "3",
        areaSize: 25,
        realSize: 23,
        roomCount: 1,
        bathRoomCount: 1,
        direction: "NE",
        heating: "Individual",
        builtIn: true,
        builtInDetail: "빌트인 주방",
        elevator: false,
        veranda: true,
        availableMoveIn: "2022-07-11",
        mainUse: "공동주택",
        approvalDate: "2000-07-11",
        options: [
          {
            name: "인터넷",
          },
          {
            name: "TV",
          },
        ],
        title: "첫번째 매물",
        detailContent: "첫번째 입니다.",
        addr: "충청북도 청주시 상당구 용정동",
        addrDetail: "1052번지",
        lat: 36.6288437805879,
        long: 127.52793511481414,
        isView: true,
        status: true,
      },
    });

    console.log("data : ", data);
    console.log("error : ", error);
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
  const onImgChange = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    console.log(formData);
  };

  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...imgList];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }
    console.log(imageUrlLists);
    setImgList(imageUrlLists);
    //setShowImages(imageUrlLists);
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
          <div>
            <button onClick={inputProduct}>제출</button>
          </div>
          <div className="addPd-Name addition">
            <div>제목 : </div>
            <span>{finalAddr}</span>
            <input placeholder="제목"></input>
          </div>
          <div className="addPd-Addr addition">
            <div>주소 : </div>
            <button onClick={findAddr}> 검색 </button>
          </div>

          <label htmlFor="input-file" onChange={handleAddImages}>
            <input
              type="file"
              className="imgInput"
              id="roomImg"
              accept="image/*"
              name="file"
              onChange={onImgChange}
              multiple
            ></input>
            <span>사진추가</span>
          </label>

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
