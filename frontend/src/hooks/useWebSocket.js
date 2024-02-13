import { useEffect, useState } from 'react';
import { createConsumer } from "@rails/actioncable";

const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const cable = createConsumer(`${url}/cable`);

    const subscriptions = cable.subscriptions.create("DonationsChannel", {
      connected() {
        console.log('Connected to WebSocket');
      },
      disconnected() {
        console.log('Disconnected from WebSocket');
      },
      received(data) {
        console.log('Received data from WebSocket', data);
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      subscriptions.unsubscribe();
    };
  }, [url]);

  return { messages };
};

export default useWebSocket;
