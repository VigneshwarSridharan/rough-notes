import React, { useState, useEffect, useRef } from "react";

import hljs from "highlight.js";

import "highlight.js/styles/atom-one-dark.css";
import ReactQuill, { Quill } from "react-quill";
import AutoLinks from "quill-auto-links";

Quill.register("modules/autoLinks", AutoLinks);

hljs.configure({
  languages: ["javascript", "ruby", "python", "rust"],
});

const modules = {
  autoLinks: true,
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    ["bold", "italic", "strike"],
    ["link"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote"],
    ["code-block", "code"],
    ["task-list"],
  ],
  clipboard: {
    matchVisual: true,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
  "code",
];

const Editor = () => {
  const quillRef = useRef(null);
  const [editorValue, setEditorValue] = useState(
    "Here some example code to do something!"
  );

  const handleChange = (value) => {
    setEditorValue(value);
  };

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.keyboard.addBinding({ key: 192 }, function (range, context) {
        this.quill.formatText(range, "code", true);
      });
      quill.keyboard.addBinding(
        { key: 192, ctrlKey: true },
        function (range, context) {
          this.quill.formatText(range, "code-block", true);
        }
      );
    }
  }, []);

  return (
    <>
      <ReactQuill
        ref={quillRef}
        value={editorValue}
        onChange={handleChange}
        theme="snow"
        modules={modules}
        formats={formats}
      />
      <div>{editorValue}</div>
    </>
  );
};

export default Editor;
