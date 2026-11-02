import Editor from '@monaco-editor/react';
import { useRef } from 'react';
import {ws} from './socket'


export default function App() {
  const someDefaultValue = "// HELLOOO WORLD";
  const timerRef = useRef(null);

  function handleTyping(value) {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      console.log("Sent to AI\n", value);
      ws.send(value);
    }, 2000);
  };


  return(
  <div>
    <Editor 
      height="100vh" 
      theme="vs-dark"
      defaultLanguage='javascript' 
      defaultValue={someDefaultValue} 
      onChange={handleTyping}
    />
  </div>)
}