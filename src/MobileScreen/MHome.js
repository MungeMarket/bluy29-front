import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import image from "../libs/image";
import { NextArrow, PrevArrow } from "../Components/Arrow";

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
      <div className="slide">
        <Slider {...settings}>
          <div className="imgView">
            <img src={image.banner} alt="bannerImage"></img>
          </div>
        </Slider>
      </div>

      <div className="Main-Btn">
        <div>
          <img src={image.interior}></img>
        </div>
        <div>
          <img src={image.building}></img>
        </div>
      </div>
      <div className="Solution-Area">
        <div className="Solution-View">
          <div className="Solution-TextBox">
            <h1>공간별 솔루션</h1>
            <div className="Solution-Text">
              <span> Bluy29를 만나 180도 변신한 공간 보러가기</span>
              <span className="more">더보기</span>
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
                <span> Bluy29애서 인기 많은 인테리어를 둘러보세요</span>
                <span className="more">더보기</span>
              </div>
            </div>
            <div className="Object">
              <div>
                <img src={image.sns}></img>
              </div>
              <div>
                <img src={image.sns}></img>
              </div>
              <div>
                <img src={image.sns}></img>
              </div>
              <div>
                <img src={image.sns}></img>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default MHome;
