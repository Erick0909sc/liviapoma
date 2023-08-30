import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

let socket: Socket;

const Home = () => {
  const [input, setInput] = useState('');

  useEffect(() => {
    (async () => {
      await fetch('/api/v1/socket');
      socket = io();

      socket.on('connect', () => {
        console.log('connected');
      });

      socket.on('update-input', (msg: string) => {
        setInput(msg);
      });
    })()
  }, []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    socket.emit('input-change', e.target.value);
  };
  return (
    <div>
      <input
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default Home;
