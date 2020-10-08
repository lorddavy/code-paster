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
import { useDispatch } from 'react-redux';
import { startSocketConnection } from '../../actions';

interface Params {
  room: string;
}

export const PlayerContainer = () => {
  const { room } = useParams<Params>();
  const { log, appendToLog } = useLog();
  const [socket, setSocket] = React.useState<SocketIO.Socket>(null);
  const dispatch = useDispatch();

  const handleConnection = () => {
    // Connect to socket

    dispatch(startSocketConnection(room));

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
      <StudentComponent room={room} log={log} />
    </>
  );
};
