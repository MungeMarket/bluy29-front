import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import image from "../libs/image";
import { NextArrow, PrevArrow } from "../Components/Arrow";
import { Helmet, HelmetProvider } from "react-helmet-async";
// Import css files
import "../Styles/Home.css";
import "../Styles/MHome.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MHome() {
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(window.screen.availWidth);
    console.log(window.screen.availWidth);
    if (width < 550) {
      console.log("mobile");
    }
  }, [window.screen.availWidth]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    useCss: true,
    arrows: false,
  };
  const settings1 = {
    infinite: false,
    speed: 500,
    slidesToShow: 1.4,
    slidesToScroll: 1,
    autoplay: false,
    useCss: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
  };

  return (
    <div className="MHome">
      <HelmetProvider>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=no, 
    maximum-scale=1.0, minimum-scale=1.0, viewport-fit=corver"
          />
        </Helmet>
      </HelmetProvider>
      <div className="slide">
        <Slider {...settings}>
          <div className="imgView">
            <img src={image.banner} alt="bannerImage"></img>
          </div>
        </Slider>
      </div>

      <div className="Main-Btn">
        <div className="Btn-Img">
          <a href="/market">
            <img className="img" src={image.interior}></img>
            <div className="TextBox">
              <div>
                <h1>펫 인테리어 </h1>
                <span>&nbsp;&nbsp;&nbsp;&nbsp; </span>
                <img src={image.hlaf_arrow} width="40px" height={"15px"}></img>
              </div>
              <span>우리집 반려동물과 오래오래 함께 사는 방법</span>
            </div>
          </a>
        </div>

        <div className="Btn-Img">
          <a href="/landmap">
            <img className="img" src={image.building}></img>
            <div className="TextBox">
              <div>
                <h1>부동산 정보</h1>
                <span>&nbsp;&nbsp;&nbsp;&nbsp; </span>
                <img src={image.hlaf_arrow} width="40px" height={"15px"}></img>
              </div>
              <span>반려동물 입주 가능 부동산 정보를 한눈에!</span>
            </div>
          </a>
        </div>
      </div>
      <div className="Solution-Area">
        <div className="Solution-View">
          <div className="Solution-TextBox">
            <h1>공간별 솔루션</h1>
            <div className="Solution-Text">
              <div>
                <span> Bluy29에서 인기 많은 인테리어를 둘러보세요</span>
              </div>
              <a href="/market">
                <span className="more">더보기</span>
              </a>
            </div>
          </div>
        </div>
        <div className="Solution">
          <Slider {...settings1}>
            <div className="imgView">
              <img src={image.solution1} alt="bannerImage"></img>
              <div className="TextBox">
                <h2>주거공간</h2>
              </div>
            </div>
            <div className="imgView">
              <img src={image.solution2} alt="bannerImage"></img>
              <div className="TextBox">
                <h2>상업공간</h2>
              </div>
            </div>
            <div className="imgView">
              <img src={image.solution3} alt="bannerImage"></img>
              <div className="TextBox">
                <h2>기타공간</h2>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div>
        <div>
          <div className="Sns-View">
            <div className="Sns-TextBox">
              <h1>오늘의 인기게시물</h1>
              <div className="Sns-Text">
                <div>
                  <span> Bluy29에서 인기 많은 인테리어를 둘러보세요</span>
                </div>
                <a href="/sns">
                  <span className="more">더보기</span>
                </a>
              </div>
            </div>
            <div className="Object">
              <a href="/sns">
                <div>
                  <img src={image.sns_1}></img>
                </div>
              </a>
              <a href="/sns">
                <div>
                  <img src={image.sns_2}></img>
                </div>
              </a>
              <a href="/sns">
                <div>
                  <img src={image.sns_3}></img>
                </div>
              </a>
              <a href="/sns">
                <div>
                  <img src={image.sns_4}></img>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default MHome;
