import { BrowserRouter } from "react-router-dom";

import styles from "./index.module.css";

import RouterConfigElement from "@/routers";

function App() {
  // if (!Cookies.get("token"))
  return (
    <div className={styles.app_container}>
      <BrowserRouter>
        <RouterConfigElement></RouterConfigElement>
      </BrowserRouter>
    </div>
  );
}

export default App;
