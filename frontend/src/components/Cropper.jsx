import { useRef, useState } from "react";
import ImageModal from "./ImageModal";

const Cropper = () => {
    // image src
    const [src, setSrc] = useState(null);
  
    // preview
    const [preview, setPreview] = useState(null);
  
    // modal state
    const [modalOpen, setModalOpen] = useState(false);
  
    // ref to control input element
    const inputRef = useRef(null);
  
    // handle Click
    const handleInputClick = (e) => {
      e.preventDefault();
      inputRef.current.click();
    };
    // handle Change
    const handleImgChange = (e) => {
      setSrc(URL.createObjectURL(e.target.files[0]));
      setModalOpen(true);
    };
  
    return (
      <>
        <header>
          <h1>React Avatar Cropper</h1>
          <hr />
        </header>
        <main className="container">
          <ImageModal
            modalOpen={modalOpen}
            src={src}
            setPreview={setPreview}
            setModalOpen={setModalOpen}
          />
          
          <div className="img-container">
            <img
              src={
                preview ||
                "https://www.signivis.com/img/custom/avatars/member-avatar-01.png"
              }
              alt=""
              width="200"
              height="200"
            />
          </div>
          <a href="/" onClick={handleInputClick}>
           
          </a>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImgChange}
          />
        </main>
  
      </>
    );
  };
  
  export default Cropper;