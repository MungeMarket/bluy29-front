import React, { useEffect } from "react";
import "../Styles/Home.css";
function Home() {
  const width = window.innerWidth;
  useEffect(() => {
    console.log(width);
  }, [window.innerWidth]);

  return (
    <div className="Home">
      <h1>Bluy29에 오신것을 환영합니다</h1>
      <h1>Bluy29에 오신것을 환영합니다</h1>
      <h1>Bluy29에 오신것을 환영합니다</h1>
      <h1>Bluy29에 오신것을 환영합니다</h1>
      <h1>Bluy29에 오신것을 환영합니다</h1>
      <h1>Bluy29에 오신것을 환영합니다</h1>
      <h1>Bluy29에 오신것을 환영합니다</h1>
      <h1>Bluy29에 오신것을 환영합니다</h1>
      <h1>Bluy29에 오신것을 환영합니다</h1>
      <h1>Bluy29에 오신것을 환영합니다</h1>
    </div>
  );
}

export default Home;
