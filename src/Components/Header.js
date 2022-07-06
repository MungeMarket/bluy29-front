import React from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Link } from "react-router-dom";
import image from "../libs/image";
import "../Styles/HeaderRe.css";
function Header() {
  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup"
  )
    return (
      <div className="Head-login">
        <a href="/">홈으로</a>
      </div>
    );

  return (
    <div className="Head">
      <div className="Head-View">
        <div
          className={
            window.location.pathname === "/landmap"
              ? "Head-Header-map"
              : "Head-Header"
          }
        >
          <div>
            <a href="/">
              <img src={image.i_icon} width={"40px"}></img>
            </a>
          </div>
          <div>
            <a href="/market">펫 인테리어</a>
          </div>
          <div>
            <a href="/landmap">부동산 정보</a>
          </div>
          <div>
            <a href="/addproduct">부동산 등록</a>
          </div>
          <div>
            <a href="/sns">시공 후기</a>
          </div>
          <div></div>
          <div>
            <a href="/login">로그인</a>
          </div>
          <div>
            <a href="/signup">회원가입</a>
          </div>
          <div className="sigong">
            <a href="/myInfo">
              <img src={image.sigong} width="15px"></img>
              <span>시공문의</span>
            </a>
          </div>
        </div>
      </div>

      <div
        className={
          window.location.pathname === "/landmap"
            ? "Head-subHeader-map"
            : "Head-subHeader"
        }
      ></div>
    </div>
  );
}

export default Header;
