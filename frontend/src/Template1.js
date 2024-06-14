import React, { useState } from 'react';

function BlogTemplate() {
  const [imageSrc, setImageSrc] = useState('https://via.placeholder.com/150');

  const handleImageClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    };
    fileInput.click();
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div className="flex-shrink-0">
        <img className="h-12 w-12" src={imageSrc} alt="ChitChat Logo" onClick={handleImageClick} />
      </div>
      <div>
        <div className="text-xl font-medium text-black">Welcome to Template 1!</div>
        <p className="text-gray-500">This is a sample blog post using Template 1.</p>
      </div>
    </div>
  );
}

export default BlogTemplate;