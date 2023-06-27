import Quill from "quill";
import { QuillImageEmbedOnPaste } from "../src/embed-on-paste/QuillImageEmbedOnPaste";

window.onload = () => {
  Quill.register("modules/imageEmbedOnPaste", QuillImageEmbedOnPaste);

  const quill = new Quill("#editor-wrapper", {
    theme: "snow",
    modules: {
      toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline"], ["image", "code-block"]],
      imageEmbedOnPaste: true,
    },
  });
};
