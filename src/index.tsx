import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ModuleLayout } from "./modules/ModuleLayout";
import { modules } from "./modules/module";
import { Lazy } from "./core/components/Lazy";
import App from "./App";

export const startApplicationRendering = async () => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/modules" element={<ModuleLayout />}>
          {modules.map((m) => (
            <Route key={m.path} path={m.path} element={<m.component />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
