import * as EventEmitter from "eventemitter3";

const tick = new EventEmitter();

window.setInterval(() => tick.emit("tick1s"), 1000);
window.setInterval(() => tick.emit("tick10s"), 10000);
window.setInterval(() => tick.emit("tick30s"), 30000);

export const addTickListener = (tickRate, handler) =>
  tick.on.call(tick, tickRate, handler);
export const removeTickListener = (tickRate, handler) =>
  tick.off.call(tick, tickRate, handler);
