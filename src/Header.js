import React, { useState, lazy, Suspense } from "react";
import "./Header.css";

const HeaderNav = lazy(() => import("./HeaderNav"));

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animateClass, setAnimateClass] = useState("");

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
      setAnimateClass("slide-down");
    } else {
      // 換成 slide-up，動畫結束再隱藏
      setAnimateClass("slide-up");
      setTimeout(() => {
        setMenuOpen(false);
      }, 400); // 跟動畫時間一致
    }
  };
  const closeMenu = () => setMenuOpen(false);

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
          <div className="menu-toggle" onClick={toggleMenu}>
            &#9776;
          </div>
        </div>
        {/* 懶載入的選單元件 */}
        {menuOpen && (
          <Suspense>
            <HeaderNav animateClass={animateClass} />
          </Suspense>
        )}
      </div>
    </header>
  );
};

export default Header;
