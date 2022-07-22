import React, { useEffect, useState } from "react";
import "../Styles/AddProduct.css";
import "../Styles/MAddProduct.css";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";
import { ADD_PRODUCT, VERIFY_TEST } from "../GraphQL/gqlList";
import MAddProduct from "../MobileScreen/MAddProduct";

const API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
//토큰 지우기
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTg1NjE1MDYsImlkeCI6MiwiaWF0IjoxNjU4NDc1MTA2fQ.sTItYhuN33a1bYvmWMNyYo3GTfgVsjQ7UD5okmhsaOM";
//x-jwt,
const AUTHORIZATION = "x-jwt";

function AddProduct() {
  const [addrFind, setAddrFind] = useState(false);
  const [finalAddr, setFinalAddr] = useState();
  const [latLng, setLatLng] = useState({}); //x,y 좌표값 보낼 때 latLng 같이 보내기
  const [imgList, setImgList] = useState([]); // 매물 사진
  const [picture, setPicture] = useState([]); //test
  const [flag, setFlag] = useState(null);
  const [totalInfo, setTotalInfo] = useState({});
  const [includeManage, setIncludeManage] = useState([]);
  const [notIncludeManage, setNotIncludeManage] = useState([]);
  const [rentTypeArry, setRentTypeArry] = useState([]);
  const [btnToggle, setBtnToggle] = useState([
    { toggle: true },
    { toggle: true },
    { toggle: true },
    { toggle: true },
    { toggle: true },
    { toggle: true },
    { toggle: true },
    { toggle: true },
  ]);
  const [btnUnToggle, setBtnUnToggle] = useState([
    { toggle: true },
    { toggle: true },
    { toggle: true },
    { toggle: true },
    { toggle: true },
    { toggle: true },
    { toggle: true },
    { toggle: true },
  ]);

  const formData = new FormData();
  const findAddr = () => {
    setAddrFind(true);
  };
  useEffect(() => {
    //verify1();
    console.log("includeManage : ", includeManage);
    console.log("notIncludeManage : ", notIncludeManage);
    console.log("totalInfo : ", totalInfo);
  }, [includeManage, notIncludeManage, totalInfo, flag]);

  const [createHousingMutation, { data, loading, error }] = useMutation(
    ADD_PRODUCT,
    {
      context: {
        headers: {
          "x-jwt": TOKEN,
          //token
        },
      },
    },
    { errorPolicy: "all" }
  );
  const inputProduct = async () => {
    // console.log("start : ", latLng);
    console.log("totalInfo : ", totalInfo);
    console.log("rentType : ", rentTypeArry[0]);
    // console.log(includeManage, notIncludeManage);
    // console.log("end : ", imgList);
    console.log({
      rentType: rentTypeArry[0],
      deposit: parseFloat(totalInfo.deposit),
      monthly: parseFloat(totalInfo.monthly),
      price: parseFloat(totalInfo.price),
      manageFee: parseFloat(totalInfo.manageFee),
      manageInclude: includeManage,
      manageNotInclude: notIncludeManage,
      parkingArea: parseFloat(0),
      shortTerm: Boolean("false"),
      images: imgList,
      housingName: totalInfo.housingName,
      roomType: {
        name: "원룸",
      },
      totalFloor: parseFloat(totalInfo.totalFloor),
      floor: totalInfo.floor,
      areaSize: parseFloat(totalInfo.areaSize),
      realSize: parseFloat(totalInfo.realSize),
      roomCount: parseFloat(totalInfo.roomCount),
      bathRoomCount: parseFloat(totalInfo.bathRoomCount),
      direction: totalInfo.direction,
      heating: totalInfo.heating,
      builtIn: Boolean(totalInfo.builtIn),
      builtInDetail: totalInfo.builtInDetail,
      elevator: Boolean(totalInfo.elevator),
      veranda: Boolean(totalInfo.veranda),
      availableMoveIn: totalInfo.availableMoveIn,
      mainUse: totalInfo.mainUse,
      approvalDate: totalInfo.approvalDate,
      options: [
        {
          name: "인터넷",
        },
        {
          name: "TV",
        },
      ],
      security: [
        {
          name: "방범창",
        },
        {
          name: "비디오폰",
        },
      ],
      title: totalInfo.title,
      detailContent: totalInfo.detailContent,
      addr: latLng.address_name,
      addrDetail: totalInfo.addrDetail,
      lat: parseFloat(latLng.y),
      long: parseFloat(latLng.x),
    });

    await createHousingMutation({
      variables: {
        rentType: rentTypeArry[0],

        deposit: parseInt(totalInfo.deposit),
        monthly: parseFloat(totalInfo.monthly),
        price: parseFloat(totalInfo.price),
        manageFee: parseFloat(totalInfo.manageFee),
        manageInclude: includeManage,
        manageNotInclude: notIncludeManage,
        parkingArea: parseFloat(totalInfo.parkingArea),
        shortTerm: Boolean("false"),

        images: imgList,
        housingName: totalInfo.housingName,
        roomType: {
          name: "원룸",
        },

        totalFloor: parseFloat(totalInfo.totalFloor),
        floor: totalInfo.floor,
        areaSize: parseFloat(totalInfo.totalFloor),
        realSize: parseFloat(totalInfo.totalFloor),
        roomCount: parseFloat(totalInfo.roomCount),
        bathRoomCount: parseFloat(totalInfo.bathRoomCount),
        direction: totalInfo.direction,
        heating: totalInfo.heating,
        builtIn: Boolean(totalInfo.builtIn),
        builtInDetail: totalInfo.builtInDetail,
        elevator: Boolean(totalInfo.elevator),
        veranda: Boolean(totalInfo.veranda),
        availableMoveIn: totalInfo.availableMoveIn,
        mainUse: totalInfo.mainUse,
        approvalDate: totalInfo.approvalDate,
        options: [
          {
            name: "인터넷",
          },
          {
            name: "TV",
          },
        ],
        security: [
          {
            name: "방범창",
          },
          {
            name: "비디오폰",
          },
        ],
        title: totalInfo.title,
        detailContent: totalInfo.detailContent,
        addr: latLng.address_name,
        addrDetail: totalInfo.addrDetail,
        lat: parseFloat(latLng.y),
        long: parseFloat(latLng.x),
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
    valueClean("addr", fullAddress);
  };

  const postCodeStyle = {
    width: "50%",
    height: "70vh",
  };
  const onImgChange = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    console.log("formData : ", formData);
  };

  const onChangePicture = (e) => {
    let i;

    console.log("picture: ", e.target.files);
    setPicture(e.target.files);

    const uploadFile = e.target.files[0];
    console.log("uploadFile : ", uploadFile);
    for (i = 0; i < e.target.files.length; i++) {
      //formData.append("file", e.target.files[i]);
      formData.append(`file`, e.target.files[i]);
      console.log(i, ":", e.target.files[i]);
    }
    console.log("input : ", formData.getAll("file"));
    setImgList(formData.getAll("file"));
    axios({
      method: "post",
      url: "https://bluy29.com/api/uploads/housings/",
      headers: {
        "x-jwt": TOKEN,

        "Content-Type": "multipart/form-data",
      },
      data: formData,
    }).then((res) => {
      // then print response status
      console.warn(res.data.images);
      setImgList(res.data.images);
    });
  };

  const totalHandle = (event) => {
    //console.log(event.target.id, " : ", event);
    const idText = event.target.id;
    const valueText = event.target.value;
    //console.log("id, value : ", idText, valueText);
    valueClean(idText, valueText);
  };

  const valueClean = (idText, valueText) => {
    setFlag(!flag);

    if (flag || !flag) {
      setTotalInfo({ ...totalInfo, [idText]: valueText });
    }
  };

  const checkBoxDiv = (event) => {
    console.log("value : ", event.target.className);
    const name = event.target.id;
    if (event.target.className === "manageTag") {
      const value = {
        management: {
          name: event.target.childNodes[0].nodeValue,
        },
      };

      setIncludeManage([...includeManage, value]);

      const toggleArray = btnToggle;
      toggleArray[name] = { toggle: false };
      setBtnToggle(toggleArray);
    } else {
      let manageValue = [];
      setIncludeManage([...includeManage]);
      console.log("includeManage : ", includeManage);
      for (let i = 0; i < includeManage.length; i++) {
        if (
          includeManage[i].management.name !==
          event.target.childNodes[0].nodeValue
        ) {
          manageValue.push(includeManage[i]);
        }
      }

      console.log("after : ", manageValue);
      setIncludeManage(manageValue);
      const toggleArray = btnToggle;
      toggleArray[name] = { toggle: true };
      setBtnToggle(toggleArray);
    }
  };
  const unCheckBoxDiv = (event) => {
    console.log("value : ", event.target.className);
    const name = event.target.id;
    if (event.target.className === "manageTag") {
      const value = {
        management: {
          name: event.target.childNodes[0].nodeValue,
        },
      };

      setNotIncludeManage([...notIncludeManage, value]);

      const toggleArray = btnUnToggle;
      toggleArray[name] = { toggle: false };
      setBtnUnToggle(toggleArray);
    } else {
      let manageValue = [];
      setNotIncludeManage([...notIncludeManage]);
      console.log("notIncludeManage : ", notIncludeManage);
      for (let i = 0; i < notIncludeManage.length; i++) {
        if (
          notIncludeManage[i].management.name !==
          event.target.childNodes[0].nodeValue
        ) {
          manageValue.push(notIncludeManage[i]);
        }
      }

      console.log("after : ", manageValue);
      setNotIncludeManage(manageValue);
      const toggleArray = btnUnToggle;
      toggleArray[name] = { toggle: true };
      setBtnUnToggle(toggleArray);
    }
  };
  const rentTypeHandle = (event) => {
    const arry = new Array();
    arry.push({
      name: event.target.value,
    });
    setRentTypeArry(arry);
    console.log(rentTypeArry[0]);
  };
  return (
    <>
      <MAddProduct />
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

              <input
                placeholder="제목"
                onChange={totalHandle}
                id={"title"}
                value={totalInfo.title}
              ></input>
            </div>
            <div className="addPd-Name addition">
              <div>상세 설명 : </div>

              <input
                placeholder="상세 설명"
                onChange={totalHandle}
                id={"detailContent"}
                value={totalInfo.detailContent}
              ></input>
            </div>
            <div>
              <div>보증금 : </div>
              <input
                placeholder="보증금"
                type={"number"}
                onChange={totalHandle}
                id={"deposit"}
                value={totalInfo.deposit}
              ></input>
            </div>
            <div>
              <div>매매 : </div>
              <input
                placeholder=" 매매"
                type={"number"}
                onChange={totalHandle}
                id={"price"}
                value={totalInfo.price}
              ></input>
            </div>
            <div>
              <div>월세 : </div>
              <input
                placeholder="월세"
                type={"number"}
                onChange={totalHandle}
                id={"monthly"}
                value={totalInfo.monthly}
              ></input>
            </div>
            <div>
              <div>관리비 : </div>
              <input
                placeholder="관리비"
                type={"number"}
                onChange={totalHandle}
                id={"manageFee"}
                value={totalInfo.manageFee}
              ></input>
            </div>

            <label>관리비 포함 요금 부과 항목: </label>
            <form id={"manageInclude"} className="manageInclude">
              <div
                id={"0"}
                className={
                  btnToggle[0].toggle === true ? "manageTag" : "select"
                }
                onClick={checkBoxDiv}
              >
                관리비
              </div>
              <div
                id={"1"}
                className={
                  btnToggle[1].toggle === true ? "manageTag" : "select"
                }
                onClick={checkBoxDiv}
              >
                청소비
              </div>
              <div
                id={"2"}
                className={
                  btnToggle[2].toggle === true ? "manageTag" : "select"
                }
                onClick={checkBoxDiv}
              >
                승강기 유지비용
              </div>
              <div
                id={"3"}
                className={
                  btnToggle[3].toggle === true ? "manageTag" : "select"
                }
                onClick={checkBoxDiv}
              >
                인터넷
              </div>
              <div
                id={"4"}
                className={
                  btnToggle[4].toggle === true ? "manageTag" : "select"
                }
                onClick={checkBoxDiv}
              >
                TV
              </div>
              <div
                id={"5"}
                className={
                  btnToggle[5].toggle === true ? "manageTag" : "select"
                }
                onClick={checkBoxDiv}
              >
                전기세
              </div>
              <div
                id={"6"}
                className={
                  btnToggle[6].toggle === true ? "manageTag" : "select"
                }
                onClick={checkBoxDiv}
              >
                수도세
              </div>
              <div
                id={"7"}
                className={
                  btnToggle[7].toggle === true ? "manageTag" : "select"
                }
                onClick={checkBoxDiv}
              >
                가스비
              </div>
            </form>

            <label>관리비 미포함 요금 부과 항목: </label>
            <form
              id={"manageNotInclude"}
              value={"manageNotInclude"}
              className="manageInclude"
            >
              <div
                id={"0"}
                className={
                  btnUnToggle[0].toggle === true ? "manageTag" : "select"
                }
                onClick={unCheckBoxDiv}
              >
                관리비
              </div>
              <div
                id={"1"}
                className={
                  btnUnToggle[1].toggle === true ? "manageTag" : "select"
                }
                onClick={unCheckBoxDiv}
              >
                청소비
              </div>
              <div
                id={"2"}
                className={
                  btnUnToggle[2].toggle === true ? "manageTag" : "select"
                }
                onClick={unCheckBoxDiv}
              >
                승강기 유지비용
              </div>
              <div
                id={"3"}
                className={
                  btnUnToggle[3].toggle === true ? "manageTag" : "select"
                }
                onClick={unCheckBoxDiv}
              >
                인터넷
              </div>
              <div
                id={"4"}
                className={
                  btnUnToggle[4].toggle === true ? "manageTag" : "select"
                }
                onClick={unCheckBoxDiv}
              >
                TV
              </div>
              <div
                id={"5"}
                className={
                  btnUnToggle[5].toggle === true ? "manageTag" : "select"
                }
                onClick={unCheckBoxDiv}
              >
                전기세
              </div>
              <div
                id={"6"}
                className={
                  btnUnToggle[6].toggle === true ? "manageTag" : "select"
                }
                onClick={unCheckBoxDiv}
              >
                수도세
              </div>
              <div
                id={"7"}
                className={
                  btnUnToggle[7].toggle === true ? "manageTag" : "select"
                }
                onClick={unCheckBoxDiv}
              >
                가스비
              </div>
            </form>
            <div>
              <label>건물 이름 : </label>
              <input
                placeholder="건물이름 입력"
                onChange={totalHandle}
                id={"housingName"}
                value={totalInfo.housingName}
              ></input>
            </div>

            {/* 주소 입력 */}
            <form className="addPd-Addr addition">
              <button onClick={findAddr}> 검색 </button>
              <div>주소 : </div>
              <input
                placeholder="주소 입력"
                value={totalInfo.addr}
                disabled
              ></input>
              <input
                placeholder="상세주소"
                onChange={totalHandle}
                id={"addrDetail"}
                value={totalInfo.addrDetail}
              ></input>
            </form>

            {/* 사진 입력 */}
            <label htmlFor="input-file">
              <input
                type="file"
                className="form-control"
                name="file"
                id="roomImg"
                onChange={onChangePicture}
                multiple
              ></input>
              <span>사진추가</span>
            </label>

            <form onChange={totalHandle}>
              <div> 단기임대 가능여부 : </div>
              <input
                type="radio"
                id="shortTerm"
                name="shortTerm"
                value={true}
              />
              <label> 가능</label>
              <input
                type="radio"
                id="shortTerm"
                name="shortTerm"
                value={false}
              />
              <label> 불가능</label>
            </form>
            <form className="addPd-Contraction" onChange={rentTypeHandle}>
              {/* addPd-Contraction -> rentType*/}
              <span>계약 형태 : </span>
              <ul>
                <li>
                  <input
                    type="radio"
                    value="월세"
                    name="contraction"
                    id="rentType"
                  />{" "}
                  월세
                </li>
                <li>
                  <input
                    type="radio"
                    value="전세"
                    name="contraction"
                    id="rentType"
                  />{" "}
                  전세
                </li>
                <li>
                  <input
                    type="radio"
                    value="매매"
                    name="contraction"
                    id="rentType"
                  />{" "}
                  매매
                </li>
              </ul>
            </form>
            <form onChange={totalHandle}>
              <label>건물 층수 : </label>
              <input
                id={"totalFloor"}
                type={"number"}
                placeholder="총 층수"
                value={totalInfo.totalFloor}
              ></input>
              <label>층</label>
            </form>
            <form onChange={totalHandle}>
              <label>매물 층 : </label>
              <input
                id={"floor"}
                type={"number"}
                placeholder="층"
                value={totalInfo.floor}
              ></input>
              <label>층</label>
            </form>
            <form onChange={totalHandle}>
              <label>공급 면적 : </label>
              <input
                id={"areaSize"}
                type={"number"}
                value={totalInfo.areaSize}
                placeholder="공급 면적"
              ></input>
              <label>m³</label>
            </form>
            <form onChange={totalHandle}>
              <label>전용 면적 : </label>
              <input
                id={"realSize"}
                value={totalInfo.realSize}
                type={"number"}
                placeholder="전용 면적"
              ></input>
              <label>m³</label>
            </form>
            <form onChange={totalHandle}>
              <label>방 개수 : </label>
              <input
                id={"roomCount"}
                type={"number"}
                value={totalInfo.roomCount}
                placeholder="방 개수"
              ></input>
              <label>개</label>
            </form>
            <form onChange={totalHandle}>
              <label>화장실 개수 : </label>
              <input
                id={"bathRoomCount"}
                type={"number"}
                value={totalInfo.bathRoomCount}
                placeholder="화장실 개수"
              ></input>
              <label>개</label>
            </form>

            <form onChange={totalHandle}>
              <label>방향 : </label>
              <ul>
                <li>
                  <input
                    type="radio"
                    id="direction"
                    name="direction"
                    value="N"
                  />
                  <label> 북</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="direction"
                    name="direction"
                    value="E"
                  />
                  <label> 동</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="direction"
                    name="direction"
                    value="S"
                  />
                  <label> 남</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="direction"
                    name="direction"
                    value="W"
                  />
                  <label> 서</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="direction"
                    name="direction"
                    value="NE"
                  />
                  <label> 북동</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="direction"
                    name="direction"
                    value="SE"
                  />
                  <label> 남동</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="direction"
                    name="direction"
                    value="SW"
                  />
                  <label> 남서</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="direction"
                    name="direction"
                    value="NW"
                  />
                  <label> 북서</label>
                </li>
              </ul>
            </form>
            <form onChange={totalHandle}>
              <ul>
                <li>
                  <label>난방 종류 : </label>
                  <input
                    type="radio"
                    id="heating"
                    name="heating"
                    value="Individual"
                  />
                  <label> 개별 난방</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="heating"
                    name="heating"
                    value="Central"
                  />
                  <label> 중앙 난방</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="heating"
                    name="heating"
                    value="District"
                  />
                  <label> 직역 난방</label>
                </li>
              </ul>
            </form>
            <form onChange={totalHandle}>
              <label>빌트인 : </label>
              <input type="radio" id="builtIn" name="builtIn" value={true} />
              <label> 빌트인 있음</label>
              <input type="radio" id="builtIn" name="builtIn" value={false} />
              <label> 빌트인 없음</label>
            </form>
            <form onChange={totalHandle}>
              <label>빌트인 정보 : </label>
              <input placeholder="빌트인 정보 입력" id="builtInDetail"></input>
            </form>
            <form onChange={totalHandle}>
              <label>엘리베이터 : </label>
              <input
                type="radio"
                id="elevator"
                name="elevator"
                value={true}
              ></input>
              <label> 있음</label>
              <input
                type="radio"
                id="elevator"
                name="elevator"
                value={false}
              ></input>
              <label> 없음</label>
            </form>
            <form onChange={totalHandle}>
              <label>베란다 : </label>
              <input
                type={"radio"}
                id="veranda"
                name="veranda"
                value={true}
              ></input>
              <label> 있음</label>
              <input
                type={"radio"}
                id="veranda"
                name="veranda"
                value={true}
              ></input>
              <label> 없음</label>
            </form>
            <form onChange={totalHandle}>
              <label>입주 가능일 : </label>
              {/* 오늘 날짜를 기본으로 지정*/}
              <input type="date" id="availableMoveIn"></input>
            </form>
            <form onChange={totalHandle}>
              <label>주 용도 : </label>
              <input type="radio" id="mainUse" name="mainUse" value="House" />
              <label> 단독주택</label>
              <input
                type="radio"
                id="mainUse"
                name="mainUse"
                value="apartment"
              />
              <label> 공동주택</label>
              <input type="radio" id="mainUse" name="mainUse" value="Type1" />
              <label> 제1종 근린생활시설</label>
              <input type="radio" id="mainUse" name="mainUse" value="Type2" />
              <label> 제2종 근린생활시설</label>
              <label> 기타 : </label>
              <input placeholder="기타" id="mainUse" name="mainUse"></input>
            </form>
            <form onChange={totalHandle}>
              <label>건축 일자 : </label>
              {/* 오늘 날짜를 기본으로 지정*/}
              <input type="date" id="approvalDate" name="approvalDate"></input>
            </form>

            <div>시설 tag</div>

            <form onChange={totalHandle} className="addPd-houseType">
              {/* roomType*/}
              <span>방 구조 : </span>
              <ul>
                <li>
                  <input
                    type="radio"
                    value="oneRoom"
                    name="roomType"
                    id="roomType"
                  />{" "}
                  원룸
                </li>
                <li>
                  <input
                    type="radio"
                    value="twoRoom"
                    name="roomType"
                    id="roomType"
                  />{" "}
                  투룸
                </li>
                <li>
                  <input
                    type="radio"
                    value="twoBay"
                    name="roomType"
                    id="roomType"
                  />{" "}
                  투베이
                </li>
                <li>
                  <input
                    type="radio"
                    value="threeRoom"
                    name="roomType"
                    id="roomType"
                  />{" "}
                  쓰리룸
                </li>
                <li>
                  <input
                    type="radio"
                    value="apartment"
                    name="roomType"
                    id="roomType"
                  />
                  아파트
                </li>
                <li>
                  <input
                    type="radio"
                    value="vila"
                    name="roomType"
                    id="roomType"
                  />
                  빌라
                </li>
                <li>
                  <input
                    type="radio"
                    value="house"
                    name="roomType"
                    id="roomType"
                  />
                  단독주택
                </li>
              </ul>
            </form>

            <div>주변시설 tag</div>
            <form className="addPd-isparking" onChange={totalHandle}>
              <span>주차 가능 여부 : </span>
              <ul>
                <li>
                  <input
                    type="radio"
                    value="0"
                    name="building"
                    id="parkingArea"
                  />{" "}
                  가능
                </li>
                <li>
                  <input
                    type="radio"
                    value="0"
                    name="building"
                    id="parkingArea"
                  />{" "}
                  불가능
                </li>
                <li>
                  <input
                    type={"number"}
                    placeholder="세대당 주차 수"
                    id={"parkingArea"}
                    value={totalInfo.parkingArea}
                  ></input>
                </li>
              </ul>
            </form>
            <div>매물등록</div>
          </div>
        )}
      </div>
    </>
  );
}

export default AddProduct;
