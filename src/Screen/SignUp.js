import React, { useEffect, useState } from "react";
import "../Styles/SignUp.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import DaumPostcode from "react-daum-postcode";
import { gql, useMutation } from "@apollo/client";
import { SIGN_UP } from "../GraphQL/gqlList";
import { useNavigate, Navigate } from "react-router-dom";

function SignUp() {
  const [idEmail, setIdEmail] = useState("");
  const [email, setEmail] = useState("");
  const [emailDisable, setEmailDisable] = useState(false);
  const [emailExtra, setEmailExtra] = useState(true); // Email 형식 확인
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  //const [passwordExtra, setPasswordExtra] = useState(false); //비밀번호 형식 확인
  const [passworCheckExtra, setPassworCheckExtra] = useState(false); //비밀번호확인 형식 확인
  const [nickName, setNickName] = useState("");
  const [magree, setMAgree] = useState(true);
  //const [addr, setAddr] = useState("");
  const [addrDetail, setAddrDetail] = useState("");
  const [zonecode, setZonecode] = useState(""); //우편번호
  const [finalAddr, setFinalAddr] = useState(""); //주소
  const [addrFind, setAddrFind] = useState(false); //우편번호 검색 켜기

  const navigate = useNavigate();

  const [createAccountMutation, { data, loading, error }] =
    useMutation(SIGN_UP);
  useEffect(() => {
    if (password === passwordCheck) {
      setPassworCheckExtra(true);
      console.log("같다");
    } else {
      setPassworCheckExtra(false);
      console.log("다르다");
    }
  }, [password, passwordCheck]);

  const SignUpHandler = () => {
    //회원가입 정보 확인
    console.log(
      "id:",
      idEmail + "@" + email,
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
      createAccountMutation({
        variables: {
          id: idEmail + "@" + email,
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

    navigate("/"); //회원가입 성공 시 홈으로 보내기 나중에 회원가입 완료 화면 만들기

    return data;
  };

  const options = [
    { label: "직접입력", value: "none" },
    { label: "Naver", value: "naver.com" },
    { label: "Hanmail", value: "hanmail.net" },
    { label: "Daum", value: "daum.net" },
    { label: "Gmail", value: "gmail.com" },
    { label: "Nate", value: "nate.com" },
    { label: "Hotmail", value: "hotmail.com" },
    { label: "Outlook", value: "outlook.com" },
    { label: "iCloud", value: "icloud.com" },
  ];

  const pwCheckHandler = (e) => {
    setPasswordCheck(e.target.value);
    console.log("비번확인 : ", e.target.value);
  };
  const pwHandler = (e) => {
    setPassword(e.target.value);
    console.log("비번 : ", e.target.value);
  };

  const emailChoice = (e) => {
    console.log("@" + e.value);
    if (e.value === "none") {
      setEmailDisable(false);
      setEmail("");
    } else {
      setEmailExtra(true); //이메일 형식 설명 숨기기
      console.log("emailExtra : ", emailExtra);
      setEmailDisable(true);
      setEmail(e.value);
    }
  };

  const idHandler = (e) => {
    setIdEmail(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    if (e.target.value.includes(".")) {
      setEmailExtra(true); //이메일 형식 설명 숨기기
      console.log("emailExtra : ", emailExtra);
    } else {
      setEmailExtra(false); //이메일 형식 설명 표시하기
      console.log("emailExtra : ", emailExtra);
    }
  };

  const phoneHandler = (e) => {
    setPhone(e.target.value.replace(/[^0-9]/g, ""));

    console.log("제거");
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
              placeholder="ID"
              style={{ width: "100px" }}
              onChange={idHandler}
            ></input>
            <span>@</span>
            <input
              disabled={emailDisable}
              placeholder="직접입력"
              style={{ width: "100px" }}
              onChange={emailHandler}
              value={email}
            ></input>
          </div>
          <span hidden={emailExtra}>이메일 형식이 올바르지 않습니다.</span>
          <Dropdown
            className="myClassName"
            options={options}
            placeholder="선택해주세요"
            onChange={emailChoice}
            value={"none"}
          />
          {/* <button>이메일 인증하기</button> */}
        </div>
        <div className="phone">
          <span>핸드폰 번호 : </span>
          <input
            placeholder=" ' - ' 빼고 입력해주세요. "
            onChange={phoneHandler}
            value={phone}
          ></input>
        </div>
        <div className="password">
          <span>비밀번호</span>
          <span>
            영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </span>
          <input
            type="password"
            placeholder="비밀번호"
            onChange={pwHandler}
            value={password}
          ></input>
        </div>
        <div>
          <span>비밀번호</span>

          <input
            type="password"
            placeholder="비밀번호 확인"
            onChange={pwCheckHandler}
            value={passwordCheck}
          ></input>
          <span hidden={passworCheckExtra}>비밀번호가 일치하지 않습니다.</span>
        </div>
        <div>
          <span>닉네임</span>
          <input placeholder="별명 (2~15자)" onChange={nickNameHandler}></input>
          <span hidden={true}>
            다른 유저와 겹치지 않는 별명을 입력해주세요. (2~15자){" "}
          </span>
        </div>
        <div>
          <button onClick={findAddr}> 검색 </button>
          <span>주소 : </span>
          <span>{finalAddr}</span>
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
