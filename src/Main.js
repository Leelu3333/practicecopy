import React, { useState, useEffect, useRef } from "react";
import "./Main.css";

// 新聞資料
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
  const carouselWrapperRef = useRef(null); // 參考容器
  const [isTransitioning, setIsTransitioning] = useState(true); // 控制動畫是否開啟
  const intervalRef = useRef(null); // 用來存儲 intervalID
  const divRef = useRef(null);
  const [elementWidth, setElementWidth] = useState(0);
  const [elementMargin, setElementMargin] = useState(0);

  useEffect(() => {
    const clonedSlides = [
      // 新陣列因為必須符合自動輪播視覺
      newsData[newsData.length - 2], // 複製倒數第二個
      newsData[newsData.length - 1], // 複製最後一個
      ...newsData, // 原本的產品資料
      newsData[0], // 複製第一個
      newsData[1], // 複製第二個
      newsData[2], // 複製第三個
      newsData[3], // 複製第四個
    ];
    setSlides(clonedSlides);
    // 自動輪播
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000); // 每 5 秒自動切換

    return () => {
      clearInterval(intervalRef.current); // 清理定時器
    };
  }, []);

  useEffect(() => {
    // 初始化幻燈片
    // 添加短暫延遲確保元素已渲染
    const initTimer = setTimeout(() => {
      if (divRef.current) {
        const style = window.getComputedStyle(divRef.current);
        setElementWidth(parseFloat(style.width));
        setElementMargin(parseFloat(style.marginRight));
      }
    }, 50);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(initTimer);
    };
  }, []);

  // 輪播移動的距離
  useEffect(() => {
    if (divRef.current) {
      const style = window.getComputedStyle(divRef.current);
      setElementWidth(parseFloat(style.width));
      setElementMargin(parseFloat(style.margin));
    }
  }, [slides]); // 當 slides 陣列更新後測量元素尺寸

  const getTransformStyle = () => {
    return {
      transition: isTransitioning ? "transform 0.5s ease" : "none",
      transform: `translateX(-${
        currentIndex * (elementWidth + 2 * elementMargin)
      }px)`,
    };
  };

  // 上個按鈕
  const goToPrevious = () => {
    let fixedIndex = currentIndex.toFixed(1); // 保留一位小數
    if (fixedIndex <= 1.7) {
      // 初始為1.7，按一下會回傳1.7並為新值0.7
      // 故回傳值為1.7等於要至陣列第0項
      setIsTransitioning(true); // 開啟動畫
      setCurrentIndex(0.7); // 讓動畫走到 0 = 0.7

      setTimeout(() => {
        setIsTransitioning(false); // 關閉動畫過渡
        // 因要無限輪播故關閉動畫直接跳至陣列後對應位置
        setCurrentIndex(slides.length - 6 + 0.7); // 跳到新陣列所複製的第1個
      }, 500); // 停止動畫的時間長度，與動畫過渡時間相等

      // 延遲後重新開啟動畫
      setTimeout(() => {
        setIsTransitioning(true); // 開啟動畫過渡
      }, 600); // 重新開啟動畫的延遲時間（稍微長於 600ms 來確保狀態更新）
    } else {
      // 如果不是在 1.7，直接-1至對應位置
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
    // 滑鼠滑到會停止自動播放
    clearInterval(intervalRef.current);
    // 離開會重新計時並自動播放
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000); // 每 5 秒自動切換
  };

  // 下個按鈕
  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 6.7) {
        // 到了新陣列複製的第一項要回1.7
        setIsTransitioning(true); // 開啟動畫
        setCurrentIndex(7.7); // 讓動畫走到 7.7

        setTimeout(() => {
          setIsTransitioning(false); // 關閉過渡效果
          setCurrentIndex(1.7); // 跳回第 1 個
        }, 500); // 停止動畫的時間長度，與動畫過渡時間相等

        // 延遲後重新開啟動畫
        setTimeout(() => {
          setIsTransitioning(true); // 開啟動畫過渡
        }, 600); // 重新開啟動畫的延遲時間（稍微長於 600ms 來確保狀態更新）
      } else {
        // 如果不是在 6.7，直接+1至對應位置
        return prevIndex + 1;
      }
    });
    // 滑鼠滑到會停止自動播放
    clearInterval(intervalRef.current);
    // 離開會重新計時並自動播放
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000); // 每 5 秒自動切換
  };

  // 進度條數字 為符合就陣列有的資料數
  const calculateProgress = () => {
    if (currentIndex === 0.7) return 6; // 當 currentIndex 為 0 時顯示 6
    if (currentIndex === 7.7) return 1; // 當 currentIndex 為 7 時顯示 1
    // 計算進度條的值，從2開始有變化所以要-1.7
    return ((currentIndex - 1.7) / (slides.length / 2 - 1)) * 6;
  };

  const handleMouseEnter = () => {
    // 滑鼠到就停止自動輪播
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    // 滑鼠離開就重新開始自動輪播
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000);
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
              {/* 狗狗腳印與虛線 */}
              <div className="footline">
                <div className="line"></div>
                <div className="foot"></div>
              </div>
            </div>
          </div>
          {/* 看更多按鈕 */}
          <div className="button">
            <button className="viewmore-button">View More</button>
          </div>
        </div>
        {/* 內容 */}
        <div className="brand-news-allcontect">
          {/* 新聞外框 */}
          <div className="brand-news-contect" ref={carouselWrapperRef}>
            {/*  所有新聞內容 */}
            <div
              className="brand-news-txtbox"
              style={getTransformStyle()}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* 遍歷陣列每一項 */}
              {/* 單篇新聞 */}
              {slides.map((newItem, index) => (
                <div ref={divRef} key={index} className="item">
                  <div className="brand-news-contect-first-title">知識文章</div>
                  {/* 單篇新聞標題 */}
                  <div className="brand-news-contect-sec-title">
                    <h3>{newItem.title}</h3>
                  </div>
                  {/* 單篇新聞內容 */}
                  <div className="brand-news-contect-txt">
                    <p>{newItem.txt}</p>
                  </div>
                  {/* 單篇新聞照片 */}
                  <div className="image-box">
                    <div className="image-background"></div>
                    <div className="icon">
                      <img src={newItem.img} alt="" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* 按鈕及進度條的div */}
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
                {/* 顯示總項目數，總數除以 2 */}
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
