import React from "react";
import Slider from "react-slick";
import image from "../libs/image";
import { NextArrow, PrevArrow } from "../Components/Arrow";

// Import css files
import "../Styles/Market.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MMarket() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnDotsHover: true,
    nextArrow: <NextArrow className="nextArrow" />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div>
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
  };
  return (
    <div className="Market">
      <div className="Banner">
        <Slider {...settings}>
          <div>
            <img src={image.one} alt="bannerImage"></img>
          </div>
          <div>
            <img src={image.two} alt="bannerImage"></img>
          </div>
          <div>
            <img src={image.three} alt="bannerImage"></img>
          </div>
          <div>
            <img src={image.four} alt="bannerImage"></img>
          </div>
          <div>
            <img src={image.five} alt="bannerImage"></img>
          </div>
          <div>
            <img src={image.six} alt="bannerImage"></img>
          </div>
        </Slider>
      </div>
      <div className="eventCategori">
        <div className="eventCategori-View">
          <div>키친핫세일</div>
          <div>가구 초특가</div>
          <div>리퍼 마켓</div>
          <div>프리미엄</div>
          <div>생필품</div>
          <div>주말특가</div>
          <div>신상특가</div>
          <div>유아동</div>
          <div>반려동물</div>
          <div>캠핑용품</div>
        </div>
      </div>
      <div className="recommandDeal">
        <div className="recommandDeal-View">
          <div className="head">
            <span>오늘의 딜</span>
            <a href="/">더보기</a>
          </div>
          <div className="product">
            <div className="product-model">
              <div className="img">
                <img src={image.cuteDuck} alt="product"></img>
              </div>
              <span>귀여운오리</span>
              <div className="detail">
                <span>
                  1+1 이벤트 중이니까 많이많이 구매해주세요1+1 이벤트 중이니까
                  많이많이 구매해주세요
                </span>
              </div>
              <div className="price">
                <span>33%</span>
                <span>240,000</span>
              </div>
              <div>별점, 리뷰</div>
            </div>

            <div className="product-model">
              <div className="img">
                <img src={image.fishbowl} alt="product"></img>
              </div>
              <span>귀여운오리</span>
              <div className="detail">
                <span>
                  1+1 이벤트 중이니까 많이많이 구매해주세요1+1 이벤트 중이니까
                  많이많이 구매해주세요
                </span>
              </div>
              <div className="price">
                <span>33%</span>
                <span>240,000</span>
              </div>
              <div>별점, 리뷰</div>
            </div>

            <div className="product-model">
              <div className="img">
                <img src={image.cuteDuck} alt="product"></img>
              </div>
              <span>귀여운오리</span>
              <div className="detail">
                <span>
                  1+1 이벤트 중이니까 많이많이 구매해주세요1+1 이벤트 중이니까
                  많이많이 구매해주세요
                </span>
              </div>
              <div className="price">
                <span>33%</span>
                <span>240,000</span>
              </div>
              <div>별점, 리뷰</div>
            </div>

            <div className="product-model">
              <div className="img">
                <img src={image.fishbowl} alt="product"></img>
              </div>
              <span>귀여운오리</span>
              <div className="detail">
                <span>
                  1+1 이벤트 중이니까 많이많이 구매해주세요1+1 이벤트 중이니까
                  많이많이 구매해주세요
                </span>
              </div>
              <div className="price">
                <span>33%</span>
                <span>240,000</span>
              </div>
              <div>별점, 리뷰</div>
            </div>
          </div>
        </div>
      </div>
      <div className="recommandDeal">
        <div className="recommandDeal-View">
          <div className="head">
            <span>블루이29 상품</span>
            <a href="/">더보기</a>
          </div>
          <div className="product">
            <div className="product-model">
              <div className="img">
                <img src={image.cuteDuck} alt="product"></img>
              </div>
              <span>귀여운오리</span>
              <div className="detail">
                <span>
                  1+1 이벤트 중이니까 많이많이 구매해주세요1+1 이벤트 중이니까
                  많이많이 구매해주세요
                </span>
              </div>
              <div className="price">
                <span>33%</span>
                <span>240,000</span>
              </div>
              <div>별점, 리뷰</div>
            </div>

            <div className="product-model">
              <div className="img">
                <img src={image.fishbowl} alt="product"></img>
              </div>
              <span>귀여운오리</span>
              <div className="detail">
                <span>
                  1+1 이벤트 중이니까 많이많이 구매해주세요1+1 이벤트 중이니까
                  많이많이 구매해주세요
                </span>
              </div>
              <div className="price">
                <span>33%</span>
                <span>240,000</span>
              </div>
              <div>별점, 리뷰</div>
            </div>

            <div className="product-model">
              <div className="img">
                <img src={image.cuteDuck} alt="product"></img>
              </div>
              <span>귀여운오리</span>
              <div className="detail">
                <span>
                  1+1 이벤트 중이니까 많이많이 구매해주세요1+1 이벤트 중이니까
                  많이많이 구매해주세요
                </span>
              </div>
              <div className="price">
                <span>33%</span>
                <span>240,000</span>
              </div>
              <div>별점, 리뷰</div>
            </div>

            <div className="product-model">
              <div className="img">
                <img src={image.fishbowl} alt="product"></img>
              </div>
              <span>귀여운오리</span>
              <div className="detail">
                <span>
                  1+1 이벤트 중이니까 많이많이 구매해주세요1+1 이벤트 중이니까
                  많이많이 구매해주세요
                </span>
              </div>
              <div className="price">
                <span>33%</span>
                <span>240,000</span>
              </div>
              <div>별점, 리뷰</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MMarket;
