import React from "react";
import "./AboutSuisa.css";

const AboutSuisa = () => {
  return (
    <div>
      {/* 關於SUISA */}
      <div class="about-SUISA">
        <div class="databox">
          {/* 左邊的圖片 */}
          <div class="databox-left">
            <img src="./image/about_img01__24A30EjyBs.jpg" alt="" />
          </div>
          {/* 中間的文字 */}
          <div class="databox-mid">
            <div class="about-txt">
              {/* 標題兩個重疊 */}
              <div class="about-txt-back-title">ABOUT US</div>
              <div class="about-txt-fort-title">
                <h2>關於SUISA</h2>
              </div>
              {/* 小標題&英文 */}
              <div class="about-txt-first-title">
                <h3>毛孩的居家獸醫師，守護你對毛孩的愛</h3>
              </div>
              <div class="about-txt-sec-title">
                LOOK AFTER YOUR PETS AS YOUR OWN SUISA
              </div>
              {/* 內容 */}
              <div class="about-txt-content">
                <p>
                  SUISA希望打造一個居家獸醫的概念；透過SUISA使得毛爸媽可以在家幫助毛孩進行第一線的照護及保養，進而減輕毛爸媽的負擔。
                </p>
                <br />
                <p>
                  我們的產品設計旨在提供給毛孩最安全、最溫和的照顧，
                  營造一個讓人安心、信任、且充滿愛的家。
                  SUISA不僅僅是一個品牌，我們希望透過SUISA的產品，
                  讓毛孩感受到毛孩爸媽對他們的愛與呵護， 使生活更加美好和舒適。
                </p>
              </div>
              {/* 看更多按鈕 */}
              <div class="button">
                <button class="viewmore-button">View More </button>
              </div>
            </div>
          </div>
          {/* 右邊的圖片 */}
          <div class="databox-right">
            <img src="./image/about_img02__24A30J0IrU.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSuisa;
