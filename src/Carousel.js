import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";

// 顏色陣列
const colors = [
  "#FF0000", // 紅色
  "#FFA500", // 橙色
  "#FFFF00", // 黃色
  "#008000", // 綠色
  "#0000FF", // 藍色
  "#800080", // 紫色
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1.8); // 初始設為 1.8 以顯示中間的內容
  const [slides, setSlides] = useState([]);
  const [slideWidth, setSlideWidth] = useState(319); // 用於存儲色塊的寬度，固定為 319px
  const carouselWrapperRef = useRef(null); // 參考容器
  const margin = 25; // 每個色塊的左右間距
  const [isTransitioning, setIsTransitioning] = useState(true); // 控制動畫是否開啟

  useEffect(() => {
    // 複製並插入第一個和最後一個顏色塊
    const clonedSlides = [
      colors[colors.length - 2], // 複製最後一個
      colors[colors.length - 1], // 複製最後一個
      ...colors, // 原本顏色數組
      colors[0], // 複製第一個
      colors[1],
      colors[2],
      colors[3],
    ];
    setSlides(clonedSlides);
  }, []);

  // 控制動畫過渡
  const getTransformStyle = () => {
    return {
      transition: isTransitioning ? "transform 0.5s ease" : "none", // 根據 isTransitioning 控制動畫開關
      transform: `translateX(-${currentIndex * (slideWidth + 2 * margin)}px)`, // 根據色塊寬度和間距來平移
    };
  };

  // 按下上一個按鈕時
  const goToPrevious = () => {
    if (currentIndex <= 1.8) {
      // 1. 先正常動畫到 0
      setIsTransitioning(true);
      setCurrentIndex(0.8); // 讓動畫走到 0

      // 2. 停止動畫，並跳轉到倒數第二個色塊
      setTimeout(() => {
        setIsTransitioning(false); // 關閉過渡效果
        setCurrentIndex(slides.length - 6 + 0.8); // 跳到倒數第 2 個
      }, 500); // 停止動畫的時間長度，與動畫過渡時間相等

      // 3. 延遲後重新開啟過渡
      setTimeout(() => {
        setIsTransitioning(true); // 開啟動畫過渡
      }, 600); // 重新開啟動畫的延遲時間（稍微長於 500ms 來確保狀態更新）
    } else {
      // 如果不是在 1，直接上一頁
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // 按下下一個按鈕時
  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex == 6.8) {
        setIsTransitioning(true);
        setCurrentIndex(7.8); // 讓動畫走到 0

        setTimeout(() => {
          setIsTransitioning(false); // 關閉過渡效果
          setCurrentIndex(1.8); // 跳到倒數第 2 個
        }, 500); // 停止動畫的時間長度，與動畫過渡時間相等

        // 3. 延遲後重新開啟過渡
        setTimeout(() => {
          setIsTransitioning(true); // 開啟動畫過渡
        }, 600); // 重新開啟動畫的延遲時間（稍微長於 500ms 來確保狀態更新）
      } else {
        return prevIndex + 1;
      }
    });
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper" ref={carouselWrapperRef}>
        <div
          className="carousel-slides"
          style={getTransformStyle()} // 使用 getTransformStyle 來決定是否開啟動畫
        >
          {slides.map((color, index) => (
            <div
              key={index}
              className="carousel-slide"
              style={{
                backgroundColor: color,
                width: `${slideWidth}px`, // 設置動態計算的寬度
                margin: `0 ${margin}px`, // 每個色塊的左右間距
              }}
            >
              {index}
            </div>
          ))}
        </div>
        <button
          onClick={goToPrevious}
          className="carousel-button carousel-button-left"
        >
          ◀
        </button>
        <button
          onClick={goToNext}
          className="carousel-button carousel-button-right"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Carousel;
