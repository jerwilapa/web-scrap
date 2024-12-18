import React, { useState } from "react";

const App = () => {
  const [url, setUrl] = useState("");
  const [jobId, setJobId] = useState(null);
  const [result, setResult] = useState(null);

  const submitJob = async () => {
    const response = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    setJobId(data.jobId);
  };

  const fetchResult = async () => {
    const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <h1>Webpage Summarizer</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <button onClick={submitJob}>Submit</button>
      {jobId && <button onClick={fetchResult}>Get Result</button>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default App;
