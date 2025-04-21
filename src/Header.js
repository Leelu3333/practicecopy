import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (menuOpen && menuData.length === 0) {
      // 模擬 AJAX 載入（可以改成 fetch 實際 API）
      setTimeout(() => {
        setMenuData([
          { zh: "品牌故事", en: "BRAND", href: "c.html" },
          { zh: "研發技術", en: "TECHNOLOGY", href: "c.html" },
          { zh: "產品介紹", en: "PRODUCTS", href: "c.html" },
          { zh: "文章專欄", en: "ARTICLE", href: "c.html" },
          { zh: "購買據點", en: "LOCATIONS", href: "c.html" },
          { zh: "聯絡我們", en: "CONTACT", href: "c.html" },
        ]);
      }, 500); // 模擬 loading
    }
  }, [menuOpen]);

  return (
    <header>
      <div className="desktop">
        {/* logo */}
        <div className="logo">
          <a href="https://www.suisapet.com/">
            <img src="https://www.suisapet.com/images/logo.svg" alt="SUISA" />
          </a>
        </div>
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
            <label htmlFor="state-desktop">
              <div className="language-title">語言設定</div>
            </label>
            <input type="checkbox" id="state-desktop" hidden />
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
      </div>
      <div className="moblie">
        {/* logo */}
        <div className="leftbox">
          <div className="logo">
            <a href="https://www.suisapet.com/">
              <img src="https://www.suisapet.com/images/logo.svg" alt="SUISA" />
            </a>
          </div>
          {/* 語言設定 */}
          <div className="language">
            <label htmlFor="state-mobile">
              <div className="language-title">語言設定</div>
            </label>
            <input type="checkbox" id="state-mobile" hidden />
            <div className="language-content">
              <div className="language-ch">
                <p>繁體</p>
              </div>
              <div className="language-en">
                <p>英文</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rightbox">
          {/* 漢堡選單按鈕 */}
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            &#9776;
          </div>

          {/* 導覽列 */}
          <nav className={menuOpen ? "active" : ""}>
            {menuOpen && menuData.length > 0 ? (
              <ul>
                {menuData.map((item, i) => (
                  <li key={i}>
                    <a href={item.href} onClick={() => setMenuOpen(false)}>
                      <span className="a">{item.zh}</span>
                      <span className="b">{item.en}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : menuOpen ? (
              <div className="loading">載入中...</div>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
