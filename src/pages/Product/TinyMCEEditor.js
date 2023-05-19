import React, {  useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEEditor = (prods) => {
   const editorRef = useRef(null);
  


  return (
    <>
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={prods.initialValue}
      apiKey="s10jzgo6kisdmgmpw55t0m440p51nhmngx8f4uamnm5mzh3l" 
      init={{
        selector:prods.valueId,
        height: 300,
        setup: function (editor) {
          editor.on('change', function () {
            var content = editor.getContent();
            prods.getcontent(content)
          });
          editor.on('keyup', function (e) {
            var content = editor.getContent();
            prods.getcontent(content)
          });




        },
        statusbar:false,
     
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | ' +
          'bold italic backcolor | bullist numlist outdent indent|blocks fontfamily fontsize | alignleft aligncenter ' +
          'alignright alignjustify  ' 
      }}
     
    />
   
    </>
  );
};

export default TinyMCEEditor;
