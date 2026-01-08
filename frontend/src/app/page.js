"use client";
import { useEffect, useMemo, useState } from "react";
import { getProfile } from "./services/api";
import ProfileCard from "./components/ProfileCard";
import ProjectList from "./components/ProjectList";
import SkillSearch from "./components/SkillSearch";
import AddUser from "./components/AddUser";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const handleAddUser = (newProfile) => {
    // Refresh the profile list or set the new profile
    getProfile().then(setProfile);
  };

  const stats = useMemo(() => {
    if (!profile) return null;
    return {
      projects: profile.projects?.length || 0,
      skills: profile.skills?.length || 0,
      education: profile.education,
    };
  }, [profile]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16 space-y-10">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-600/80 via-sky-500/70 to-emerald-400/70 p-10 shadow-2xl">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.5),transparent_30%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white shadow-lg shadow-indigo-900/30 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                Live API-backed profile
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white drop-shadow">
                  Me-API Playground
                </h1>
                <p className="mt-2 max-w-2xl text-lg text-white/85">
                  Explore your personal API with elegant cards, discover projects, and
                  search people by skills — all in a sleek, modern UI.
                </p>
              </div>
            </div>
            {stats && (
              <div className="grid grid-cols-3 gap-3 text-center">
                <StatPill label="Projects" value={stats.projects} />
                <StatPill label="Skills" value={stats.skills} />
                <StatPill label="Education" value={stats.education} />
              </div>
            )}
          </div>
        </header>

        <main className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Profiles</h2>
              <button
                onClick={() => setShowAddUser(true)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:from-emerald-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 shadow-lg shadow-emerald-500/30"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add User
              </button>
            </div>
            <ProfileCard profile={profile} onUpdate={setProfile} />
            <ProjectList projects={profile?.projects} />
          </div>
          <div className="space-y-6">
            <SkillSearch />
            <QuickTips />
          </div>
        </main>

        {showAddUser && (
          <AddUser
            onAdd={handleAddUser}
            onClose={() => setShowAddUser(false)}
          />
        )}
      </div>
    </div>
  );
}

function StatPill({ label, value }) {
  return (
    <div className="glass rounded-2xl px-5 py-4 text-white/90">
      <div className="text-2xl font-semibold">{value || "—"}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );
}

function QuickTips() {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-emerald-300">Tips</p>
        <span className="text-xs text-slate-400">Frontend powered by Tailwind</span>
      </div>
      <ul className="space-y-3 text-sm text-slate-200">
        <li className="flex gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
          Search with keywords like “React”, “MongoDB”, or “UI”.
        </li>
        <li className="flex gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
          Click project links to open live demos in a new tab.
        </li>
        <li className="flex gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
          Skills show as colorful badges for quick scanning.
        </li>
      </ul>
    </div>
  );
}
