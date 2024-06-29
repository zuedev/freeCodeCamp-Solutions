import React, { useState, useEffect } from "react";

const QuoteBox = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching the quote", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleNewQuote = () => {
    fetchQuote();
  };

  return (
    <div id="quote-box" style={styles.quoteBox}>
      <p id="text" style={styles.text}>
        {quote}
      </p>
      <p id="author" style={styles.author}>
        - {author}
      </p>
      <button id="new-quote" onClick={handleNewQuote} style={styles.button}>
        New Quote
      </button>
      <a
        id="tweet-quote"
        href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.tweetLink}
      >
        Tweet
      </a>
    </div>
  );
};

// You can customize the styles as you wish
const styles = {
  quoteBox: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  text: {
    fontSize: "1.5em",
    margin: "10px 0",
  },
  author: {
    fontSize: "1.2em",
    color: "#555",
    margin: "10px 0",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1em",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",
  },
  tweetLink: {
    padding: "10px 20px",
    fontSize: "1em",
    backgroundColor: "#1DA1F2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    textDecoration: "none",
    cursor: "pointer",
    margin: "10px",
  },
};

export default QuoteBox;
