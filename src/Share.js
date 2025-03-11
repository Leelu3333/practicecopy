import React from "react";
import "./Share.css";

const Share = () => {
  return (
    <div>
      {/* 心得分享 */}
      <div class="share">
        {/* 標題 */}
        <div class="share-alltitle">
          <div class="share-back-title">SHARES</div>
          <div class="share-fort-title">
            <h2>心得分享</h2>
          </div>
        </div>
        {/* 內容 */}
        <div class="share-allcontect">
          <div class="share-contect">
            <div class="item">
              <div class="icon">
                <img src="./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg" alt="" />
              </div>
              <div class="txtbox">
                <div class="title">
                  <h3>心得分享</h3>
                </div>
                <br />
                <div class="txt">
                  <p>這裡是心得的字數區</p>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="icon">
                <img src="./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg" alt="" />
              </div>
              <div class="txtbox">
                <div class="title">
                  <h3>心得分享</h3>
                </div>
                <br />
                <div class="txt">
                  <p>
                    這裡是心得的字數區 Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Numquam voluptatum culpa laboriosam
                    maiores, repellendus delectus qui eum a minus dolorum!
                  </p>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="icon">
                <img src="./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg" alt="" />
              </div>
              <div class="txtbox">
                <div class="title">
                  <h3>心得分享</h3>
                </div>
                <br />
                <div class="txt">
                  <p>這裡是心得的字數區</p>
                </div>
              </div>
            </div>
          </div>
          {/* 點點 */}
          <div class="a"></div>
        </div>
      </div>
    </div>
  );
};

export default Share;
