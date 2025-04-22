import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div id="footer-area" class="footer-area">
        <div class="footer-img"></div>
        {/* 上方資料 */}
        <div class="data-top">
          {/* logo */}
          <div class="footer-menu">
            <div class="logo">
              <a href="#">
                <img
                  src="https://www.suisapet.com/images/logo.svg"
                  alt="SUISA"
                />
              </a>
            </div>
            {/* 頁尾導覽列 */}
            <nav>
              <ul>
                <li>
                  <a href="#">
                    <span class="a">品牌故事</span>
                    <span class="b">BRAND</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="a">研發技術</span>
                    <span class="b">TECHNOLOGY</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="a">產品介紹</span>
                    <span class="b">PRODUCTS</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="a">文章專欄</span>
                    <span class="b">ARTICLE</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="a">購買據點</span>
                    <span class="b">LOCATIONS</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="a">聯絡我們</span>
                    <span class="b">CONTACT</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/* 中間資料 */}
        <div class="data-mid">
          <div class="mid-area">
            {/* 中間資料-左 */}
            <div class="leftbox">
              <ul>
                <li>
                  <div class="infotitle">聯絡我們</div>
                  <a href="#" target="_blank">
                    01-12345678
                  </a>
                </li>
                <li>
                  <div class="infotitle">聯絡信箱</div>
                  <a href="#" target="_blank">
                    1111111111111@gmail.com
                  </a>
                </li>
                <li>
                  <div class="infotitle">聯絡地址</div>
                  <a href="#" target="_blank">
                    1111111111111111111111111
                  </a>
                </li>
              </ul>
            </div>
            {/* 中間資料-右 */}
            <div class="rightbox">
              <div class="rightbox-title">銷售通路</div>
              <div class="databox"></div>
            </div>
          </div>
        </div>
        {/* 下方資料 */}
        <div class="data-bottom">
          {/* 下方資料-左 */}
          <div class="leftbox">
            <p>
              <span>© Copyright </span>
              <span class="year">2025</span>
              <span>SUISA</span>
              <span>All Rights Reserved.</span>
            </p>
            <p>
              <span>
                版權、著作權 所有 © 2025 SUISA 、愛貝斯，保留一切權利。
              </span>
            </p>
            <div class="ibestLink">
              <a href="#" target="_blank">
                Design
              </a>
              <span>by</span>
              <a href="#" target="_blank">
                Lu
              </a>
            </div>
          </div>
          {/* 下方資料-右 */}
          <div class="rightbox">
            <div class="vtBox">
              <span class="title">公司統編</span>
              <span class="txt">11111111</span>
            </div>
            <nav>
              <div class="socialTitle">FOLLOW US</div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
