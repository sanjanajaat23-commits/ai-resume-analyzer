"use client";

import { useState } from "react";

export default function Home() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const hasResult = result.length > 0;

  const analyzeResume = async () => {
    setLoading(true);
    setResult("");

    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resume, jobDescription }),
    });

    const data = await response.json();
    setResult(data.result || "No analysis generated.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="rounded-[40px] bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 p-14 shadow-2xl border border-white/10 mb-10">
          <p className="text-blue-100 font-semibold mb-3">
            AI SaaS Resume Optimization Platform
          </p>

          <h1 className="text-5xl md:text-6xl font-bold">
            AI Resume Analyzer PRO
          </h1>

          <p className="text-zinc-200 text-lg mt-4 max-w-3xl">
            Analyze your resume, compare it with job descriptions, and generate
            ATS-style feedback with skill-gap insights.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-5 mb-10">
          {[
            ["ATS Score", hasResult ? "82%" : "—"],
            ["Matched Skills", hasResult ? "6" : "—"],
            ["Missing Skills", hasResult ? "4" : "—"],
            ["Resume Length", resume.length],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl hover:scale-[1.02] transition duration-300"
            >
              <p className="text-zinc-400">{label}</p>
              <h2 className="text-3xl font-bold mt-2">{value}</h2>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Resume Input</h2>
              <span className="text-sm text-blue-400">Required</span>
            </div>

            <textarea
              placeholder="Paste your resume here..."
              className="w-full h-80 p-5 rounded-2xl bg-black/70 border border-zinc-700 shadow-2xl outline-none focus:border-blue-500"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Job Description</h2>
              <span className="text-sm text-purple-400">Recommended</span>
            </div>

            <textarea
              placeholder="Paste job description here..."
              className="w-full h-80 p-5 rounded-2xl bg-black/70 border border-zinc-700 shadow-2xl outline-none focus:border-purple-500"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={analyzeResume}
            disabled={loading || resume.trim().length === 0}
            className="px-12 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:scale-105 hover:shadow-purple-500/40 hover:shadow-2xl transition duration-300 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Generate Resume Report"}
          </button>
        </div>

        {loading && (
          <p className="text-center mt-6 text-blue-400">
            Analyzing ATS score, skills, and resume quality...
          </p>
        )}

        {hasResult && (
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-center md:col-span-1 shadow-2xl">
              <p className="text-blue-100">Overall ATS Score</p>
              <h2 className="text-8xl font-bold mt-4">82</h2>
              <p className="text-blue-100 mt-2">Excellent Match</p>

              <div className="w-full bg-white/20 rounded-full h-3 mt-6">
                <div className="bg-white h-3 rounded-full w-[82%]"></div>
              </div>
            </div>

            <div className="md:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h2 className="text-3xl font-bold mb-6">AI Resume Report</h2>
              <div className="whitespace-pre-wrap text-zinc-200 leading-8">
                {result}
              </div>
            </div>
          </div>
        )}

        {hasResult && (
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-3xl">
              <h2 className="text-3xl font-bold text-green-400 mb-6">
                Matched Skills
              </h2>

              <div className="flex flex-wrap gap-3">
                {["React.js", "Next.js", "Tailwind CSS", "GitHub", "API Integration", "Responsive UI"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-5 py-3 bg-green-500/20 border border-green-500/30 rounded-full text-green-300"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl">
              <h2 className="text-3xl font-bold text-red-400 mb-6">
                Missing Skills
              </h2>

              <div className="flex flex-wrap gap-3">
                {["Advanced SQL", "Testing", "Cloud Deployment", "Backend Depth"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-5 py-3 bg-red-500/20 border border-red-500/30 rounded-full text-red-300"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            ["ATS Optimization", "Improve resume compatibility with modern ATS systems."],
            ["AI Analysis", "Generate smart feedback and identify skill gaps instantly."],
            ["Job Matching", "Compare resumes directly with job descriptions for better targeting."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:scale-[1.02] transition duration-300"
            >
              <h3 className="text-2xl font-bold mb-3">{title}</h3>
              <p className="text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>

        <footer className="mt-20 text-center text-zinc-500 text-sm">
          Built with Next.js, Tailwind CSS and AI-powered resume analysis.
        </footer>
      </section>
    </main>
  );
}