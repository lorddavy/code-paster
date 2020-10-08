import * as ioClient from "socket.io-client";
import { all, fork, take, call, put, cancel } from "redux-saga/effects";
import { actionIds } from "../common";
import { eventChannel } from "redux-saga";
import { createSocket } from "core"
import { messageLogUpdateAction } from "../actions"
import { SocketReceiveMessageTypes } from 'core/const'

export const baseSocketUrl = 'http://localhost:3001';

function subscribe(socket) {
  return eventChannel((emit) => {
    socket.on("message", (message) => {
      console.log(message);

      if (message.type) {
        const { type, payload } = message;
  
        switch (type) {
          case SocketReceiveMessageTypes.APPEND_TEXT:
            emit(messageLogUpdateAction(message.payload));
            break;
        }
      }

    });
    socket.on("disconnect", (e) => {
      // TODO: handle
    });
    socket.on("error", (error) => {
      // TODO: handle
      console.log(
        "Error while trying to connect, TODO: proper handle of this event"
      );
    });

    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  // TODO in the future we could add here a write fork
}

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
        const ioTask = yield fork(handleIO, socket);
        yield take(actionIds.STOP_SOCKET_CONNECTION);
        yield cancel(ioTask);
        socket.disconnect();
      } else {
        console.log("error connecting");
      }
    }
  }

export function* socketRootSaga() {
    yield all([fork(flow)]);
  }