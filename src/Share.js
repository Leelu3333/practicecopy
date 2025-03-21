import React, { useState, useEffect, useRef } from "react";
import "./Share.css";

// 心得資料
const shareData = [
  {
    title: "心得分享1",
    img: "./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg",
    txt: "這裡是心得的字數區1",
  },
  {
    title: "心得分享2",
    img: "./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg",
    txt: "這裡是心得的字數區2",
  },
  {
    title: "心得分享3",
    img: "./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg",
    txt: "這裡是心得的字數區3",
  },
  {
    title: "心得分享4",
    img: "./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg",
    txt: "這裡是心得的字數區4",
  },
  {
    title: "心得分享5",
    img: "./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg",
    txt: "這裡是心得的字數區5",
  },
  {
    title: "心得分享6",
    img: "./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg",
    txt: "這裡是心得的字數區6",
  },
  {
    title: "心得分享7",
    img: "./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg",
    txt: "這裡是心得的字數區7",
  },
  {
    title: "心得分享8",
    img: "./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg",
    txt: "這裡是心得的字數區8",
  },
  {
    title: "心得分享9",
    img: "./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg",
    txt: "這裡是心得的字數區9",
  },
  {
    title: "心得分享10",
    img: "./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg",
    txt: "這裡是心得的字數區10",
  },
  {
    title: "心得分享11",
    img: "./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg",
    txt: "這裡是心得的字數區11",
  },
  {
    title: "心得分享12",
    img: "./image/twL_marqueepic_24H05_JHfvuuf6yB.jpg",
    txt: "這裡是心得的字數區12",
  },
];

const Share = () => {
  const [slides, setSlides] = useState([]); // 新陣列
  const [currentIndex, setCurrentIndex] = useState(1); // 初始
  const [slideWidth, setSlideWidth] = useState(300); // 用於存儲色塊的寬度，固定為 300px
  const margin = 25; // 每個色塊的左右間距
  const carouselWrapperRef = useRef(null); // 參考容器
  const [isTransitioning, setIsTransitioning] = useState(true); // 控制動畫是否開啟
  const intervalRef = useRef(null); // 用來存儲 intervalID

  useEffect(() => {
    // 新陣列因為必須符合自動輪播視覺
    const clonedSlides = [
      shareData[shareData.length - 2], // 複製倒數第二個
      shareData[shareData.length - 1], // 複製最後一個
      ...shareData, // 原本的產品資料
      shareData[0], // 複製第一個
      shareData[1], // 複製第二個
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
    if (currentIndex <= 1) {
      // 初始為1，按一下會回傳1並為新值0
      // 故回傳值為1等於要至陣列第0項
      setIsTransitioning(true); // 開啟動畫
      setCurrentIndex(0); // 讓動畫走到 0

      setTimeout(() => {
        setIsTransitioning(false); // 關閉動畫過渡
        // 因要無限輪播故關閉動畫直接跳至陣列後對應位置
        setCurrentIndex(slides.length - 4); // 跳到新陣列所複製的第1個
      }, 500); // 停止動畫的時間長度，與動畫過渡時間相等

      // 延遲後重新開啟過渡
      setTimeout(() => {
        setIsTransitioning(true); // 開啟動畫過渡
      }, 600); // 重新開啟動畫的延遲時間（稍微長於 600ms 來確保狀態更新）
    } else {
      // 如果不是在 1，直接-1至對應位置
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
      if (prevIndex == 12) {
        // 到了新陣列複製的第一項要回1
        setIsTransitioning(true); // 開啟動畫
        setCurrentIndex(13); // 讓動畫走到 13

        setTimeout(() => {
          setIsTransitioning(false); // 關閉過渡效果
          setCurrentIndex(1); // 跳到倒數第 1 個
        }, 500); // 停止動畫的時間長度，與動畫過渡時間相等

        // 延遲後重新開啟過渡
        setTimeout(() => {
          setIsTransitioning(true); // 開啟動畫過渡
        }, 600); // 重新開啟動畫的延遲時間（稍微長於 600ms 來確保狀態更新）
      } else {
        // 如果不是在 12，直接+1至對應位置
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
      {/* 心得分享 */}
      <div class="share">
        {/* 標題 */}
        <div class="share-alltitle">
          <div class="share-back-title">SHARES</div>
          <div class="share-fort-title">
            <h2>心得分享</h2>
          </div>
        </div>
        {/* 內容 */}
        <div class="share-allcontect" ref={carouselWrapperRef}>
          {/* 按鈕 */}
          <button onClick={goToPrevious} className="probtn">
            <span>{"<"}</span>
          </button>
          <button onClick={goToNext} className="nextbtn">
            <span>{">"}</span>
          </button>
          {/* 所有心得內容 */}
          <div
            class="share-contect"
            style={getTransformStyle()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* 遍歷陣列每一項 */}
            {/* 單篇心得 */}
            {slides.map((share, index) => (
              <div
                key={index}
                className={`OuterFrame ${
                  currentIndex === index - 1 ? "active" : ""
                }`}
                style={{
                  width: `${slideWidth}px`, // 設置動態計算的寬度
                  margin: `${margin}px`, // 每個色塊的左右間距
                }}
              >
                {/* 在特定OuterFrame後+active 使CSS效過不同(讓特定心得為hover狀態) */}
                <div className="item">
                  {/* 心得照片 */}
                  <div class="icon">
                    <div className="iconback"></div>
                    <img src={share.img} alt="" />
                  </div>
                  <div class="txtbox">
                    {/* 心得標題 */}
                    <div class="title">
                      <h3>{share.title}</h3>
                    </div>
                    <br />
                    {/* 心得內容 */}
                    <div class="txt">
                      <p>{share.txt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* 點點連結 */}
          <div class="a">
            {shareData.map((dot, index) => (
              <span
                key={index}
                className={`dot ${currentIndex === index + 1 ? "active" : ""}`} // 當 currentIndex 與 index+1 相同時設置 active 類名
                onClick={() => setCurrentIndex(index + 1)} // 設定對應的索引，index + 1
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
