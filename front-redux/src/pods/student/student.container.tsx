import * as React from 'react';
import { useParams } from 'react-router-dom';
import {
  createSocket,
  SocketOuputMessageLiteral,
  SocketEmitMessageTypes,
  SocketReceiveMessageTypes,
} from 'core';
import { useLog } from 'core';
import { StudentComponent } from './student.component';
import { useDispatch, useSelector } from 'react-redux';
import { startSocketConnection, messageLogUpdateAction } from '../../actions';
import { State } from '../../reducers'

interface Params {
  room: string;
}

export const PlayerContainer = () => {
  const { room } = useParams<Params>();
  const { log, appendToLog } = useLog();
  const [socket, setSocket] = React.useState<SocketIO.Socket>(null);
  const dispatch = useDispatch();
  const messageLogs = useSelector((state: State) => state.MessageLogs);

  const handleConnection = () => {
    // Connect to socket

    dispatch(startSocketConnection(room));
    /*const msg = dispatch(messageLogUpdateAction(SocketOuputMessageLiteral.MESSAGE));

    if (msg.type) {
      const { type, payload } = msg;

      switch (type) {
        case SocketReceiveMessageTypes.APPEND_TEXT:
          appendToLog(payload);
          break;
      }
    }*/

    /*const localSocket = createSocket({
      room: room,
      trainertoken: '',
    });

    setSocket(localSocket);

    localSocket.on(SocketOuputMessageLiteral.MESSAGE, msg => {
      console.log(msg);

      if (msg.type) {
        const { type, payload } = msg;

        switch (type) {
          case SocketReceiveMessageTypes.APPEND_TEXT:
            appendToLog(payload);
            break;
        }
      }
    });*/
  };

  React.useEffect(() => {
    handleConnection();
  }, []);

  return (
    <>
      <StudentComponent room={room} log={messageLogs} />
    </>
  );
};
