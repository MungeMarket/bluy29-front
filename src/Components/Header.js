import React from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "../Styles/HeaderRe.css";
function Header() {
  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup"
  )
    return (
      <header className="Head-login">
        <a href="/">홈으로</a>
      </header>
    );

  return (
    <header className="Head">
      <div
        className={
          window.location.pathname === "/landmap"
            ? "Head-Header-map"
            : "Head-Header"
        }
      >
        <a href="/">Bluy29</a>
        <a href="/landmap">매물검색</a>
        <a href="/addProduct">매물 등록</a>
        <a href="/market">마켓</a>
        <input placeholder="검색"></input>
        {/* <FontAwesomeIcon icon="fa-regular fa-cart-shopping" /> */}
        <a href="/login">로그인</a>
        <a href="/signup">회원가입</a>
        <a href="/myInfo">마이페이지</a>

        <div>글쓰기</div>
      </div>
      <div
        className={
          window.location.pathname === "/landmap"
            ? "Head-subHeader-map"
            : "Head-subHeader"
        }
      ></div>
    </header>
  );
}

export default Header;
