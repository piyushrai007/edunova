import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import api from './api';
import BlogTemplate from './Template1';
// Predefined HTML templates
const templates = [
  {
    name: 'Template 1',
    content: `
      <h1>Your Title Here</h1>
      <p>Your content here</p>
      <img src="your-image-source" alt="your-image-decription" />
      <a href="your-link">Your link text</a>
    `
  },
  {
    name: 'Template 2',
    content: `
      <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div class="flex-shrink-0">
          <img class="h-12 w-12" src="https://via.placeholder.com/150" alt="ChitChat Logo">
        </div>
        <div>
          <div class="text-xl font-medium text-black">Welcome to Template 2!</div>
          <p class="text-gray-500">This is a sample blog post using Template 2.</p>
        </div>
      </div>
    `
    
  }
];

function MyQuillComponent({ initialContent, onSubmit }) {
  const [selectedTemplate, setSelectedTemplate] = React.useState(templates[0]); // Set the first template as default
  const [value, setValue] = React.useState(initialContent || selectedTemplate.content);
  const [title, setTitle] = React.useState('');

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],                      // blocks
      [{'list': 'ordered'}, {'list': 'bullet'}],         // lists
      ['link', 'image', 'video'],                        // media
      [{'script': 'sub'}, {'script': 'super'}],          // superscript/subscript
      [{'indent': '-1'}, {'indent': '+1'}],              // outdent/indent
      [{'header': [1, 2, 3, 4, 5, 6, false]}],           // headers
      [{'color': []}, {'background': []}],               // text color and background color
      [{'font': []}],                                    // font
      [{'align': []}],                                   // text align
      ['clean']                                          // remove formatting button
    ]
  };

  // Function to handle template selection
  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
    setValue(template.content);
  };

  const handleBlogPostSubmit = async () => {
    console.log('Submitting blog post:', value);
    try {
      const response = await api.post('/blogs/', {
        title: title,
        content: value
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log(response.data);
      onSubmit && onSubmit(value);
    } catch (error) {
      console.error('Error creating new blog post', error);
    }
  };
  React.useEffect(() => {
    setValue(initialContent || selectedTemplate.content);
  }, [initialContent]);
  return (
    <div className="container mx-auto p-4">
      {/* Template selection */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select a template:</label>
        <select
          value={selectedTemplate.name}
          onChange={e => handleTemplateChange(templates.find(template => template.name === e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 transition duration-300"
        >
          {templates.map(template => (
            <option key={template.name} value={template.name}>{template.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 transition duration-300"
        />
      </div>
      <div className="mb-4">
      <ReactQuill theme="snow" modules={modules} value={value} onChange={setValue} />
      </div>
      <div className="mb-4">
        <button
          onClick={handleBlogPostSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 mr-2"
        >
          Submit
        </button>
      </div>
     
    </div>
  );
}

export default MyQuillComponent;
