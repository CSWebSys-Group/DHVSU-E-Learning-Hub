import { Upload } from "lucide-react";
import React, { useRef, useState } from "react";

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
};

const FileUpload = () => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="files" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FileUpload;
