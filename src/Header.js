import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      {/* logo */}
      <div class="logo">
        <a href="https://www.suisapet.com/">
          <img src="https://www.suisapet.com/images/logo.svg" alt="SUISA" />
        </a>
      </div>
      {/* 導覽列 */}
      <nav>
        <ul>
          <li>
            <a href="c.html">
              <span class="a">品牌故事</span>
              <span class="b">BRAND</span>
            </a>
          </li>
          <li>
            <a href="c.html">
              <span class="a">研發技術</span>
              <span class="b">TECHNOLOGY</span>
            </a>
          </li>
          <li>
            <a href="c.html">
              <span class="a">產品介紹</span>
              <span class="b">PRODUCTS</span>
            </a>
          </li>
          <li>
            <a href="c.html">
              <span class="a">文章專欄</span>
              <span class="b">ARTICLE</span>
            </a>
          </li>
          <li>
            <a href="c.html">
              <span class="a">購買據點</span>
              <span class="b">LOCATIONS</span>
            </a>
          </li>
          <li>
            <a href="c.html">
              <span class="a">聯絡我們</span>
              <span class="b">CONTACT</span>
            </a>
          </li>
        </ul>
      </nav>
      {/* 導覽列中語言及銷售通路 */}
      <div class="languageandsales">
        <div class="language">
          <label for="state">
            <div class="language-title">語言設定</div>
          </label>
          <input type="checkbox" id="state" hidden />
          <div class="language-content">
            <div class="language-ch">
              <p>繁體</p>
            </div>
            <div class="language-en">
              <p>英文</p>
            </div>
          </div>
        </div>
        <a href="#footer-area" class="sales">
          銷售通路
        </a>
      </div>
    </header>
  );
};

export default Header;
