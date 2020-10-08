import * as ioClient from "socket.io-client";
import { all, fork, take, call, put, cancel } from "redux-saga/effects";
import { actionIds } from "../common";
import { eventChannel } from "redux-saga";
import { createSocket } from "core"

export const baseSocketUrl = 'http://localhost:3001';

function connect(room: string) {
    // Real life project extract this into an API module
    const socket = createSocket({
        room: room,
        trainertoken: '',
      });;
  
    // We need to wrap the socket connection into a promise (socket returs callback)
    return new Promise((resolve, reject) => {
      socket.on("connect", () => {
        socket.emit("messages");
        resolve({ socket });
      });
  
      socket.on("connect_error", (err) => {
        console.log("connect failed :-(");
        reject(new Error("ws:connect_failed "));
      });
    }).catch((error) => ({ socket, error }));
  }

  function* flow() {
    while (true) {
      const startSocketAction = yield take(actionIds.START_SOCKET_CONNECTION);
      const { socket, error } = yield call(connect, startSocketAction.payload);
      if (socket) {
        console.log("connection to socket succeeded");
        //const ioTask = yield fork(handleIO, socket);
        yield take(actionIds.STOP_SOCKET_CONNECTION);
        //yield cancel(ioTask);
        socket.disconnect();
      } else {
        console.log("error connecting");
      }
    }
  }

export function* socketRootSaga() {
    yield all([fork(flow)]);
  }