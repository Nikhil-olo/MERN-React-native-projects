// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    const newConversation = [...conversation, { user: 'user', text: input }];
    // console.log(newConversation);
    setConversation(newConversation);
    setInput('');

    try {
      const response = await axios.post('http://localhost:5000/ask', { prompt: input });
      const botResponse = response.data.response;
      setConversation([...newConversation, { user: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Request to backend failed:', error);
    }
  };

  return (
    <div>
      <div>
        {conversation.map((message, index) => (
          <div key={index}>
            <span>{message.user}: </span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
