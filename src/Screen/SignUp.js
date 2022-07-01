import React, { useState } from "react";
import "../Styles/SignUp.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";

function SignUp() {
  const [idEmail, setIdEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [agree, setAgree] = useState("");
  const [addr, setAddr] = useState("");
  const [addrDeatail, setAddrDeatail] = useState("");
  const [finalAddr, setFinalAddr] = useState(); //주소
  const [addrFind, setAddrFind] = useState(false);

  const options = [
    "naver.com",
    "hanmail.com",
    "daum.net",
    "gmail.com",
    "nate.com",
    "hotmail.com",
    "outlook.com",
    "Icloud.com",
    "직접입력",
  ];

  const pwCheckHandler = (e) => {
    console.log(e.target.value);
  };
  const pwHandler = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const emailHandler = (e) => {
    console.log(e.target.value);
    setIdEmail(e.target.value);
  };

  const phoneHandler = (e) => {
    console.log(e.target.value);
    setPhone(e.target.value);
  };

  const nickNameHandler = (e) => {
    console.log(e.target.value);
    setNickName(e.target.value);
  };
  const addrDetailHandler = (e) => {
    console.log(e.target.value);
    setAddrDeatail(e.target.value);
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
  };
  const postCodeStyle = {
    width: "50%",
    height: "70vh",
  };
  const findAddr = () => {
    setAddrFind(true);
  };

  const signUpHandler = () => {};

  return (
    <div className="signUp">
      {addrFind && (
        <div className="addPd-addrSearch">
          <span>
            <DaumPostcode onComplete={handleComplete} style={postCodeStyle} />
          </span>
        </div>
      )}
      <div className="signUpView">
        <div className="head">
          <span>회원가입</span>
        </div>
        <div className="social">
          <span>SNS계정으로 간편하게 회원가입</span>
          <div className="sns-icon">
            <div>페이스북</div>
            <div>카톡</div>
            <div>네이버</div>
          </div>
        </div>

        <div className="email">
          <span>이메일</span>
          <div className="email-input">
            <input
              placeholder="이메일"
              style={{ width: "100px" }}
              onChange={emailHandler}
            ></input>
            @
            <Dropdown
              className="myClassName"
              options={options}
              placeholder="선택해주세요"
            />
          </div>
          {/* <button>이메일 인증하기</button> */}
        </div>
        <div>
          <span>핸드폰 번호 : </span>
          <input placeholder="핸드폰 번호" onChange={phoneHandler}></input>
        </div>
        <div>
          <span>비밀번호</span>
          <span>
            영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </span>
          <input placeholder="비밀번호" onChange={pwHandler}></input>
        </div>
        <div>
          <span>비밀번호</span>

          <input placeholder="비밀번호 확인" onChange={pwCheckHandler}></input>
        </div>
        <div>
          <span>닉네임</span>
          <span>다른 유저와 겹치지 않는 별명을 입력해주세요. (2~15자)</span>
          <input placeholder="별명 (2~15자)" onChange={nickNameHandler}></input>
        </div>
        <div>
          <span>주소</span>
          <button onClick={findAddr}> 검색 </button>
          <span>상세주소 : </span>
          <input placeholder="상세주소" onChange={addrDetailHandler}></input>
        </div>
        <div>약관동의</div>
        <button onClick={signUpHandler}>회원가입하기 버튼</button>
        <div>이미 아이디가 있으신가요? 로그인</div>
      </div>
    </div>
  );
}

export default SignUp;
