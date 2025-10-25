import React, { useState } from "react";
import "./ImageGallery.css";

const dummyImages = [
  "https://imgs.search.brave.com/81ey4HP3yd967S8TO04GwT1iaERXbHD6MK93_hbvyHA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hLnN0/b3J5Ymxvay5jb20v/Zi8yMDQ2MzcvNTY4/eDM2MS9hY2NkN2Vh/NGQ3L3N5ZG5leV9l/ZnN5ZG5leS1yZXNp/emVkLmpwZy9tLzYy/MHgwL2ZpbHRlcnM6/cXVhbGl0eSg3MCkv",
  "https://imgs.search.brave.com/zBvJcrcnh87c93rgdIBsx6oqoQ45IV50_dCInpNJMxc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI0/ODk2MjMyL3Bob3Rv/L3NpbGhvdWV0dGUt/YS1tYW4tYXNpYS13/aXRoLWJhY2twYWNr/LXRha2luZy1hLXBo/b3RvLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1MSXVuQTNW/SUVFaWwtbU9jbHls/aEx1c2taSXRsb0Nr/V1BfdXlMNzl5ZVRJ/PQ",
  "https://imgs.search.brave.com/KC0G5phHBSYBpwCHjEHyTzevmpqCYlKUsKPtbWOjyGA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTAx/ODE5MDQ4L3Bob3Rv/L3lvdW5nLXRvdXJp/c3Qtd2l0aC1jYW1l/cmEuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPXl3ZGhxcklq/cmRvV21rVjJ2UWtk/dG5iSkNZLVY0ajZt/dWZ3YUkzbjd1OXM9",
  "https://imgs.search.brave.com/KC0G5phHBSYBpwCHjEHyTzevmpqCYlKUsKPtbWOjyGA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTAx/ODE5MDQ4L3Bob3Rv/L3lvdW5nLXRvdXJp/c3Qtd2l0aC1jYW1l/cmEuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPXl3ZGhxcklq/cmRvV21rVjJ2UWtk/dG5iSkNZLVY0ajZt/dWZ3YUkzbjd1OXM9"
];

const ImageGallery = () => {
  const [images, setImages] = useState(dummyImages);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const fileURL = URL.createObjectURL(files[i]);
      newImages.push(fileURL);
    }

    setImages((prev) => [...prev, ...newImages]);
  };

  return (
    <div className="gallery-container">
      <h2>Image Gallery</h2>

      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </div>

      <div className="gallery-grid">
        {images.map((src, index) => (
          <div className="gallery-item" key={index}>
            <img src={src} alt={`Uploaded ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
