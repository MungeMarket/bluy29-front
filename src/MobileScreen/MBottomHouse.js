import "../Styles/MBottomHouse.css";
import "../Styles/Map.css";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { animated, useSpring, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { FIND_IN_MAP_FOR_LIST } from "../GraphQL/gqlList";
import { useQuery } from "@apollo/client";

const MBottomHouse = ({ visibility, visibilityToggler, info }) => {
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
            // swLat: parseFloat(info.swLatLng.lat),
            // swLong: parseFloat(info.swLatLng.lng),
            // neLat: parseFloat(info.neLatLng.lat),
            // neLong: parseFloat(info.neLatLng.lng),
            swLat: 36.6032,
            swLong: 127.5048,
            neLat: 36.6325,
            neLong: 127.5323,
          },
  });

  if (data) {
    console.log("datadatadata", data.readMapHousingForList.housings);
    console.log("gql :", loading, error);
  }
  const sheetRef = useRef();
  const SHEET_HEIGHT = useRef();
  const toggleSwipeable = () => {
    console.log("Toggle visibility");
    console.log(visibility);
    visibility = !visibility;
    visibilityToggler(visibility);
  };

  const spring = useSpring(() => {
    return { minHeight: "0px", maxHeight: "0vh" };
  });
  const [{ minHeight, maxHeight }, setStyles] = spring;

  const close = (velocity = 0) => {
    visibilityToggler(false);
  };
  const options = ["one", "two", "three", "four"];
  const defaultOption = options[0];
  const bind = useDrag(
    (props) => {
      const {
        first,
        last,
        cancel,
        movement: [mx, my],
      } = props;

      const update = (reset) =>
        setStyles({
          minHeight: `${
            reset ? SHEET_HEIGHT.current : SHEET_HEIGHT.current - my
          }px`,
          maxHeight: "0",
          immediate: false,
          config: config.stiff,
        });

      // console.log(SHEET_HEIGHT.current);
      // console.log({ props });
      // console.log({ mx, my });

      // if this is the first frame, set the initial height of the bottom sheet
      if (first) {
        SHEET_HEIGHT.current = sheetRef.current.offsetHeight;
      }

      // dont allow the user to keep dragging up
      if (my < -70) {
        cancel();
      }

      if (last) {
        console.log({ last });
        const threshold = (my * 100) / SHEET_HEIGHT.current / 100;
        console.log({ threshold });

        threshold >= 0.4 ? close() : update(true);
      } else {
        update();
      }
    },
    { axis: "y" }
  );

  useEffect(() => {
    if (visibility) {
      setStyles({
        minHeight: "500px",
        maxHeight: "90vh",
        height: "80%",
        config: config.stiff,
      });
    } else {
      setStyles({
        minHeight: "50px",
        maxHeight: "10vh",
        config: {
          tension: 500,
          friction: 40,
        },
      });
    }
  }, [visibility, setStyles]);
  const dropDownHandle = (event) => {
    console.log(event);
  };
  const sheet = (
    <animated.div
      {...bind()}
      className="swipeable-bottom-sheet"
      style={{ minHeight, maxHeight, touchAction: "pan-x" }}
      ref={sheetRef}
    >
      <div className="container">
        <div className="line"></div>
        <div className="head" onClick={toggleSwipeable}>
          <p>이 지역 부동산 정보 &nbsp;</p>
          <p>{2}개</p>
        </div>
        {visibility && (
          <form className="holeHouse">
            <div className="hide">
              <div className="filter-bar">
                <div>
                  <Dropdown
                    options={options}
                    value={defaultOption}
                    onChange={dropDownHandle}
                    placeholder="Select an option"
                  />
                </div>
                <div> 필터</div>
              </div>
              {data && (
                <div className="houseView">
                  {data.readMapHousingForList.housings.map((house, idx) => (
                    <form className="house" key={idx}>
                      <div className="img"></div>
                      <div className="info">
                        <span>{house.title}</span>
                        <span>{house.manageFee}</span>
                        <span>{house.idx}</span>
                        <span>{house.realSize}</span>
                        <span>{house.title}</span>
                      </div>
                      <div></div>
                    </form>
                  ))}
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </animated.div>
  );

  return ReactDOM.createPortal(sheet, document.getElementById("root"));
};

export default MBottomHouse;
