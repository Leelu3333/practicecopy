import React, { useState, useEffect, useRef } from "react";
import "./SericesProduct.css";

const productData = [
  {
    img: "./image/twL_catalog_m_24B05_tk4Z5oZPLL.jpg",
    txt: "皮膚照護系列",
  },
  {
    img: "./image/twL_catalog_m_24B05_aUu5ol0MSo.jpg",
    txt: "生活保養系列",
  },
  {
    img: "./image/twL_catalog_m_24B05_NqjcHB41lY.jpg",
    txt: "眼睛照護系列",
  },
  {
    img: "./image/twL_catalog_m_24B05_A77MLdbbDw.jpg",
    txt: "防蟲防蚤系列",
  },
  {
    img: "./image/twL_catalog_m_24B05_ytCkRqTVJu.jpg",
    txt: "寵物醫藥箱",
  },
  {
    img: "./image/twL_catalog_m_24B05_aUu5ol0MSo.jpg",
    txt: "小動物系列",
  },
];

const SericesProduct = () => {
  const [slides, setSlides] = useState([]); // 新陣列
  const [currentIndex, setCurrentIndex] = useState(1.8); // 初始
  const [slideWidth, setSlideWidth] = useState(319); // 用於存儲色塊的寬度，固定為 319px
  const margin = 25; // 每個色塊的左右間距
  const carouselWrapperRef = useRef(null); // 參考容器
  const [isTransitioning, setIsTransitioning] = useState(true); // 控制動畫是否開啟
  const intervalRef = useRef(null); // 用來存儲 intervalID

  useEffect(() => {
    // 複製並插入第一個和最後一個顏色塊
    const clonedSlides = [
      productData[productData.length - 2], // 複製倒數第二個
      productData[productData.length - 1], // 複製最後一個
      ...productData, // 原本的產品資料
      productData[0], // 複製第一個
      productData[1], // 複製第二個
      productData[2], // 複製第三個
      productData[3], // 複製第四個
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
    // 停止自動播放並重新計時
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000); // 每 5 秒自動切換
  };

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
    // 停止自動播放並重新計時
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000); // 每 5 秒自動切換
  };

  const calculateProgress = () => {
    if (currentIndex === 0.8) return 6; // 當 currentIndex 為 0 時顯示 6
    if (currentIndex === 7.8) return 1; // 當 currentIndex 為 7 時顯示 1
    return ((currentIndex - 1.8) / (slides.length / 2 - 1)) * 6; // 計算進度條的值，從 6 減少到 1
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
    <div>
      {/* 系列產品 */}
      <div className="serices-product">
        {/* 標題 */}
        <div className="serices-product-title">
          <div className="serices-product-tit">
            <div className="serices-product-back-title">PRODUCT</div>
            <div className="serices-product-fort-title">
              <h2>系列產品</h2>
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
        <div className="serices-product-allcontect" ref={carouselWrapperRef}>
          <div
            className="serices-product-contect"
            style={getTransformStyle()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {slides.map((product, index) => (
              <div
                key={index}
                className="item"
                style={{
                  width: `${slideWidth}px`, // 設置動態計算的寬度
                  margin: `0 ${margin}px`, // 每個色塊的左右間距
                }}
              >
                <div className="item-background"></div>
                <div
                  className="icon"
                  style={{
                    width: `${slideWidth}px`, // 設置動態計算的寬度
                  }}
                >
                  <img src={product.img} alt={product.txt} />
                </div>
                <div
                  className="txt"
                  style={{
                    width: `${slideWidth}px`, // 設置動態計算的寬度
                  }}
                >
                  <div className="txt-link">
                    <a href="#">{">"}</a>
                  </div>
                  <p>{product.txt}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="aaa">
            {/* 顯示當前項目和總項目數 */}
            <div className="page-number">
              <span>
                {currentIndex === 0.8
                  ? 6
                  : currentIndex === 7.8
                  ? 1
                  : Math.floor(currentIndex)}
              </span>{" "}
              {/* 根據 currentIndex 顯示數字 */}
              <span>/</span>
              <span>{Math.floor(slides.length / 2)}</span>{" "}
              {/* 顯示總項目數，總數除以 2 */}
            </div>

            {/* 進度條 */}
            <progress
              value={calculateProgress()} // 使用calculateProgress來計算進度條的值
              max="6" // 進度條的最大值設定為6
            ></progress>

            {/* 按鈕 */}
            <div className="pagebutton">
              <button onClick={goToPrevious} className="probtn">
                <span>{"<"}</span>
              </button>
              <button onClick={goToNext} className="nextbtn">
                <span>{">"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SericesProduct;
