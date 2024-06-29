import React, { useState, useEffect } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import "./App.css";

const initialMarkdown = `
# Heading 1

## Heading 2

[Link](https://www.example.com)

Inline \`code\`

\`\`\`
Code block
\`\`\`

- List item

> Blockquote

![Image](https://via.placeholder.com/150)

**Bold text**
`;

const App = () => {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  return (
    <div className="App">
      <Editor markdown={markdown} onChange={setMarkdown} />
      <Preview markdown={markdown} />
    </div>
  );
};

export default App;
