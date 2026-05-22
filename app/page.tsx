"use client";

import { useState } from "react";

export default function Home() {
  const [resume, setResume] = useState("");
  const [result, setResult] = useState("");

  const analyzeResume = async () => {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resume }),
    });

    const data = await response.json();

    setResult(data.result);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-10">
      <h1 className="text-5xl font-bold mb-6">
        AI Resume Analyzer
      </h1>

      <p className="text-gray-400 mb-10">
        Upload your resume and analyze it using AI
      </p>

      <textarea
        placeholder="Paste your resume here..."
        className="w-full max-w-3xl h-64 p-4 rounded-xl bg-gray-900 border border-gray-700"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <button
        onClick={analyzeResume}
        className="mt-6 px-8 py-3 bg-blue-600 rounded-xl hover:bg-blue-700"
      >
        Analyze Resume
      </button>

      {result && (
        <div className="mt-10 max-w-3xl bg-gray-900 p-6 rounded-xl whitespace-pre-wrap">
          {result}
        </div>
      )}
    </main>
  );
}