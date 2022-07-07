import React, { Fragment } from "react";
import "../Styles/ErrorPage.css";
import Media from "react-media";

function ErrorPage() {
  return (
    <div className="Error">
      <h1>현재 서비스 준비중입니다.</h1>
      <Media query="max-width: 900px" render={() => <p>I am small!</p>} />
    </div>
  );
}

export default ErrorPage;
