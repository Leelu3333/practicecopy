import React, { useState, useEffect, useRef } from "react";
import "./SericesProduct.css";

// 產品資料
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
    // 新陣列因為必須符合自動輪播視覺
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

    // 自動輪播
    intervalRef.current = setInterval(() => {
      goToNext();
    }, 5000); // 每 5 秒自動切換

    return () => {
      clearInterval(intervalRef.current); // 清理定時器
    };
  }, []);

  // 輪播移動的距離
  const getTransformStyle = () => {
    return {
      transition: isTransitioning ? "transform 0.5s ease" : "none", // 根據 isTransitioning 控制動畫開關
      transform: `translateX(-${currentIndex * (slideWidth + 2 * margin)}px)`, // 根據色塊寬度和間距來平移
    };
  };

  // 上個按鈕
  const goToPrevious = () => {
    if (currentIndex <= 1.8) {
      // 初始為1.8，按一下會回傳1.8並為新值0.8
      // 故回傳值為1.8等於要至陣列第0項
      setIsTransitioning(true); // 開啟動畫
      setCurrentIndex(0.8); // 讓動畫走到 0 = 0.8

      setTimeout(() => {
        setIsTransitioning(false); // 關閉動畫過渡
        // 因要無限輪播故關閉動畫直接跳至陣列後對應位置
        setCurrentIndex(slides.length - 6 + 0.8); // 跳到新陣列所複製的第1個
      }, 500); // 停止動畫的時間長度，與動畫過渡時間相等

      // 延遲後重新開啟過渡
      setTimeout(() => {
        setIsTransitioning(true); // 開啟動畫過渡
      }, 600); // 重新開啟動畫的延遲時間（稍微長於 600ms 來確保狀態更新）
    } else {
      // 如果不是在 1.8，直接-1至對應位置
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
      if (prevIndex == 6.8) {
        // 到了新陣列複製的第一項要回1.7
        setIsTransitioning(true); // 開啟動畫
        setCurrentIndex(7.8); // 讓動畫走到 7.8

        setTimeout(() => {
          setIsTransitioning(false); // 關閉過渡效果
          setCurrentIndex(1.8); // 跳回第 1 個
        }, 500); // 停止動畫的時間長度，與動畫過渡時間相等

        // 延遲後重新開啟過渡
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
    if (currentIndex === 0.8) return 6; // 當 currentIndex 為 0 時顯示 6
    if (currentIndex === 7.8) return 1; // 當 currentIndex 為 7 時顯示 1
    // 計算進度條的值，從2開始有變化所以要-1.8
    return ((currentIndex - 1.8) / (slides.length / 2 - 1)) * 6; // 計算進度條的值，從 6 減少到 1
  };

  const handleMouseEnter = () => {
    // 滑鼠到就停止自動輪播
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    // 滑鼠離開就重新開始自動輪播
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
        <div className="serices-product-allcontect" ref={carouselWrapperRef}>
          {/*  所有產品內容 */}
          <div
            className="serices-product-contect"
            style={getTransformStyle()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* 遍歷陣列每一項 */}
            {/* 單篇產品 */}
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
                {/* 單篇產品圖片 */}
                <div
                  className="icon"
                  style={{
                    width: `${slideWidth}px`, // 設置動態計算的寬度
                  }}
                >
                  <img src={product.img} alt={product.txt} />
                </div>
                {/* 單篇產品內容 */}
                <div
                  className="txt"
                  style={{
                    width: `${slideWidth}px`, // 設置動態計算的寬度
                  }}
                >
                  {/* 單篇產品連結 */}
                  <div className="txt-link">
                    <a href="#">{">"}</a>
                  </div>
                  {/* 單篇產品文字 */}
                  <p>{product.txt}</p>
                </div>
              </div>
            ))}
          </div>
          {/* 按鈕及進度條的div */}
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
