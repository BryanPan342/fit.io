import React, { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import { endpoint, FirebaseClassContext } from './App';
import Icon from '../assets/image-icon.png';

import './styles/Upload.scss';

function Upload(): JSX.Element {
  const [file, setFile] = useState(null);
  const _firebase = useContext(FirebaseClassContext);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append(
      'id',
      _firebase.uid()
    )
    formData.append(
      "file",
      file
    );
    axios.post('http://localhost:5000/upload', formData);
  }

  const onDrop = useCallback(([file]) => {
    setFile(file);
  }, []);

  const {
    getRootProps,
    isDragActive,
    isDragAccept,
    getInputProps,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg , image/jpg, image/png",
  });

  return (
    <div style={{ margin: "1em 1em" }}>
      <div>
        <form className="form">
          <div className="input-body">
            {!file ? (
              <div
                className="circle-ctn"
                {...getRootProps({
                  isDragActive,
                  isDragAccept,
                  isDragReject,
                })}
              >
                <input {...getInputProps()} />
                <div
                  className="box"
                  style={{
                    background: isDragActive && "#1b2733",
                  }}
                >
                  <p style={{ color: isDragReject && "red" }}
                    className="circle-text"
                  >
                    {!isDragActive
                      ? `Drop Image to Add Picture`
                      : isDragReject
                        ? "Ooops upload images only"
                        : "Drop your image here to upload"}
                  </p>
                </div>
              </div>
            ) : (
                <div className="img-illustration">
                  <img
                    style={{ filter: "grayscale(80%)" }}
                    className="img-icon"
                    src={Icon}
                  />
                  <p style={{ color: "grey" }} className="file-name">
                    {file.path}
                  </p>
                </div>
              )}
            <button id="button" onClick={(e) => { e.preventDefault(); handleUpload(); }} >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;