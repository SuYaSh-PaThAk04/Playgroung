import { useState } from "react";
import { searchBySkill } from "../services/api";

export default function SkillSearch() {
  const [skill, setSkill] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runSearch = async (pageToLoad = 1) => {
    if (!skill.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await searchBySkill(skill, pageToLoad);
      const list = Array.isArray(response) ? response : response.data || [];
      setResults(list);
      setMeta(!Array.isArray(response) ? response.meta : null);
      setPage(pageToLoad);
    } catch (err) {
      setError("Could not fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => runSearch(1);

  return (
    <div className="glass rounded-3xl border border-white/10 p-6 shadow-lg shadow-emerald-500/10">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Search</p>
          <h3 className="text-lg font-semibold text-white">Find talent by skill</h3>
        </div>
        <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-200">
          Live
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300/50 focus:outline-none"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search e.g. React, Node.js, UI/UX"
        />
        <button
          onClick={handleSearch}
          className="rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Searching..." : "Go"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-rose-200">{error}</p>}

      <div className="mt-4 space-y-3">
        {results.map((profile) => (
          <div
            key={profile._id}
            className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-semibold text-white">{profile.name}</h4>
              <span className="text-xs text-slate-400">{profile.education}</span>
            </div>
            <p className="mt-2 text-sm text-slate-200">
              {profile.skills.join(", ")}
            </p>
          </div>
        ))}

        {!results.length && !loading && (
          <p className="text-sm text-slate-400">
            Try searching for a technology to see who matches.
          </p>
        )}
      </div>

      {meta && meta.pages > 1 && (
        <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
          <button
            onClick={() => runSearch(page - 1)}
            disabled={page <= 1 || loading}
            className="rounded-full border border-white/10 px-3 py-1 disabled:opacity-40"
          >
            Prev
          </button>
          <span>
            Page {meta.page} of {meta.pages}
          </span>
          <button
            onClick={() => runSearch(page + 1)}
            disabled={page >= meta.pages || loading}
            className="rounded-full border border-white/10 px-3 py-1 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
