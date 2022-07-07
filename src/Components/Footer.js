import React from "react";
import image from "../libs/image";
import "../Styles/Footer.css";
//import "../Styles/MFooter.css";

function Footer() {
  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup"
  )
    return <div></div>;
  if (window.location.pathname === "/landmap") return <div></div>;
  return (
    <footer className="footer">
      <div className="footer-footer">
        <div className="detail">
          <div className="title">
            <div className="title-phone-img">
              <img src={image.phone}></img>
            </div>

            <h1>1899-2485</h1>
          </div>
          <div>
            <h3>
              09:00~20:00 (주말, 공휴일은 시공 문의에 한해 전화 상담 가능)
            </h3>
          </div>
          <div className="detail-company">
            <h4>
              (주)멍이마켓 대표:임보혁 연락처:1899-2485 팩스:043-267-0846
              제휴문의:mungemarket@naver.com
            </h4>
            <h4>
              사업자 등록번호:782-87-01904 통신판매업:제2020-충북 청주 2893호
            </h4>
            <h4>주소:충북 청주시 상당구 용암북로160번길 25 삼풍빌딩 4층</h4>
            <h4>Copyright(c) 2022 mungemarket All Rights Reserved</h4>
          </div>
        </div>
        <div className="contact">
          <div>
            <img src={image.i_instagram}></img>
          </div>
          <div>
            <img src={image.i_kakaotalk}></img>
          </div>
          <div>
            <img src={image.i_facebook}></img>
          </div>
          <div>
            <img src={image.i_naverBlog}></img>
          </div>
          <div>
            <img src={image.i_youtube}></img>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
