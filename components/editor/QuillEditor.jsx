// import React, { useEffect, useRef } from 'react';
// import Quill from 'quill';
// import 'quill/dist/quill.snow.css';

// const QuillEditor = ({ post, setPost }) => {
// 	const quillElement = useRef(null);
// 	const quillInstance = useRef(null);

// 	useEffect(() => {
// 		if (quillElement.current && !quillInstance.current) {
// 			quillInstance.current = new Quill(quillElement.current, {
// 				theme: 'snow', modules: {
// 					toolbar: [
// 						['bold', 'italic', 'underline', 'strike'],        // toggled buttons
// 						['blockquote', 'code-block'],
// 						[{ 'header': 1 }, { 'header': 2 }],               // custom button values
// 						[{ 'list': 'ordered' }, { 'list': 'bullet' }],
// 						[{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
// 						[{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
// 						[{ 'direction': 'rtl' }],                         // text direction
// 						[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
// 						[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
// 						[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
// 						[{ 'font': [] }],
// 						[{ 'align': [] }],
// 						['clean']                                         // remove formatting button
// 					]
// 				}
// 			});
// 			quillInstance.current.on('text-change', function () {
// 				const html = quillElement.current.querySelector('.ql-editor').innerHTML;
// 				setPost(prevPost => ({ ...prevPost, body: String(html) }));

// 				// Move the cursor to the end of the text
// 				const length = quillInstance.current.getLength();
// 				quillInstance.current.setSelection(length, length);
// 			});
// 		}
// 		// Update the editor with the HTML content
// 		if (quillInstance.current && post.body) {
// 			const delta = quillInstance.current.clipboard.convert(post.body);
// 			quillInstance.current.setContents(delta, 'silent');

// 			// Move the cursor to the end of the text
// 			const length = quillInstance.current.getLength();
// 			quillInstance.current.setSelection(length, length);
// 		}
// 	}, [post, setPost]);

// 	return <div ref={quillElement} style={{ height: "500px" }} />;
// };

// export default QuillEditor;

import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillEditor = ({ post, setPost }) => {
	const quillElement = useRef(null);
	const quillInstance = useRef(null);

	useEffect(() => {
		if (quillElement.current && !quillInstance.current) {
			quillInstance.current = new Quill(quillElement.current, { theme: 'snow' });
			quillInstance.current.on('text-change', function () {
				const html = quillElement.current.querySelector('.ql-editor').innerHTML;
				setPost(prevPost => ({ ...prevPost, body: String(html) }));

				// Move the cursor to the end of the text
				const length = quillInstance.current.getLength();
				quillInstance.current.setSelection(length, length);
			});
		}
		// Update the editor with the HTML content
		if (quillInstance.current && post.body) {
			const delta = quillInstance.current.clipboard.convert(post.body);
			quillInstance.current.setContents(delta, 'silent');

			// Move the cursor to the end of the text
			const length = quillInstance.current.getLength();
			quillInstance.current.setSelection(length, length);
		}
	}, [post, setPost]);

	return <div ref={quillElement} style={{ height: "35vh", whiteSpace: "pre-wrap" }} />;
};

export default QuillEditor;
