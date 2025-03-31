import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/query", { query });
      setResponse(res.data);
    } catch (err) {
      alert("Error contacting server");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!response) return;

    const timestamp = new Date()
    .toISOString()
    .replace("T", "_")
    .replace(/:/g, "-")
    .split(".")[0];

    const filename = `search_summary_${timestamp}.txt`;

    const text  = `---Search Summary---\n\nTopic: ${response.topic}\n\nSummary: ${response.summary}\n\nSources: \n${response.sources.join(
      "\n"
    )}\n\nTools Used:\n${response.tools_used.join(", ")}`;

    const blob = new Blob([text], {type: "text/plain"});
    const url = window.URL.createObjectURL(blob);
    const link =document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Search Assistant</h1>
      <textarea
        className="w-full p-3 border border-gray-300 rounded"
        placeholder="Ask a research question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Searching..." : "Submit"}
      </button>

      {response && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Topic: {response.topic}</h2>
          <p className="whitespace-pre-wrap">{response.summary}</p>
          <div className="mt-4">
            <strong>Sources:</strong>
            <ul className="list-disc pl-5">
              {response.sources.map((src: string, idx: number) => (
                <li key={idx}>{src}</li>
              ))}
            </ul>
            <p className="mt-2"><strong>Tools Used:</strong> {response.tools_used.join(", ")}</p>
          </div>
          {/*Download Button here*/}
          <button
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleDownload}>
              Download Summary
            </button>
        </div>
      )}
    </div>
  );
}

export default App;
