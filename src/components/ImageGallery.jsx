import React, { useState } from "react";

const dummyImages = [
  "https://imgs.search.brave.com/81ey4HP3yd967S8TO04GwT1iaERXbHD6MK93_hbvyHA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hLnN0/b3J5Ymxvay5jb20v/Zi8yMDQ2MzcvNTY4/eDM2MS9hY2NkN2Vh/NGQ3L3N5ZG5leV9l/ZnN5ZG5leS1yZXNp/emVkLmpwZy9tLzYy/MHgwL2ZpbHRlcnM6/cXVhbGl0eSg3MCkv",
  "https://imgs.search.brave.com/zBvJcrcnh87c93rgdIBsx6oqoQ45IV50_dCInpNJMxc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjI0/ODk2MjMyL3Bob3Rv/L3NpbGhvdWV0dGUtYS1tYW4tYXNpYS13/aXRoLWJhY2twYWNr/LXRha2luZy1hLXBo/b3RvLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1MSXVuQTNW/SUVFaWwtbU9jbHls/aEx1c2taSXRsb0Nr/V1BfdXlMNzl5ZVRJ/PQ",
  "https://imgs.search.brave.com/KC0G5phHBSYBpwCHjEHyTzevmpqCYlKUsKPtbWOjyGA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTAx/ODE5MDQ4L3Bob3Rv/L3lvdW5nLXRvdXJp/c3Qtd2l0aC1jYW1l/cmEuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPXl3ZGhxcklq/cmRvV21rVjJ2UWtk/dG5iSkNZLVY0ajZt/dWZ3YUkzbjd1OXM9",
  "https://imgs.search.brave.com/KC0G5phHBSYBpwCHjEHyTzevmpqCYlKUsKPtbWOjyGA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTAx/ODE5MDQ4L3Bob3Rv/L3lvdW5nLXRvdXJp/c3Qtd2l0aC1jYW1l/cmEuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPXl3ZGhxcklq/cmRvV21rVjJ2UWtk/dG5iSkNZLVY0ajZt/dWZ3YUkzbjd1OXM9"
];

const ImageGallery = () => {
  const [images, setImages] = useState(dummyImages);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      newImages.push(URL.createObjectURL(files[i]));
    }
    setImages((prev) => [...prev, ...newImages]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 p-4 sm:p-6">
      {/* Header */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
        Dark Mode Image Gallery
      </h2>

      {/* Upload Button */}
      <div className="flex justify-center mb-6">
        <label className="cursor-pointer bg-gray-800 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-700 transition">
          Upload Images
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* Image Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="break-inside-avoid rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 bg-gray-800"
            >
              <img
                src={src}
                alt={`Uploaded ${index}`}
                className="w-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
