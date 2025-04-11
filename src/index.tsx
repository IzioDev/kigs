import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import init, { initConsolePanicHook } from "kaspa-wasm";
import { ModuleLayout } from "./modules/ModuleLayout";
import { modules } from "./modules/module";
import { Lazy } from "./core/components/Lazy";

const setup = async () => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  await init();

  initConsolePanicHook();

  const App = (await import("./App")).default;

  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/modules" element={<ModuleLayout />}>
          {modules.map((m) => (
            <Route
            key={m.path}
            path={m.path}
            element={<Lazy key={m.path} component={m.component} />}
          />
                ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

setup();
