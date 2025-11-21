import { useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch(url, { method });
      const data = await res.text();
      setResponse(data);
    } catch (err) {
      setResponse(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
  {/* Sidebar */}
  <aside className="w-64 bg-black/40 backdrop-blur-xl p-6 flex flex-col justify-between">
    <div>
      <h1 className="text-2xl font-bold text-purple-400 mb-6">API Tester</h1>
      <nav className="flex flex-col gap-3">
        <button className="hover:text-purple-400 transition">Dashboard</button>
        <button className="hover:text-purple-400 transition">Collections</button>
        <button className="hover:text-purple-400 transition">History</button>
        <button className="hover:text-purple-400 transition">Settings</button>
      </nav>
    </div>
    <div className="text-center text-sm text-white/50">
      User: Jerome
    </div>
  </aside>

  {/* Main Area */}
  <main className="flex-1 flex flex-col p-6 gap-6">
    {/* Request Builder */}
    <div className="bg-black/40 backdrop-blur-xl p-4 rounded-2xl shadow-xl flex flex-col gap-4">
      <div className="flex gap-4">
        <select className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-white">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
          <option>PATCH</option>
        </select>
        <input
          type="text"
          placeholder="https://api.example.com/endpoint"
          className="flex-1 bg-white/10 px-4 py-2 rounded-xl border border-white/20 outline-none text-white"
        />
        <button className="bg-purple-400 px-6 py-2 rounded-xl hover:bg-purple-500 transition font-semibold flex items-center justify-center gap-2">
          Send
        </button>
      </div>
      {/* Tabs for Headers / Params / Body */}
      <div className="flex gap-4 mt-2">
        <button className="px-4 py-1 rounded-xl bg-white/10 text-white hover:bg-purple-400 transition">Headers</button>
        <button className="px-4 py-1 rounded-xl bg-white/10 text-white hover:bg-purple-400 transition">Params</button>
        <button className="px-4 py-1 rounded-xl bg-white/10 text-white hover:bg-purple-400 transition">Body</button>
      </div>
    </div>

    {/* Response Panel */}
    <div className="flex-1 bg-black/40 backdrop-blur-xl p-4 rounded-2xl shadow-xl overflow-auto">
      <h2 className="text-purple-400 font-semibold mb-2">Response:</h2>
      <pre className="text-sm text-white whitespace-pre-wrap">{`{ "message": "Hello World" }`}</pre>
    </div>
  </main>
</div>
    
  );
}
