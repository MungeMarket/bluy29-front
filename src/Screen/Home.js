import React, { useEffect } from "react";
import Slider from "react-slick";
import image from "../libs/image";
import { NextArrow, PrevArrow } from "../Components/Arrow";

// Import css files
import "../Styles/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const width = window.innerWidth;
  useEffect(() => {
    console.log(width);
  }, [window.innerWidth]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className="Home">
      <div className="Banner">
        <Slider {...settings}>
          <img src={image.one} alt="bannerImage"></img>
          <img src={image.two} alt="bannerImage"></img>
          <img src={image.three} alt="bannerImage"></img>
          <img src={image.four} alt="bannerImage"></img>
          <img src={image.five} alt="bannerImage"></img>
          <img src={image.six} alt="bannerImage"></img>
        </Slider>
        <div className="bottom">
          <div className="btn">
            <div>
              <span>고객센터</span>
            </div>
            <div>
              <span>시공문의</span>
            </div>
            <div>
              <span>오늘의 이벤트</span>
            </div>
            <div>
              <span>셀프 시공 가이드</span>
            </div>
          </div>
        </div>
      </div>
      <div className="main-Btn">
        <div></div>
        <div></div>
      </div>
      <div className="Solution-Area">
        <title>공간별 솔루션</title>
        <span> Bluy29를 만나 180도 변신한 공간 보러가기</span>
        <div>
          <div></div>
        </div>
      </div>
      <div>오늘의 SNS</div>
    </div>
  );
}

export default Home;
