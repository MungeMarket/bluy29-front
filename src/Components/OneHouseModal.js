import React from "react";
import Sheet from "react-modal-sheet";
import "../Styles/HouseModal.css";
import "../Styles/OneHouse.css";
import { FIND_ONE_HOUSE } from "../GraphQL/gqlList";
import { useQuery } from "@apollo/client";
import images from "../libs/image";
import { useEffect } from "react";
import { useState } from "react";
import image from "../libs/image";

export function OneHouseModal({ modalOpen, idx, onClose }) {
  const [isOpen, setOpen] = React.useState(false);

  let houseData;

  useEffect(() => {
    modalOpen ? setOpen(true) : setOpen(false);
  }, [modalOpen]);

  //Gql
  console.log(idx);
  const { data, loading, error } = useQuery(FIND_ONE_HOUSE, {
    variables: idx === false ? { idx: 0 } : { idx: idx },
  });

  if (data) {
    console.log("oneoneoneoneone", data.readOneHousing.housing);
    houseData = data.readOneHousing.housing;
    console.log("gql :", loading, error);
  }

  return (
    <>
      <Sheet
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
          console.log("im close");
          onClose(false);
        }}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            {
              <div className="oneHouse">
                {houseData === undefined || houseData === null ? (
                  <div>
                    <span> loading ...</span>
                  </div>
                ) : (
                  <>
                    <div className="imgBanner">
                      {console.log("are you here?", houseData)}

                      <img
                        src={
                          houseData.images.imageUrl
                            ? houseData.images.imageUrl
                            : images.solution1
                        }
                      ></img>
                    </div>
                    <div className="title">
                      <h3>{houseData.roomType.name}</h3>
                      <h1>
                        {houseData.rentType.name} {houseData.deposit / 10000}/
                        {houseData.monthly / 10000}
                      </h1>
                      <span>{houseData.addr}</span>
                      <p>{houseData.title}</p>
                    </div>

                    <div className="houseType">
                      <div>
                        <h3>구조</h3>
                        <span>{houseData.roomType.name}</span>
                      </div>
                      <div>
                        <h3>층</h3>
                        <span>{houseData.floor}층</span>
                      </div>
                      <div>
                        <h3>면적</h3>
                        <span>{houseData.realSize} m³</span>
                      </div>
                      <div>
                        <h3>관리비</h3>
                        <span>{houseData.manageFee / 10000} 만원</span>
                      </div>
                    </div>
                    <div className="detatil">
                      <div className="dstail-title">
                        <h1>상세정보</h1>
                      </div>
                      <div className="grid">
                        <div className="grid-grid">
                          <div>
                            <h3>월세</h3>
                          </div>
                          <div>
                            <span>
                              {houseData.deposit / 10000}/
                              {houseData.monthly / 10000}
                            </span>
                          </div>
                        </div>
                        <div className="grid-grid">
                          <div>
                            <h3>관리비</h3>
                          </div>
                          <div>
                            <span>매월 {houseData.manageFee / 10000} 만원</span>
                            <span>
                              {houseData.manageInclude.map((item, idx) => (
                                <span key={idx}>{item.management.name}, </span>
                              ))}
                            </span>
                          </div>
                        </div>
                        <div className="grid-grid">
                          <div></div>
                          <div>
                            <span>관리비 외 사용에 따라 부과</span>
                            <span>
                              {houseData.manageNotInclude.map((item, idx) => (
                                <span key={idx}>{item.management.name}, </span>
                              ))}
                            </span>
                          </div>
                        </div>
                        <div className="grid-grid">
                          <div>
                            <h3>주차</h3>
                          </div>
                          <div>
                            <span>
                              {parseInt(houseData.parkingArea) > 0
                                ? `가능 (주차비 ${
                                    houseData.parkingFee === null
                                      ? "무료"
                                      : houseData.parkingFee
                                  }) 세대당 ${houseData.parkingArea}대 가능`
                                : "불가능"}
                            </span>
                          </div>
                        </div>
                        <div className="grid-grid">
                          <div>
                            <h3>단기임대</h3>
                          </div>
                          <div>
                            <span>
                              {houseData.shortTerm ? "가능" : "불가능"}
                            </span>
                          </div>
                        </div>
                        <div className="grid-grid">
                          <div>
                            <h3>구조</h3>
                          </div>
                          <div>
                            <span>{houseData.roomType.name}</span>
                          </div>
                        </div>
                        <div className="grid-grid">
                          <div>
                            <h3>건물층</h3>
                          </div>
                          <div>
                            <span>{houseData.floor} 층</span>
                          </div>
                        </div>
                        <div className="grid-grid">
                          <div>
                            <h3>전용/공급면적</h3>
                          </div>
                          <div>
                            <span>
                              {houseData.areaSize}m³ / {houseData.areaSize}m³
                            </span>
                          </div>
                        </div>
                        <div className="grid-grid">
                          <div>
                            <h3>엘리베이터</h3>
                          </div>
                          <div>
                            <span>{houseData.elevator ? "있음" : "없음"}</span>
                          </div>
                        </div>
                        <div className="grid-grid">
                          <div>
                            <h3>주소</h3>
                          </div>
                          <div>
                            <span>{houseData.addr}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="map">위치</div>
                  </>
                )}
              </div>
            }
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
