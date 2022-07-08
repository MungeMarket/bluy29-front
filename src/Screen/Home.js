import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import image from "../libs/image";
import { NextArrow, PrevArrow } from "../Components/Arrow";
import Media from "react-media";

// Import css files
import "../Styles/Home.css";
import "../Styles/MHome.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MHome from "../MobileScreen/MHome";

function Home() {
  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(window.innerWidth);
    console.log(window.innerWidth);
    if (width < 550) {
      console.log("mobile");
    }
  }, [window.innerWidth]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    useCss: false,
  };
  return (
    <div className="Home">
      <MHome />
      <div className="HomeView">
        <div className="Banner">
          <Slider {...settings}>
            <div className="imgView">
              <img src={image.banner} alt="bannerImage"></img>
            </div>
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
          <div className="BtnBox">
            <a href="/market">
              <img className="BoxImg" src={image.interior}></img>
              <div className="TextBox">
                <div>
                  <h1>펫 인테리어 </h1>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp; </span>
                  <img
                    src={image.hlaf_arrow}
                    width="40px"
                    height={"15px"}
                  ></img>
                </div>
                <span>우리집 반려동물과 오래오래 함께 사는 방법</span>
              </div>
            </a>
          </div>

          <div className="BtnBox">
            <a href="/landmap">
              <img className="BoxImg" src={image.building}></img>
              <div className="TextBox">
                <div>
                  <h1>부동산 정보</h1>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp; </span>
                  <img
                    src={image.hlaf_arrow}
                    width="40px"
                    height={"15px"}
                  ></img>
                </div>
                <span>반려동물 입주 가능 부동산 정보를 한눈에!</span>
              </div>
            </a>
          </div>
        </div>

        <div className="Solution-Area">
          <h1>공간별 솔루션</h1>
          <div className="TextBox">
            <span> Bluy29를 만나 180도 변신한 공간 보러가기</span>
            <span className="more">더보기 {">"}</span>
          </div>
          <div className="Solution">
            <div className="SolutionBox">
              <a href="/market">
                <img className="BoxImg" src={image.solution1}></img>
                <div className="TextBox">
                  <h2>주거공간</h2>
                </div>
              </a>
            </div>
            <div className="SolutionBox">
              <a href="/market">
                <img className="BoxImg" src={image.solution2}></img>
                <div className="TextBox">
                  <h2>상업공간</h2>
                </div>
              </a>
            </div>
            <div className="SolutionBox">
              <a href="/market">
                <img className="BoxImg" src={image.solution3}></img>
                <div className="TextBox">
                  <h2>기타공간</h2>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="SNS-Area">
          <h1>오늘의 인기게시물</h1>
          <div className="TextBox">
            <span> Bluy29에서 인기 많은 인테리어를 둘러보세요</span>
            <span className="more">더보기 {">"}</span>
          </div>
          <div className="Object">
            <div className="ObjectBox">
              <img className="BoxImg" src={image.sns_1}></img>
              <div className="TextBox">
                <h2>Love****</h2>
              </div>
              <div className="PopBox">
                <img className="BoxImg" src={image.snsflag}></img>
                <h2>A_Lon****</h2>
              </div>
            </div>
            <div className="ObjectBox">
              <img className="BoxImg" src={image.sns_2}></img>
              <div className="TextBox">
                <h2>Easy****</h2>
              </div>
              <div className="PopBox">
                <img className="BoxImg" src={image.snsflag}></img>
                <h2>2</h2>
              </div>
            </div>
            <div className="ObjectBox">
              <img className="BoxImg" src={image.sns_3}></img>
              <div className="TextBox">
                <h2>blue****</h2>
              </div>
              <div className="PopBox">
                <img className="BoxImg" src={image.snsflag}></img>
                <h2>3</h2>
              </div>
            </div>
            <div className="ObjectBox">
              <img className="BoxImg" src={image.sns_4}></img>
              <div className="TextBox">
                <h2>cheo****</h2>
              </div>
              <div className="PopBox">
                <h2>1</h2>
              </div>
            </div>
            <div className="ObjectBox">
              <img className="BoxImg" src={image.sns_5}></img>
              <div className="TextBox">
                <h2>actu****</h2>
              </div>
              <div className="PopBox">
                <h2>1</h2>
              </div>
            </div>
            <div className="ObjectBox">
              <img className="BoxImg" src={image.sns_6}></img>
              <div className="TextBox">
                <h2>b__a****</h2>
              </div>
              <div className="PopBox">
                <h2>1</h2>
              </div>
            </div>
            <div className="ObjectBox">
              <img className="BoxImg" src={image.sns_7}></img>
              <div className="TextBox">
                <h2>acce****</h2>
              </div>
              <div className="PopBox">
                <h2>1</h2>
              </div>
            </div>
            <div className="ObjectBox">
              <img className="BoxImg" src={image.sns_8}></img>
              <div className="TextBox">
                <h2>song****</h2>
              </div>
              <div className="PopBox">
                <h2>1</h2>
              </div>
            </div>
            {/* <div className="ObjectBox">
              <img className="BoxImg" src={image.sns}></img>
              <div className="TextBox">
                <h2>Bluy29</h2>
              </div>
              <div className="PopBox">
                <h2>1</h2>
              </div>
            </div>
            <div className="ObjectBox">
              <img className="BoxImg" src={image.sns}></img>
              <div className="TextBox">
                <h2>Bluy29</h2>
              </div>
              <div className="PopBox">
                <h2>1</h2>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
