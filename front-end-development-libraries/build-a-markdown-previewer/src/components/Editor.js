import React from "react";

const Editor = ({ markdown, onChange }) => {
  return (
    <div>
      <textarea
        id="editor"
        value={markdown}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Editor;
