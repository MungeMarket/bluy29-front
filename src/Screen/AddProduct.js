import React, { useEffect, useState } from "react";
import "../Styles/AddProduct.css";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";
import { ADD_PRODUCT, VERIFY_TEST } from "../GraphQL/gqlList";
import {
  contractionHandle,
  buildingHandle,
  houseTypeHandle,
  isParkingHandle,
  titleHandle,
  monthlyHandle,
  detailContentHandle,
  depositHandle,
  manageFeeHandle,
  manageIncludeHandle,
  manageNotIncludeHandle,
  housingNameHandle,
  shortTermHandle,
  totalFloorHandle,
  floorHandle,
  areaSizeHandle,
  realSizeHandle,
  roomCountHandle,
  bathRoomCountHandle,
  rentTypeHandle,
  directionHandle,
  heatingHandle,
  builtInHandle,
  builtInDetailHandle,
  elevatorHandle,
  verandaHandle,
  availableMoveInnHandle,
  mainUseHandle,
  approvalDateHandle,
  roomTypeHandle,
  parkingAreaHandle,
  priceHandle,
} from "../Components/addProductFunction";

const API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
//토큰 지우기
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTc4ODYxNjEsImlkeCI6MiwiaWF0IjoxNjU3Nzk5NzYxfQ.fCqsCr4PO2k8UUx3VQaDR8z6-5lSi9GOS28tDQj58x0";
//x-jwt,
const AUTHORIZATION = "x-jwt";
function AddProduct() {
  const [addrFind, setAddrFind] = useState(false);
  const [finalAddr, setFinalAddr] = useState();
  const [latLng, setLatLng] = useState({}); //x,y 좌표값 보낼 때 latLng 같이 보내기
  const [imgList, setImgList] = useState([]); // 매물 사진
  const [picture, setPicture] = useState([]); //test
  const [fileOne, setFileOne] = useState([]);
  const [fileTwo, setFileTwo] = useState([]);
  const [fileThree, setFileThree] = useState([]);
  const [file, setFile] = useState(null);
  const [totalInfo, setTotalInfo] = useState({});
  const [includeManage, setIncludeManage] = useState([]);
  const [notIncludeManage, setNotIncludeManage] = useState([]);

  const formData = new FormData();
  const findAddr = () => {
    setAddrFind(true);
  };
  useEffect(() => {
    //verify1();
    console.log("includeManage : ", includeManage);
    console.log("notIncludeManage : ", notIncludeManage);
    console.log("totalInfo : ", totalInfo);
  }, [includeManage, notIncludeManage, totalInfo]);

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
  const inputProduct = () => {
    console.log(imgList);

    createHousingMutation({
      variables: {
        rentType: {
          name: "월세",
        },
        deposit: 5000000,
        monthly: 300000,
        manageFee: 30000,
        manageInclude: "인터넷,수도사용료,기타",
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
        security: [
          {
            name: "방범창",
          },
          {
            name: "비디오폰",
          },
        ],
        title: "두번째 매물",
        detailContent: "첫번째 입니다.",
        addr: "충청북도 청주시 상당구 용정동",
        addrDetail: "1052번지",
        lat: 36.6217437805879,
        long: 127.50993511481414,
      },
    });

    console.log();

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

  const postCodeStyle = {
    width: "50%",
    height: "70vh",
  };
  const onImgChange = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    console.log("formData : ", formData);
  };

  const imgSendAwsS3 = async () => {
    console.log("hh");
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

    console.log("보내기전 data : ", formData.getAll("file"));
    console.log("보내기전 data : ", formData);
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
  const check = () => {
    console.log(includeManage);
    console.log(notIncludeManage);
  };

  const checkBox = (event) => {
    if (event.target.id == "manageInclude") {
      if (event.target.checked) {
        const value = event.target.value;
        setIncludeManage([...includeManage, value]);
      } else {
        const value = event.target.value;
        const arr = new Array();
        includeManage.filter((index) => {
          if (index !== value) {
            arr.push(index);
            //console.log(arr);
          }
        });
        setIncludeManage(arr);
      }
      const idText = event.target.id;
      //console.log("id, value : ", idText, valueText);
      valueClean(idText, includeManage.join());
    } else {
      if (event.target.checked) {
        const value = event.target.value;
        setNotIncludeManage([...notIncludeManage, value]);
      } else {
        const value = event.target.value;
        const arr = new Array();
        notIncludeManage.filter((index) => {
          if (index !== value) {
            arr.push(index);
            //console.log(arr);
          }
        });
        setNotIncludeManage(arr);
      }
      const idText = event.target.id;
      //console.log("id, value : ", idText, valueText);
      valueClean(idText, notIncludeManage.join());
    }
  };
  const totalHandle = (event) => {
    //console.log(event.target.id, " : ", event);
    const idText = event.target.id;
    const valueText = event.target.value;
    //console.log("id, value : ", idText, valueText);
    valueClean(idText, valueText);
  };

  const valueClean = (idText, valueText) => {
    setTotalInfo({ ...totalInfo, [idText]: valueText });
  };

  return (
    <div className="addPd">
      {addrFind ? (
        <div className="addPd-addrSearch">
          <span className="addPd-addrSearch">
            <DaumPostcode onComplete={handleComplete} style={postCodeStyle} />
          </span>
          <iframe id="iframe1" name="iframe1" style="display:none"></iframe>
        </div>
      ) : (
        <div className="addPd-view">
          <div>
            <button onClick={inputProduct}>제출</button>
            <button onClick={check}>제출2</button>
          </div>
          <div className="addPd-Name addition">
            <div>제목 : </div>

            <input
              placeholder="제목"
              onChange={totalHandle}
              id={"title"}
            ></input>
          </div>
          <div className="addPd-Name addition">
            <div>상세 설명 : </div>

            <input
              placeholder="상세 설명"
              onChange={totalHandle}
              id={"detailContent"}
            ></input>
          </div>
          <div>
            <div>보증금 : </div>
            <input
              placeholder="보증금"
              type={"number"}
              onChange={totalHandle}
              id={"deposit"}
            ></input>
          </div>
          <div>
            <div>매매 : </div>
            <input
              placeholder=" 매매"
              type={"number"}
              onChange={totalHandle}
              id={"price"}
            ></input>
          </div>
          <div>
            <div>월세 : </div>
            <input
              placeholder="월세"
              type={"number"}
              onChange={totalHandle}
              id={"monthly"}
            ></input>
          </div>
          <div>
            <div>관리비 : </div>
            <input
              placeholder="관리비"
              type={"number"}
              onChange={totalHandle}
              id={"manageFee"}
            ></input>
          </div>

          <form onChange={checkBox} id={"manageInclude"} value={"management"}>
            <div>관리비 포함 요금 부과 항목: </div>
            <input
              type="checkbox"
              id="manageInclude"
              name="manageInclude1"
              value="management"
            />
            <label> 관리비</label>
            <input
              type="checkbox"
              id="manageInclude"
              name="manageInclude2"
              value="cleaning"
            />
            <label> 청소비</label>
            <input
              type="checkbox"
              id="manageInclude"
              name="manageInclude3"
              value="elevator"
            />
            <label> 승강기 유지비용</label>
            <input
              type="checkbox"
              id="manageInclude"
              name="manageInclude4"
              value="internet"
            />
            <label> 인터넷</label>
            <input
              type="checkbox"
              id="manageInclude"
              name="manageInclude5"
              value="tv"
            />
            <label> TV</label>
            <input
              type="checkbox"
              id="manageInclude"
              name="manageInclude6"
              value="eletronic"
            />
            <label> 전기세</label>
            <input
              type="checkbox"
              id="manageInclude"
              name="manageInclude7"
              value="water"
            />
            <label> 수도세</label>
            <input
              type="checkbox"
              id="manageInclude"
              name="manageInclude8"
              value="gas"
            />
            <label> 가스비</label>
          </form>

          <form
            onChange={checkBox}
            id={"manageNotInclude"}
            value={"manageNotInclude"}
          >
            <div>관리비 미포함 요금 부과 항목: </div>
            <input
              type="checkbox"
              id="manageNotInclude"
              name="manageNotInclude1"
              value="management"
            />
            <label> 관리비</label>
            <input
              type="checkbox"
              id="manageNotInclude"
              name="manageNotInclude2"
              value="cleaning"
            />
            <label> 청소비</label>
            <input
              type="checkbox"
              id="manageNotInclude"
              name="manageNotInclude3"
              value="elevator"
            />
            <label> 승강기 유지비용</label>
            <input
              type="checkbox"
              id="manageNotInclude"
              name="manageNotInclude4"
              value="internet"
            />
            <label> 인터넷</label>
            <input
              type="checkbox"
              id="manageNotInclude"
              name="manageNotInclude5"
              value="tv"
            />
            <label> TV</label>
            <input
              type="checkbox"
              id="manageNotInclude"
              name="manageNotInclude6"
              value="eletronic"
            />
            <label> 전기세</label>
            <input
              type="checkbox"
              id="manageNotInclude"
              name="manageNotInclude7"
              value="water"
            />
            <label> 수도세</label>
            <input
              type="checkbox"
              id="manageNotInclude"
              name="manageNotInclude8"
              value="gas"
            />
            <label> 가스비</label>
          </form>
          <div>
            <label>건물 이름 : </label>
            <input
              placeholder="건물이름 입력"
              onChange={totalHandle}
              id={"housingName"}
            ></input>
          </div>

          {/* 주소 입력 */}
          <form className="addPd-Addr addition">
            <div>주소 : </div>
            <button onClick={findAddr}> 검색 </button>
            <input placeholder="상세주소"></input>
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
            <button onClick={imgSendAwsS3}>사진 업로드</button>
          </label>

          <form onChange={totalHandle}>
            <div> 단기임대 가능여부 : </div>
            <input type="radio" id="shortTerm" name="shortTerm" value={true} />
            <label> 가능</label>
            <input type="radio" id="shortTerm" name="shortTerm" value={false} />
            <label> 불가능</label>
          </form>
          <form className="addPd-Contraction" onChange={totalHandle}>
            {/* addPd-Contraction -> rentType*/}
            <span>계약 형태 : </span>
            <ul>
              <li>
                <input
                  type="radio"
                  value="monthly"
                  name="contraction"
                  id="monthly"
                />{" "}
                월세
              </li>
              <li>
                <input
                  type="radio"
                  value="charter"
                  name="contraction"
                  id="charter"
                />{" "}
                전세
              </li>
              <li>
                <input
                  type="radio"
                  value="trading"
                  name="contraction"
                  id="trading"
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
            ></input>
            <label>층</label>
          </form>
          <form onChange={totalHandle}>
            <label>매물 층 : </label>
            <input id={"floor"} type={"number"} placeholder="층"></input>
            <label>층</label>
          </form>
          <form onChange={totalHandle}>
            <label>공급 면적 : </label>
            <input
              id={"areaSize"}
              type={"number"}
              placeholder="공급 면적"
            ></input>
            <label>m³</label>
          </form>
          <form onChange={totalHandle}>
            <label>전용 면적 : </label>
            <input
              id={"realSize"}
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
              placeholder="방 개수"
            ></input>
            <label>개</label>
          </form>
          <form onChange={totalHandle}>
            <label>화장실 개수 : </label>
            <input
              id={"bathRoomCount"}
              type={"number"}
              placeholder="화장실 개수"
            ></input>
            <label>개</label>
          </form>

          <form onChange={totalHandle}>
            <label>방향 : </label>
            <ul>
              <li>
                <input type="radio" id="direction" name="direction" value="N" />
                <label> 북</label>
              </li>
              <li>
                <input type="radio" id="direction" name="direction" value="E" />
                <label> 동</label>
              </li>
              <li>
                <input type="radio" id="direction" name="direction" value="S" />
                <label> 남</label>
              </li>
              <li>
                <input type="radio" id="direction" name="direction" value="W" />
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
          <form onChange={builtInHandle}>
            <label>빌트인 : </label>
            <input type="radio" id="builtIn" name="builtIn" value={true} />
            <label> 빌트인 있음</label>
            <input type="radio" id="builtIn" name="builtIn" value={false} />
            <label> 빌트인 없음</label>
          </form>
          <form onChange={builtInDetailHandle}>
            <label>빌트인 정보 : </label>
            <input placeholder="빌트인 정보 입력"></input>
          </form>
          <form onChange={elevatorHandle}>
            <label>엘리베이터 : </label>
            <input type={"radio"}></input>
            <label> 있음</label>
            <input type={"radio"}></input>
            <label> 없음</label>
          </form>
          <form onChange={verandaHandle}>
            <label>베란다 : </label>
            <input type={"radio"}></input>
            <label> 있음</label>
            <input type={"radio"}></input>
            <label> 없음</label>
          </form>
          <form onChange={availableMoveInnHandle}>
            <label>입주 가능일 : </label>
            {/* 오늘 날짜를 기본으로 지정*/}
            <input type="date" value="2022-07-14"></input>
          </form>
          <form onChange={mainUseHandle}>
            <label>주 용도 : </label>
            <input
              type="radio"
              id="directionW"
              name="directionW"
              value="House"
            />
            <label> 단독주택</label>
            <input
              type="radio"
              id="directionW"
              name="directionW"
              value="apartment"
            />
            <label> 공동주택</label>
            <input
              type="radio"
              id="directionW"
              name="directionW"
              value="Type1"
            />
            <label> 제1종 근린생활시설</label>
            <input
              type="radio"
              id="directionW"
              name="directionW"
              value="Type2"
            />
            <label> 제2종 근린생활시설</label>
            <label> 기타 : </label>
            <input placeholder="기타"></input>
          </form>
          <form onChange={approvalDateHandle}>
            <label>건축 일자 : </label>
            {/* 오늘 날짜를 기본으로 지정*/}
            <input type="date" value="2022-07-14"></input>
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
                  value="true"
                  name="building"
                  id="parkingArea"
                />{" "}
                가능
              </li>
              <li>
                <input
                  type="radio"
                  value="false"
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
                ></input>
              </li>
            </ul>
          </form>
          <div>매물등록</div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
