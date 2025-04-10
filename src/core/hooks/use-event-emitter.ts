import EventEmitter from "eventemitter3";
import { useEffect } from "react";

export const useEventEmitter = (
  a: EventEmitter,
  event: string,
  callback: (...args: any[]) => void
) => {
  useEffect(() => {
    a.addListener(event, callback);
    return () => {
      a.removeListener(event, callback);
    };
  }, []);
};
