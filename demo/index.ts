import Quill from "quill";

window.onload = () => {
  const quill = new Quill("#editor-wrapper", {
    theme: "snow",
    modules: {
      toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline"], ["image", "code-block"]],
    },
  });
};
