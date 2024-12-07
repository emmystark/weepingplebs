import React from "react";
import styles from "../styles/Pools.module.css";
import StickyNavigation from "./StickyNavigation";


const Pools: React.FC=() => {

  return (
   <>
    <StickyNavigation/>

<div className={styles.coming}>
  <h1>Coming Soon</h1>
  
</div>
</>
  );
};

export default Pools;
