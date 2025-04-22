import React from "react";
import "./HeaderNav.css";

const HeaderNav = ({ animateClass }) => {
  return (
    <div className={`mobile-menu-container ${animateClass}`}>
      <div className="mobile-menu">
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
        </ul>
        <ul>
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
      </div>
    </div>
  );
};

export default HeaderNav;
