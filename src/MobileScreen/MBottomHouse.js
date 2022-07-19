import "../Styles/MBottomHouse.css";
import "../Styles/Map.css";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { animated, useSpring, config } from "react-spring";
import { useDrag } from "react-use-gesture";

const MBottomHouse = ({ visibility, visibilityToggler, housings }) => {
  console.log("bottom housings : ", housings);
  const sheetRef = useRef();
  const SHEET_HEIGHT = useRef();

  const spring = useSpring(() => {
    return { minHeight: "0px", maxHeight: "0vh" };
  });
  const [{ minHeight, maxHeight }, setStyles] = spring;

  const close = (velocity = 0) => {
    visibilityToggler(false);
  };

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

      console.log(SHEET_HEIGHT.current);
      console.log({ props });
      console.log({ mx, my });

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

  const sheet = (
    <animated.div
      {...bind()}
      className="swipeable-bottom-sheet"
      style={{ minHeight, maxHeight, touchAction: "pan-x" }}
      ref={sheetRef}
    >
      <div className="container">
        <div className="line"></div>
        <div className="head">
          <p>이 지역 부동산 정보 &nbsp;</p>
          <p>{2}개</p>
        </div>
        {visibility && <form></form>}
      </div>
    </animated.div>
  );

  return ReactDOM.createPortal(sheet, document.getElementById("root"));
};

export default MBottomHouse;
