// import React, { useEffect, useRef, useState } from "react";
// import "../Styles/DropDown.css";

// export function DropdownContainer(props) {
//   const divRef = useRef(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState(props.default);
//   return (
//     <div className="select" default={props.default}>
//       <span onClick={() => setIsOpen(!isOpen)}>{selected}</span>

//       <CSSTransition
//         nodeRef={divRef}
//         in={isOpen}
//         unmountOnExit
//         timeout={300}
//         classNames="drop"
//       >
//         <DropdownList ref={divRef}>{props.children}</DropdownList>
//       </CSSTransition>
//     </div>
//   );
// }

// // ref는 하위 컴포넌트에 전달할 수 없어서 forwardRef를 사용함
// const DropdownList = React.forwardRef((props, ref) => {
//   return (
//     <ul ref={ref} className="dropdown-list">
//       {props.children}
//     </ul>
//   );
// });
