import { useState } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import './App.css';

function App() {
  const [showConversation, setShowConversation] = useState(false);

  return (
    <>
      <header>
      <h1>
        <AwesomeButton 
          type="youtube"
          size="large"
          onPress={() => window.open('https://youtube.com', '_blank')}>
          Youtube
        </AwesomeButton>
        Summarizer
      </h1>
      </header>
      <main>
        <div id="user-input-container">
          <label>
            API Key: <input name="api-key" />
          </label>
          <label>
            YouTube Video Link: <input name="video-link" />
          </label>
          <AwesomeButton
            type='primary'>
              Generate Summary
          </AwesomeButton>
        </div>
        {showConversation && (
          <div id="response-container">
            <div id="conversation-container"></div>
            <input name="conversation-input" />
            <AwesomeButton type="primary">Send</AwesomeButton>
          </div>
        )}
      </main>
      <footer>
        <AwesomeButton
          type='github'
          onPress={() => {window.open('https://github.com/FloppyCacti/YouTube-Video-Summarize', '_blank')}}>
            <img src='../public/github-mark-white.svg'></img>
            GitHub repo
        </AwesomeButton>
      </footer>
    </>
  );
}

export default App;
