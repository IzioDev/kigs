import init, { initConsolePanicHook } from "kaspa-wasm";

const boot = async () => {
  await init();

  initConsolePanicHook();

  await (await import("./index")).startApplicationRendering();
};

boot();
