import React from "react";
import "../Styles/Footer.css";

function Footer() {
  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup"
  )
    return <div></div>;
  if (window.location.pathname === "/landmap") return <div></div>;
  return (
    <footer className="footer">
      <div className="footer-footer">
        <div>고객센터</div>
      </div>
    </footer>
  );
}

export default Footer;
