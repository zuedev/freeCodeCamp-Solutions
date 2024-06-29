import React from "react";
import { marked } from "marked";

const Preview = ({ markdown }) => {
  const renderMarkdown = marked(markdown, { breaks: true });

  return (
    <div id="preview" dangerouslySetInnerHTML={{ __html: renderMarkdown }} />
  );
};

export default Preview;
