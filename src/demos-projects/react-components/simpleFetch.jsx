import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

const SimpleFetchDemo = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchComments = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=5");
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const data = await response.json();
            setComments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Simple Fetch Demo</h1>
            <p>
                This page fetches and displays data from 
                <a href="https://jsonplaceholder.typicode.com/comments" target="_blank">
                    JSONPlaceholder Comments API
                </a>.
            </p>
            <button onClick={fetchComments} disabled={loading}>
                {loading ? "Fetching..." : "Fetch Comments"}
            </button>

            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <div>
                {comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <p><strong>{comment.name}</strong> ({comment.email})</p>
                        <p>{comment.body}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Render React Component into <main>
const root = ReactDOM.createRoot(document.querySelector("main"));
root.render(<SimpleFetchDemo />);
