"use client";

import { useState } from "react";
import RainBackground from "./components/RainBackground";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState("neutral");

  async function analyzeEmotion() {
    if (!input) return;

    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();

      setResponse(data.result.response);
      setMood(data.result.mood);
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 overflow-hidden relative">
      <RainBackground />

      <div
        className="
          w-full 
          max-w-2xl 
          bg-white/5 
          border 
          border-cyan-400/20 
          rounded-3xl 
          p-8 
          backdrop-blur-xl 
          shadow-[0_0_40px_rgba(0,255,255,0.15)]
          relative
          z-10
        "
      >
        <h1
          className="
            text-4xl 
            font-bold 
            mb-2 
            bg-gradient-to-r 
            from-pink-400 
            via-cyan-300 
            to-purple-400 
            bg-clip-text 
            text-transparent
          "
        >
          Emotional Co-Pilot 🌧️
        </h1>

        <p className="text-gray-400 mb-6">
          Pause. Reflect. Respond instead of react.
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What happened?"
          className="
            w-full 
            h-40 
            bg-black/40 
            border 
            border-white/10 
            rounded-2xl 
            p-4 
            outline-none 
            resize-none
            text-white
          "
        />

        <button
          onClick={analyzeEmotion}
          disabled={loading}
          className="
            mt-4 
            w-full 
            bg-gradient-to-r 
            from-pink-500 
            to-purple-600 
            py-3 
            rounded-2xl 
            font-semibold 
            hover:opacity-90 
            transition
          "
        >
          {loading ? "Analyzing..." : "Analyze Emotion"}
        </button>

        {response && (
          <div
            className={`mt-6 rounded-2xl p-5 whitespace-pre-wrap border ${
              mood === "green"
                ? "bg-green-500/10 border-green-500/30"
                : mood === "yellow"
                ? "bg-yellow-500/10 border-yellow-500/30"
                : mood === "red"
                ? "bg-red-500/10 border-red-500/30"
                : "bg-black/30 border-white/10"
            }`}
          >
            <div className="mb-3 text-sm uppercase tracking-wider opacity-70">
              Emotional State: {mood}
            </div>

            {response}
          </div>
        )}
      </div>
    </main>
  );
}