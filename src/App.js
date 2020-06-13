import React from 'react';
import './App.css';

import VideoChat from './components/video-chat/video-chat.component';
import Header from './components/header/header.component';

const App = () => (
  <div className="App">
    <Header />
    <VideoChat />
  </div>
);

export default App;
