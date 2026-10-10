import Editor from '@monaco-editor/react';

export default function App() {
  const someDefaultValue = "// HELLOOO WORLD";
  function handleEditorChange(value, event) {
    console.log(value);
  }

  function handleEditorDidMount(editor, monaco){
    console.log('onMount: the editor instance', editor);
    console.log('onMount: the monaco instance:', monaco);
  }


  return(
  <div>
    <Editor 
      height="90vh" 
      defaultLanguage='javascript' 
      defaultValue={someDefaultValue} 
      onChange={handleEditorChange}
    />
  </div>)
}