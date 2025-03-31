import { useState } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import './App.css';
import { GoogleGenAI } from "@google/genai";

function App() {
  const [showConversation, setShowConversation] = useState(false);
  const [validApiKey, setValidApiKey] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [validVideoLink, setValidVideoLink] = useState(true);
  const [videoLink, setVideoLink] = useState('');
  const [embedLink, setEmbedLink] = useState('');

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

  async function validateYoutubeVideo(): Promise<void>{
    const regex: RegExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = videoLink.match(regex);

    if(!match){
      setValidVideoLink(false);
    }

    const videoId = match[1];
    const apiUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const link = `https://www.youtube.com/embed/${videoId}`;

    try{
      await fetch(apiUrl);
      setValidVideoLink(true);
      setEmbedLink(link);
    }catch{
      setValidVideoLink(false);
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
                YouTube Video Link: <input name="video-link" onChange={(e) => {setVideoLink(e.target.value)}}/>
              </label>
              <AwesomeButton
               onPress={validateYoutubeVideo}>
                get video
              </AwesomeButton>
            </div>
              {!validVideoLink && <p className='video-error error'>Error: not a valid video</p>}
          </div>
          <div id='youtube-embed'>
            {embedLink && <iframe width='560' height='315'
              src={embedLink}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>}
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
