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
  const [currentIndex, setCurrentIndex] = useState(1); // 初始
  const carouselWrapperRef = useRef(null); // 參考容器
  const [isTransitioning, setIsTransitioning] = useState(true); // 控制動畫是否開啟
  const intervalRef = useRef(null); // 用來存儲 intervalID
  const divRef = useRef(null);
  const [elementWidth, setElementWidth] = useState(0);
  const [elementMargin, setElementMargin] = useState(0);
  const [startX, setStartX] = useState(0); // 記錄滑鼠/觸摸開始位置
  const [moveX, setMoveX] = useState(0); // 記錄滑動過程中的距離
  const [isTouching, setIsTouching] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false); // 監控視窗是否大於992

  useEffect(() => {
    // 監控視窗大小變化
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 992); // 設定 isWideScreen，根據視窗寬度判斷
    };

    // 初次執行時和每次視窗大小變化時更新
    window.addEventListener("resize", handleResize);
    handleResize(); // 初始檢查視窗大小

    // 清理事件監聽器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  useEffect(() => {
    // 初始化幻燈片
    // 添加短暫延遲確保元素已渲染
    const initTimer = setTimeout(() => {
      if (divRef.current) {
        const style = window.getComputedStyle(divRef.current);
        setElementWidth(parseFloat(style.width));
        setElementMargin(parseFloat(style.margin));
      }
    }, 50);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(initTimer);
    };
  }, []);

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

  // 上一個按鈕
  const goToPrevious = () => {
    if (currentIndex <= 1) {
      // 當索引為1或者更小時，將 currentIndex 設為 slides.length - 6，然後跳轉到正常的第一項（index 1）
      setIsTransitioning(true); // 開啟過渡動畫
      setCurrentIndex(0); // 讓動畫走到最開始
      setIsJumping(true); // 標記為補跳轉

      setTimeout(() => {
        setIsTransitioning(false); // 關閉動畫過渡
        setCurrentIndex(slides.length - 6); // 回到陣列後面的對應位置，讓過渡效果不會錯亂
      }, 500); // 500ms後處理跳轉

      // 重新啟動過渡動畫
      setTimeout(() => {
        setIsTransitioning(true); // 開啟過渡動畫過程
        setIsJumping(false); // 補跳轉結束
      }, 600);
    } else {
      // 否則直接往上一個
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }

    // 停止自動輪播
    clearInterval(intervalRef.current);

    // 重新啟動自動輪播
    intervalRef.current = setInterval(() => {
      goToNext(); // 重新啟動自動輪播
    }, 5000); // 每5秒切換一次
  };

  // 下個按鈕
  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex == 6) {
        // 到了新陣列複製的第一項要回1.7
        setIsTransitioning(true); // 開啟動畫
        setCurrentIndex(7); // 讓動畫走到 7.8
        setIsJumping(true); // 標記為補跳轉

        setTimeout(() => {
          setIsTransitioning(false); // 關閉過渡效果
          setCurrentIndex(1); // 跳回第 1 個
        }, 500); // 停止動畫的時間長度，與動畫過渡時間相等

        // 延遲後重新開啟過渡
        setTimeout(() => {
          setIsTransitioning(true); // 開啟動畫過渡
          setIsJumping(false); // 補跳轉結束
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

  // 處理滑鼠按下
  const handleMouseDown = (e) => {
    e.stopPropagation();
    setStartX(e.clientX);
    setIsTransitioning(false); // 禁止過渡效果，允許自由滑動
    // 禁用選取
    document.body.style.userSelect = "none";
  };

  // 處理滑鼠移動
  const handleMouseMove = (e) => {
    if (startX === 0) return; // 如果未開始拖動，則跳過
    const distance = startX - e.clientX;
    setMoveX(distance);
    // 禁用所有 <a> 標籤的點擊事件
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.style.pointerEvents = "none"; // 禁用點擊
    });
  };

  // 處理滑鼠放開
  const handleMouseUp = () => {
    if (moveX > 100) {
      goToNext();
    } else if (moveX < -100) {
      goToPrevious();
    }
    clearInterval(intervalRef.current);
    setMoveX(0); // 重置滑動距離
    setIsTransitioning(true); // 恢復過渡效果
    setStartX(0); // 重置起始位置
    // 恢復選取
    document.body.style.userSelect = "auto";
    // 恢復 <a> 標籤的點擊事件
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.style.pointerEvents = "auto"; // 恢復點擊
    });
  };

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = (e) => {
    // 確保只有滑鼠離開整個區域時才執行
    if (moveX !== 0) handleMouseUp();

    // 當 e.relatedTarget 為 null 時，表示滑鼠移出了視窗，我們可以重新啟動自動輪播
    if (e.relatedTarget === null) {
      // 重新啟動自動輪播
      intervalRef.current = setInterval(() => {
        goToNext(); // 自動切換到下一個
      }, 5000); // 每 5 秒切換一次
      return; // 直接返回，不執行其他的處理
    }

    // 檢查 e.relatedTarget 是否為有效的 DOM 元素，並且滑鼠是否離開 carouselWrapperRef 範圍
    if (
      e.relatedTarget &&
      e.relatedTarget instanceof Node && // 確保 relatedTarget 是有效的 Node 類型
      !carouselWrapperRef.current.contains(e.relatedTarget) // 滑鼠離開 carouselWrapperRef 範圍
    ) {
      // 重新啟動自動輪播
      intervalRef.current = setInterval(() => {
        goToNext(); // 自動切換到下一個
      }, 5000); // 每 5 秒切換一次
    }
  };

  // 觸控開始事件
  const handleTouchStart = (e) => {
    e.stopPropagation(); // 避免傳到外層造成雙重執行
    setIsTouching(true);
    setStartX(e.touches[0].clientX); // 用 touches[0] 來獲取第一個觸控點的位置
    setIsTransitioning(false); // 禁用過渡效果
    // 禁用選取
    document.body.style.userSelect = "none";
  };

  // 觸控移動事件
  const handleTouchMove = (e) => {
    e.stopPropagation();
    if (startX === 0) return; // 如果未開始拖動，則跳過
    const distance = startX - e.touches[0].clientX; // 使用 touches[0] 來獲取觸控移動的距離
    setMoveX(distance);
    // 禁用所有 <a> 標籤的點擊事件
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.style.pointerEvents = "none"; // 禁用點擊
    });
  };

  // 觸控結束事件
  const handleTouchEnd = (e) => {
    e.stopPropagation();
    setIsTouching(false);

    if (moveX > 50) {
      goToNext();
    } else if (moveX < -50) {
      goToPrevious();
    }
    setMoveX(0);
    setIsTransitioning(true);
    setStartX(0);
    // 恢復選取
    document.body.style.userSelect = "auto";
    // 恢復 <a> 標籤的點擊事件
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.style.pointerEvents = "auto"; // 恢復點擊
    });
  };

  // 觸控取消事件
  const handleTouchCancel = () => {
    setMoveX(0);
    setStartX(0);
    setIsTransitioning(true);
    // 恢復選取
    document.body.style.userSelect = "auto";
    // 恢復 <a> 標籤的點擊事件
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.style.pointerEvents = "auto"; // 恢復點擊
    });
  };

  // 進度條數字 為符合就陣列有的資料數
  const calculateProgress = () => {
    if (currentIndex == 0) return 6; // 當 currentIndex 為 0 時顯示 6
    if (currentIndex == 7) return 1; // 當 currentIndex 為 7 時顯示 1
    // 計算進度條的值，從2開始有變化所以要-1.8
    return ((currentIndex - 1) / (slides.length / 2 - 1)) * 6; // 計算進度條的值，從 6 減少到 1
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
          {/* 看更多按鈕-電腦 */}
          <div className="button">
            <button className="viewmore-button">View More</button>
          </div>
        </div>
        {/* 內容 */}
        <div className="serices-product-allcontect">
          {/*  所有產品內容 */}
          <div
            className="serices-product-contect"
            ref={carouselWrapperRef}
            style={getTransformStyle()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart} // 增加觸控開始事件
            onTouchMove={handleTouchMove} // 增加觸控移動事件
            onTouchEnd={handleTouchEnd} // 增加觸控結束事件
            onTouchCancel={handleTouchCancel} // 增加觸控取消事件
          >
            {/* 遍歷陣列每一項 */}
            {/* 單篇產品 */}
            {slides.map((product, index) => (
              <div
                ref={divRef}
                key={index}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart} // 增加觸控開始事件
                onTouchMove={handleTouchMove} // 增加觸控移動事件
                onTouchEnd={handleTouchEnd} // 增加觸控結束事件
                onTouchCancel={handleTouchCancel} // 增加觸控取消事件
                className={`item ${
                  !isJumping && index === currentIndex + 1 && !isWideScreen
                    ? "active"
                    : ""
                }`}
              >
                <div className="item-background"></div>
                {/* 單篇產品圖片 */}
                <div className="icon">
                  <img src={product.img} alt={product.txt} />
                </div>
                {/* 單篇產品內容 */}
                <div className="txt">
                  {/* 單篇產品連結 */}
                  <a href="#">
                    <div className="txt-link">{">"}</div>
                  </a>
                  {/* 單篇產品文字 */}
                  <p>{product.txt}</p>
                </div>
              </div>
            ))}
          </div>
          {/* 按鈕及進度條的div-電腦 */}
          <div className="aaa-desktop">
            {/* 顯示當前項目和總項目數 */}
            <div className="page-number">
              <span>
                {currentIndex === 0
                  ? 6
                  : currentIndex === 7
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
          {/* 按鈕及進度條的div-手機 */}
          <div className="aaa-mobile">
            {/* 按鈕 */}
            <div className="pagebutton">
              <button onClick={goToPrevious} className="probtn">
                <span>{"<"}</span>
              </button>

              {/* 顯示當前項目和總項目數 */}
              <div className="page-number">
                <span>
                  {currentIndex === 0
                    ? 6
                    : currentIndex === 7
                    ? 1
                    : Math.floor(currentIndex)}
                </span>{" "}
                {/* 根據 currentIndex 顯示數字 */}
                <span>/</span>
                <span>{Math.floor(slides.length / 2)}</span>{" "}
                {/* 顯示總項目數，總數除以 2 */}
              </div>
              <button onClick={goToNext} className="nextbtn">
                <span>{">"}</span>
              </button>
            </div>
            {/* 看更多按鈕-手機 */}
            <div className="button-mobile">
              <button className="viewmore-button">View More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SericesProduct;
