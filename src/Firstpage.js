import React from "react";
import "./Firstpage.css";

const Firstpage = () => {
  return (
    <div>
      {/* 首頁內容 */}
      <div class="main-area">
        {/* 首頁文字 */}
        <div class="txt">
          {/* 標題 */}
          <div class="first-title">
            <p>YOU HOME's PET WELLNESS</p>
          </div>
          <div class="sec-title">
            <h1>
              讓SUISA成為
              <br />
              毛孩的居家獸醫師
              <br />-<br />
            </h1>
          </div>
          {/* 內容 */}
          <div class="content">
            <p>
              SUISA致力於打造居家獸醫理念，產品以安全、溫和成分為基礎，透過專業醫學配方設計，為毛孩提供安心、細心呵護的產品，讓毛孩享受更美好、舒適的生活。
            </p>
          </div>
          <br />
          <br />
          {/* 看更多按鈕 */}
          <button class="viewmore-button">View More </button>
        </div>
      </div>

      {/* 首頁介紹背景照片 */}
      <div class="banner">
        <img src=".//image/banner.jpg" alt="banner" />
        <div class="banner-bottom"></div>
      </div>
    </div>
  );
};

export default Firstpage;
