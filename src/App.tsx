import { BrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./index.module.css";

import RouterConfigElement from "@/routers";
import { useEffect } from "react";

console.log("--------", import.meta.env.VITE_USER_NODE_ENV);

function App() {
  useEffect(() => {
    Cookies.set("appTag", "admin");
  }, []);
  return (
    <div className={styles.app_container}>
      <BrowserRouter>
        <RouterConfigElement></RouterConfigElement>
      </BrowserRouter>
    </div>
  );
}

export default App;
