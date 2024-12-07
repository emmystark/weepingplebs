import React, { useEffect, useRef } from "react";
import styles from "../styles/Scroller.module.css";

interface Item {
    id: number;
    text: string;
    imageUrl: string;
  }
  
  const items: Item[] = [
    { id: 1, text: "Item 1", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, text: "Item 2", imageUrl: "https://via.placeholder.com/150" },
    { id: 3, text: "Item 3", imageUrl: "https://via.placeholder.com/150" },
    { id: 4, text: "Item 4", imageUrl: "https://via.placeholder.com/150" },
  ];
  
  const HorizontalScroller: React.FC = () => {
    const scrollerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
  
      // Duplicate content for seamless scroll (make it twice the width of the viewport)
      const duplicateContent = scroller.innerHTML;
      scroller.innerHTML += duplicateContent;
    }, []);
  
    return (
      <div className={styles.Scontainer}>
        <div className={styles.scrollerWrapper}>
          <div className={styles.scroller} ref={scrollerRef}>
            {items.map((item) => (
              <div className={styles.scrollerItem} key={item.id}>
                <img src={item.imageUrl} alt={item.text} className={styles.image} />
                {/* <p className={styles.text}>{item.text}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default HorizontalScroller;