import { useState } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import './App.css';
import { GoogleGenAI } from "@google/genai";

function App() {
  const [showConversation, setShowConversation] = useState(false);
  const [validApiKey, setValidApiKey] = useState(true);
  const [apiKey, setApiKey] = useState('');

  async function validateApiKey():Promise<void>{
    const key:string = apiKey;
    const ai = new GoogleGenAI({ apiKey: key });

    async function main(){
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: "hello",
        config:{
          systemInstruction: "This is a test to check if api works. Please reponse with hello"
        }
      })
    }
    try{
      await main();
      setValidApiKey(true);
    }catch{
      setValidApiKey(false);
    }
  }

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
          <div id="api-input-container" className='input-container'>
            <div>
              <label>
                API Key: <input name="api-key" type='password' onChange={(e) => {setApiKey(e.target.value)}}/>
              </label>
              <AwesomeButton size='small' 
                onPress={() => {validateApiKey()}}>
                validate
              </AwesomeButton>
            </div>
            {!validApiKey && <p className='api-error hide error'>Error: api key is not valid</p>}
          </div>
          <div id='youtube-input-container' className='input-container'>
            <div>
              <label>
                YouTube Video Link: <input name="video-link" />
              </label>
              <AwesomeButton>
                get video
              </AwesomeButton>
            </div>
              <p className='video-error error'>Error: not a valid video</p>
          </div>
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
