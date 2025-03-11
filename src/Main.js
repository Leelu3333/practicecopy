import React, { useState, useEffect, useRef } from "react";
import "./Main.css";

const newsData = [
  {
    title: "第1篇新聞",
    txt: "第1篇新聞的內容",
    img: "./image/jason-leung-cwhtQIssH9k-unsplash__24G09bkeO6.jpg",
  },
  {
    title: "第2篇新聞",
    txt: "第2篇新聞的內容",
    img: "./image/jason-leung-cwhtQIssH9k-unsplash__24G09bkeO6.jpg",
  },
  {
    title: "第3篇新聞",
    txt: "第3篇新聞的內容",
    img: "./image/jason-leung-cwhtQIssH9k-unsplash__24G09bkeO6.jpg",
  },
  {
    title: "第4篇新聞",
    txt: "第4篇新聞的內容",
    img: "./image/jason-leung-cwhtQIssH9k-unsplash__24G09bkeO6.jpg",
  },
  {
    title: "第5篇新聞",
    txt: "第5篇新聞的內容",
    img: "./image/jason-leung-cwhtQIssH9k-unsplash__24G09bkeO6.jpg",
  },
  {
    title: "第6篇新聞",
    txt: "第6篇新聞的內容",
    img: "./image/jason-leung-cwhtQIssH9k-unsplash__24G09bkeO6.jpg",
  },
];

const Main = () => {
  const [slides, setSlides] = useState([]); // 新陣列
  const [currentIndex, setCurrentIndex] = useState(1.7); // 初始
  const [slideWidth, setSlideWidth] = useState(430); // 用於存儲色塊的寬度，固定為 319px
  const margin = 20; // 每個色塊的左右間距
  const carouselWrapperRef = useRef(null); // 參考容器
  const [isTransitioning, setIsTransitioning] = useState(true); // 控制動畫是否開啟
  const intervalRef = useRef(null); // 用來存儲 intervalID

  useEffect(() => {
    // 複製並插入第一個和最後一個顏色塊
    const clonedSlides = [
      newsData[newsData.length - 2], // 複製倒數第二個
      newsData[newsData.length - 1], // 複製最後一個
      ...newsData, // 原本的產品資料
      newsData[0], // 複製第一個
      newsData[1], // 複製第二個
      newsData[2], // 複製第三個
      newsData[3], // 複製第四個
    ];
    setSlides(clonedSlides);
    // 自動輪播邏輯
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000); // 每 5 秒自動切換

    return () => {
      clearInterval(intervalRef.current); // 清理定時器
    };
  }, []);

  const getTransformStyle = () => {
    return {
      transition: isTransitioning ? "transform 0.5s ease" : "none", // 根據 isTransitioning 控制動畫開關
      transform: `translateX(-${currentIndex * (slideWidth + 2 * margin)}px)`, // 根據色塊寬度和間距來平移
    };
  };

  const goToPrevious = () => {
    if (currentIndex <= 1.7) {
      // 1. 先正常動畫到 0
      setIsTransitioning(true);
      setCurrentIndex(0.7); // 讓動畫走到 0

      // 2. 停止動畫，並跳轉到倒數第二個色塊
      setTimeout(() => {
        setIsTransitioning(false); // 關閉過渡效果
        setCurrentIndex(slides.length - 6 + 0.7); // 跳到倒數第 2 個
      }, 500); // 停止動畫的時間長度，與動畫過渡時間相等

      // 3. 延遲後重新開啟過渡
      setTimeout(() => {
        setIsTransitioning(true); // 開啟動畫過渡
      }, 600); // 重新開啟動畫的延遲時間（稍微長於 500ms 來確保狀態更新）
    } else {
      // 如果不是在 1，直接上一頁
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
    // 停止自動播放並重新計時
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000); // 每 5 秒自動切換
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 6.7) {
        setIsTransitioning(true);
        setCurrentIndex(7.7); // 讓動畫走到 0

        setTimeout(() => {
          setIsTransitioning(false); // 關閉過渡效果
          setCurrentIndex(1.7); // 跳到倒數第 2 個
        }, 500); // 停止動畫的時間長度，與動畫過渡時間相等

        // 3. 延遲後重新開啟過渡
        setTimeout(() => {
          setIsTransitioning(true); // 開啟動畫過渡
        }, 600); // 重新開啟動畫的延遲時間（稍微長於 500ms 來確保狀態更新）
      } else {
        return prevIndex + 1;
      }
    });
    // 停止自動播放並重新計時
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000); // 每 5 秒自動切換
  };

  const calculateProgress = () => {
    if (currentIndex === 0.7) return 6; // 當 currentIndex 為 0 時顯示 6
    if (currentIndex === 7.7) return 1; // 當 currentIndex 為 7 時顯示 1
    return ((currentIndex - 1.7) / (slides.length / 2 - 1)) * 6; // 計算進度條的值，從 6 減少到 1
  };

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current); // 停止自動輪播
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000); // 重新開始自動輪播
  };

  return (
    <main>
      {/* 品牌動態文章 */}
      <div className="brand-news">
        {/* 標題 */}
        <div className="brand-news-title">
          <div className="brand-news-tit">
            <div className="brand-news-back-title">ARTICLE</div>
            <div className="brand-news-fort-title">
              <h2>品牌動態文章</h2>
              <div className="footline">
                <div className="line"></div>
                <div className="foot"></div>
              </div>
            </div>
          </div>
          <div className="button">
            <button className="viewmore-button">View More</button>
          </div>
        </div>
        {/* 內容 */}
        <div className="brand-news-allcontect">
          <div className="brand-news-contect" ref={carouselWrapperRef}>
            <div
              className="brand-news-txtbox"
              style={getTransformStyle()}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {slides.map((newItem, index) => (
                <div
                  key={index}
                  className="item"
                  style={{
                    width: `${slideWidth}px`, // 設置動態計算的寬度
                    margin: `0 ${margin}px`, // 每個色塊的左右間距
                  }}
                >
                  <div className="brand-news-contect-first-title">知識文章</div>
                  <div className="brand-news-contect-sec-title">
                    <h3>{newItem.title}</h3>
                  </div>
                  <div className="brand-news-contect-txt">
                    <p>{newItem.txt}</p>
                  </div>
                  <div
                    className="image-box"
                    style={{ width: `${slideWidth}px` }}
                  >
                    <div className="image-background"></div>
                    <div className="icon" style={{ width: `${slideWidth}px` }}>
                      <img src={newItem.img} alt="" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="a">
              {/* 按鈕 */}
              <div className="pagebutton">
                <button onClick={goToPrevious} className="probtn">
                  <span>{"<"}</span>
                </button>
                <button onClick={goToNext} className="nextbtn">
                  <span>{">"}</span>
                </button>
              </div>

              {/* 進度條 */}
              <progress value={calculateProgress()} max="6"></progress>

              {/* 顯示當前項目和總項目數 */}
              <div className="page-number">
                <span>
                  {currentIndex === 0.7
                    ? 6
                    : currentIndex === 7.7
                    ? 1
                    : Math.floor(currentIndex)}
                </span>{" "}
                {/* 根據 currentIndex 顯示數字 */}
                <span>/</span>
                <br></br>
                <span>{Math.floor(slides.length / 2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
