import Quill from "quill";

export class QuillImageEmbedOnPaste {
  public quill: Quill;

  constructor(quill: Quill) {
    this.quill = quill;
    this.handlePaste = this.handlePaste.bind(this);

    // prevent default
    quill.clipboard.addMatcher("IMG", () => {
      const Delta = Quill.import("delta");
      return new Delta();
    });

    quill.clipboard.addMatcher("PICTURE", () => {
      const Delta = Quill.import("delta");
      return new Delta();
    });

    this.quill.root.addEventListener("paste", this.handlePaste);
  }

  handlePaste = async (e: ClipboardEvent) => {
    const clipboardData = e.clipboardData;
    if (!clipboardData?.files?.length) return;

    const file = clipboardData.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result;
      const index = (this.quill.getSelection() || {}).index || this.quill.getLength();

      // quill creates space for original image so index - 1 inserts our base64 image to that space
      this.quill.insertEmbed(index - 1, "image", base64, "user");
      // index + 1 moves cursor in front of the base64 image
      this.quill.setSelection(index + 1, 0);
    };
  };

  destroy() {
    this.quill.root.removeEventListener("paste", this.handlePaste);
  }
}
