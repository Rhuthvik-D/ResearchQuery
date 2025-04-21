import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark"); // Start with 'light' as default

  // Function to handle theme changes
  const handleThemeChange = () => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Check system theme on initial load and whenever theme changes
  useEffect(() => {
    handleThemeChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

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

    const text = `---Search Summary---\n\nTopic: ${response.topic}\n\nSummary: ${response.summary}\n\nSources: \n${response.sources.join(
      "\n"
    )}\n\nTools Used:\n${response.tools_used.join(", ")}`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Theme toggle handler (manual theme change using slider)
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "0") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div
      className={`min-h-screen py-6 px-4 sm:px-6 lg:px-8 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900" // Default to dark if 'dark' is selected
      } flex items-center justify-center transition duration-300 ease-in-out`} // Center content both vertically and horizontally
    >
      <div
        className={`w-full max-w-2xl p-8 rounded-lg shadow-xl transition transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out ${
          theme === "dark" ? "bg-slate-900 shadow-cyan-100/50" : "bg-slate-100"
        }`}
      >
        <h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-600 animate__animated animate__fadeIn">
          Search Assistant
        </h1>

        {/* Theme Slider Positioned Above the Search Field */}
           <div className="flex justify-left mb-6">
            <label
              className={`mr-4 text-lg font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
              > Light</label>
            <input
              type="range"
              min="0"
              max="1"
              step="1"
              value={theme === "light" ? 0 : 1}
              onChange={handleSliderChange}
              className="w-7 h-5 bg-gray-300 rounded-full appearance-none cursor-pointer transition duration-300 ease-in-out mt-1"
            />
            <label
              className={`mr-4 text-lg font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
              >&nbsp;&nbsp;&nbsp;&nbsp;Dark</label>
           </div>

        {/* Search Bar */}
        <textarea
          className={`w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out mb-4 ${
            theme === "dark" ? "text-black placeholder-gray-400" : "text-gray-900 placeholder-gray-500"
          }`}
          placeholder="Ask a research question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Search Button */}
        <button
          className={`w-full py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-200 ease-in-out ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Submit"}
        </button>

        {/* Results Section */}
        {response && (
          <div className="mt-8 space-y-6">
            <div className="text-xl font-semibold text-indigo-600">
              Topic: {response.topic}
            </div>
            <p
              className={`text-lg whitespace-pre-wrap ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              {response.summary}
            </p>

            <div className="mt-4">
              <strong className="block text-lg text-indigo-600">Sources:</strong>
              <ul className="list-disc pl-5">
                {response.sources.map((src: string, idx: number) => (
                  <li key={idx}>{src}</li>
                ))}
              </ul>

              <p className="mt-2 text-indigo-600">
                <strong>Tools Used:</strong> {response.tools_used.join(", ")}
              </p>
            </div>

            {/* Download Summary Button */}
            <button
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 ease-in-out transform hover:scale-105"
              onClick={handleDownload}
            >
              Download Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;