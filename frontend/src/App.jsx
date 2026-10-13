import Editor from '@monaco-editor/react';
import { useRef } from 'react';

export default function App() {
  const someDefaultValue = "// HELLOOO WORLD";
  const timerRef = useRef(null);

  function handleTyping(value, event) {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      console.log("Sent to AI", value);
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