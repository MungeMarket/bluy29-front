import React, { useEffect, useState } from "react";
import "../Styles/SignUp.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import DaumPostcode from "react-daum-postcode";
import { gql, useMutation } from "@apollo/client";

const SIGN_UP = gql`
  mutation signUpMutation(
    $id: String!
    $pw: String!
    $nickname: String!
    $phone: String!
    $mAgree: Boolean!
    $zipCode: String!
    $addr: String!
    $addrDetail: String!
  ) {
    createAccount(
      input: {
        id: $id
        pw: $pw
        nickname: $nickname
        phone: $phone
        mAgree: $mAgree
        zipCode: $zipCode
        addr: $addr
        addrDetail: $addrDetail
      }
    ) {
      status
      error
    }
  }
`;

function SignUp() {
  const [idEmail, setIdEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [magree, setMAgree] = useState(true);
  const [addr, setAddr] = useState("");
  const [addrDetail, setAddrDetail] = useState("");
  const [zonecode, setZonecode] = useState(""); //우편번호
  const [finalAddr, setFinalAddr] = useState(""); //주소
  const [addrFind, setAddrFind] = useState(false); //우편번호 검색 켜기

  const [signUpMutation, { data, loading, error }] = useMutation(SIGN_UP);

  const SignUpHandler = () => {
    console.log(
      "id:",
      idEmail,
      "phone:",
      phone,
      "pw:",
      password,
      "nick:",
      nickName,
      "addr:",
      finalAddr,
      "addr:",
      addrDetail,
      "agree:",
      magree,
      "zonecode:",
      zonecode
    );
    try {
      signUpMutation({
        variables: {
          id: idEmail,
          pw: password,
          nickname: nickName,
          phone: phone,
          mAgree: magree,
          zipCode: zonecode,
          addr: finalAddr,
          addrDetail: addrDetail,
        },
      });

      console.log(data, loading, error);
    } catch (error) {
      console.log("회원가입에러 : ", error);
    }

    return data;
  };

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

  const pwCheckHandler = (e) => {};
  const pwHandler = (e) => {
    setPassword(e.target.value);
  };

  const emailHandler = (e) => {
    setIdEmail(e.target.value);
  };

  const phoneHandler = (e) => {
    setPhone(e.target.value);
  };

  const nickNameHandler = (e) => {
    setNickName(e.target.value);
  };
  const addrDetailHandler = (e) => {
    setAddrDetail(e.target.value);
  };
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

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

    setZonecode(data.zonecode);
  };
  const postCodeStyle = {
    width: "50%",
    height: "70vh",
  };
  const findAddr = () => {
    setAddrFind(true);
  };

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
        <button onClick={SignUpHandler}>회원가입하기 버튼</button>

        <div>이미 아이디가 있으신가요?</div>
        <a href="/login">로그인</a>
        <div>{loading ? "" : data ? `${data.createAccount.status}` : ""}</div>
      </div>
    </div>
  );
}

export default SignUp;
