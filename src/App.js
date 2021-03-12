import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import Header from './components/Header';
import ShippingForm from './components/ShippingForm';

const endpoint = 'ws://localhost:8001';

function App() {
  const [guideCount, setGuideCount] = useState(0);

  let socket = null;

  useEffect(() => {
    socket = io.connect(endpoint);
    //socket.addEventListener('open', () => console.log('Hello world'));
    /*
    const socket = socketClient(endpoint);*/
    socket.on('connect', () => {
      console.log('Connected to server')
    });
    socket.on('response', (data) => console.log(data));
    socket.on('message', (res) => { console.log(res.message) });
  }, [])

  const submitInfo = data => {
    console.log('Hi this is the handler');
    socket.emit('data', data);
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <h2 className="mb-3">Guías creadas: {guideCount}</h2>
        <ShippingForm socketHandler={submitInfo} />
      </div>
    </div>
  );
}

export default App;
