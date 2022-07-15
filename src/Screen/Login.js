import React, { useEffect, useState } from "react";
import "../Styles/Login.css";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOG_IN } from "../GraphQL/gqlList";

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [loginInfo, setLoginInfo] = useState([]);
  const [getLoading, setGetLoading] = useState(true);
  const [logInMutation, { data, loading, error }] = useMutation(LOG_IN);

  useEffect(() => {
    check();
  }, []);

  const check = () => {
    console.log(loginInfo);
  };

  const getToken = async () => {
    await logInMutation({
      variables: {
        id: id,
        pw: pw,
      },
    });
    console.log(data);
    setLoginInfo(data);
    setGetLoading(!getLoading);
  };
  const loginHandle = () => {
    getToken();
  };

  const idHandle = (e) => {
    console.log(e.target.value);
    setId(e.target.value);
  };
  const pwHandle = (e) => {
    console.log(e.target.value);
    setPw(e.target.value);
  };

  return (
    <div className="login">
      <div className="login-body">
        <div className="login-logo">로고</div>
        <div className="login-id_pw">
          <input
            placeholder="이메일"
            className="login-id_pw-id"
            onChange={idHandle}
          ></input>
          <input
            placeholder="비밀번호"
            className="login-id_pw-pw"
            onChange={pwHandle}
          ></input>
        </div>
        <div className="login-btnVIew">
          <div className="login-login_btn">
            <button onClick={loginHandle}> 로그인 </button>
          </div>
          <div className="login-login_info">
            <div className="login-login_info-body">
              <Link to="/signup">
                <button className="sign-up">회원가입</button>{" "}
              </Link>
              <button className="findPw" onClick={check}>
                비밀번호 찾기
              </button>
            </div>
          </div>
        </div>
        <div className="login-sns">
          <span className="login-sns-txt">
            SNS계정으로 간편 로그인/회원가입
          </span>
          <div className="login-sns-btn">
            <div>카카오</div>
            <div>네이버</div>
            <div>페이스북</div>
            <div>구글</div>
          </div>
          <div className="login-qna">로그인에 문제가 있으신가요?</div>
          <div className="login-unloginBuy">비회원 주문 조회하기</div>
        </div>
      </div>
      <div>멍이마켓</div>
    </div>
  );
}

export default Login;
