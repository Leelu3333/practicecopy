import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      {/* logo */}
      <div className="logo">
        <a href="https://www.suisapet.com/">
          <img src="https://www.suisapet.com/images/logo.svg" alt="SUISA" />
        </a>
      </div>

      {/* 漢堡選單按鈕 */}
      {/* <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        &#9776;
      </div> */}

      {/* 導覽列 */}
      {/* <nav className={menuOpen ? "active" : ""}> */}
      <nav>
        <ul>
          <li>
            <a href="c.html">
              <span className="a">品牌故事</span>
              <span className="b">BRAND</span>
            </a>
          </li>
          <li>
            <a href="c.html">
              <span className="a">研發技術</span>
              <span className="b">TECHNOLOGY</span>
            </a>
          </li>
          <li>
            <a href="c.html">
              <span className="a">產品介紹</span>
              <span className="b">PRODUCTS</span>
            </a>
          </li>
          <li>
            <a href="c.html">
              <span className="a">文章專欄</span>
              <span className="b">ARTICLE</span>
            </a>
          </li>
          <li>
            <a href="c.html">
              <span className="a">購買據點</span>
              <span className="b">LOCATIONS</span>
            </a>
          </li>
          <li>
            <a href="c.html">
              <span className="a">聯絡我們</span>
              <span className="b">CONTACT</span>
            </a>
          </li>
        </ul>
      </nav>
      {/* 語言設定 & 銷售通路 */}
      <div className="languageandsales">
        {/* 語言設定 */}
        <div className="language">
          <label htmlFor="state">
            <div className="language-title">語言設定</div>
          </label>
          <input type="checkbox" id="state" hidden />
          <div className="language-content">
            <div className="language-ch">
              <p>繁體</p>
            </div>
            <div className="language-en">
              <p>英文</p>
            </div>
          </div>
        </div>

        {/* 銷售通路 */}
        <a href="#footer-area" className="sales">
          銷售通路
        </a>
      </div>
    </header>
  );
};

export default Header;
