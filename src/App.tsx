import { ConfigProvider, App as AntdApp } from "antd";
import { BrowserRouter } from "react-router-dom";
import roRO from "antd/locale/ro_RO";
import "antd/dist/reset.css";

import { AppRoutes } from "./AppRoutes";

import "@/styles/global.css";

function App() {
  return (
    <AntdApp>
      <ConfigProvider locale={roRO}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ConfigProvider>
    </AntdApp>
  );
}

export default App;
