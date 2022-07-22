import React from "react";
import Sheet from "react-modal-sheet";
import "../Styles/HouseModal.css";
import Dropdown from "react-dropdown";
import { FIND_IN_MAP_FOR_LIST } from "../GraphQL/gqlList";
import { useQuery } from "@apollo/client";
import images from "../libs/image";
import { OneHouseModal } from "./OneHouseModal";
import { useEffect } from "react";
import { useState } from "react";

export function HouseModal({ info }) {
  const [isOpen, setOpen] = React.useState(false);
  const [oneHouse, setOneHouse] = useState(false);
  const [houseIdx, setHouseIdx] = useState(false);

  //Gql
  const { data, loading, error } = useQuery(FIND_IN_MAP_FOR_LIST, {
    variables:
      info === null
        ? {
            swLat: 0,
            swLong: 0,
            neLat: 0,
            neLong: 0,
          }
        : {
            swLat: parseFloat(info.swLatLng.lat),
            swLong: parseFloat(info.swLatLng.lng),
            neLat: parseFloat(info.neLatLng.lat),
            neLong: parseFloat(info.neLatLng.lng),
            // swLat: 36.6032,
            // swLong: 127.5048,
            // neLat: 36.6325,
            // neLong: 127.5323,
          },
  });
  if (data) {
    console.log("datadatadata", data.readMapHousingForList.housings);
    console.log("gql :", loading, error);
  }

  // DropDown
  const options = ["추천순", "인기순", "월세 저렴한 순", "보증금 저렴한 순"];
  const defaultOption = options[0];
  const dropDownHandle = (event) => {
    console.log(event);
  };
  const onClose = (idx) => {
    setOneHouse(idx);
  };

  return (
    <>
      <div className="headBtn" onClick={() => setOpen(true)}>
        <p>이 지역 부동산 정보 &nbsp;</p>
        <p>{data ? data.readMapHousingForList.housings.length : 0}개</p>
      </div>

      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            {
              <div className="holeHouse">
                <div className="hide">
                  <div className="headBtn" onClick={() => setOpen(true)}>
                    <p>이 지역 부동산 정보 &nbsp;</p>
                    <p>
                      {data ? data.readMapHousingForList.housings.length : 0}개
                    </p>
                  </div>
                  <div className="filter-bar">
                    <div>
                      <Dropdown
                        className={"dropDown"}
                        options={options}
                        value={defaultOption}
                        onChange={dropDownHandle}
                        placeholder="Select an option"
                      />
                    </div>
                    <div className="option"> 필터</div>
                  </div>
                  {data && (
                    <div className="houseView">
                      {data.readMapHousingForList.housings.map((house, idx) => (
                        <form
                          className="house"
                          key={idx}
                          onClick={() => {
                            setOneHouse(true);
                            setHouseIdx(house.idx);
                          }}
                        >
                          <div className="imgView">
                            {house.images.length > 0 &&
                              console.log("img : ", house.images[0].imageUrl)}
                            <img
                              src={
                                house.images.length > 0
                                  ? house.images[0].imageUrl
                                  : images.solution1
                              }
                              className="img"
                            ></img>
                          </div>
                          <div className="info">
                            <h2>{house.roomType.name}</h2>
                            <h1>
                              {house.rentType.name}{" "}
                              {house.deposite ? house.deposite : 2000}/
                              {house.monthly / 10000}
                            </h1>
                            <p>
                              {house.addr.length > 9
                                ? house.addr.substr(0, 8) + "..."
                                : house.addr}
                            </p>
                            <p>
                              {house.realSize}, {house.floor}, 관리비
                              {house.manageFee}원
                            </p>
                            <span>{house.title}</span>
                            {/* <div>
                              {options.map((option, idx) => (
                                <span key={idx}>{option.name}</span>
                              ))}
                            </div> */}
                          </div>
                          <div></div>
                        </form>
                      ))}
                    </div>
                  )}
                </div>
                <OneHouseModal
                  modalOpen={oneHouse}
                  idx={houseIdx}
                  onClose={onClose}
                />
              </div>
            }
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
