import './App.css';
import { BrowserMultiFormatReader } from '@zxing/library';
import { useState } from 'react';

function App() {
  const [tags, setTags] = useState([]);

  const submitFn = async () => {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = async () => {
          const codeReader = new BrowserMultiFormatReader();
          try {
            const result = await codeReader.decodeFromImage(image);
            setTags([...tags, result.text]);
          } catch (err) {
            console.error('Error reading barcode:', err);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="default">
      <header>
        Tag Image Analyzer
      </header>

      <div id="upload-box">
        <h1> Tag Uploader </h1>
        <p>Upload your product image with tag here. Please upload one tag at a time.</p> <br />
        <div id="grid">
          <p><b>Upload a tag: </b></p>
          <input type="file" />
          <input id="submit" type="submit" onClick={submitFn} />
        </div>
      </div>

      <div id="tags-grid">
      <h1>My Tags</h1>

        {tags.map((tag, index) => (
          <p key={index}>{tag}</p>
        ))}
      </div>
    </div>
  );
}

export default App;