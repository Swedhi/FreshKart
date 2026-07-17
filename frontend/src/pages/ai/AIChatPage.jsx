import { useState } from "react";
import axios from "axios";
import Navbar from "../../layouts/Navbar";
import { Sparkles, Bot, Send } from "lucide-react";

export default function AIChatPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/ai/chat",
        {
          prompt: question,
        }
      );

      setAnswer(res.data.response);
    } catch (err) {
      console.error(err);
      alert("Unable to get AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-10 px-5">

        <div className="max-w-5xl mx-auto">

          {/* Header */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

            <div className="flex items-center gap-4">

              <div className="bg-green-600 text-white p-4 rounded-2xl">
                <Sparkles size={32} />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-gray-800">
                  FreshKart AI Assistant
                </h1>

                <p className="text-gray-500 mt-2">
                  Ask anything about fruits, vegetables, groceries,
                  nutrition, freshness, storage or healthy eating.
                </p>
              </div>

            </div>

          </div>

          {/* Chat Card */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <label className="block text-lg font-semibold mb-3 text-gray-700">
              Ask your question
            </label>

            <textarea
              rows={6}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Example: What are the health benefits of apples?"
              className="w-full border border-gray-300 rounded-2xl p-5 text-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />

            <button
              onClick={askAI}
              disabled={loading}
              className="mt-6 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              <Send size={18} />

              {loading ? "Thinking..." : "Ask AI"}
            </button>

            {/* Suggestions */}

            <div className="mt-8">

              <h3 className="font-semibold text-gray-700 mb-4">
                Try asking
              </h3>

              <div className="grid md:grid-cols-2 gap-3">

                <div
                  className="border rounded-xl p-4 hover:bg-green-50 cursor-pointer"
                  onClick={() =>
                    setQuestion(
                      "What are the health benefits of bananas?"
                    )
                  }
                >
                  🍌 What are the health benefits of bananas?
                </div>

                <div
                  className="border rounded-xl p-4 hover:bg-green-50 cursor-pointer"
                  onClick={() =>
                    setQuestion(
                      "How should I store tomatoes?"
                    )
                  }
                >
                  🍅 How should I store tomatoes?
                </div>

                <div
                  className="border rounded-xl p-4 hover:bg-green-50 cursor-pointer"
                  onClick={() =>
                    setQuestion(
                      "Which fruits are rich in Vitamin C?"
                    )
                  }
                >
                  🍊 Which fruits are rich in Vitamin C?
                </div>

                <div
                  className="border rounded-xl p-4 hover:bg-green-50 cursor-pointer"
                  onClick={() =>
                    setQuestion(
                      "Suggest a healthy breakfast using fruits."
                    )
                  }
                >
                  🥗 Suggest a healthy breakfast using fruits.
                </div>

              </div>

            </div>

            {/* AI Response */}

            {answer && (

              <div className="mt-10 bg-green-50 border border-green-200 rounded-2xl p-6">

                <div className="flex items-center gap-3 mb-4">

                  <div className="bg-green-600 text-white p-3 rounded-full">
                    <Bot size={22} />
                  </div>

                  <h2 className="text-2xl font-bold text-green-700">
                    AI Response
                  </h2>

                </div>

                <div className="whitespace-pre-wrap leading-8 text-gray-700 text-lg">
                  {answer}
                </div>

              </div>

            )}

          </div>

        </div>

      </div>
    </>
  );
}