"use client";
import { useState } from "react";
import EditProfile from "./EditProfile";

export default function ProfileCard({ profile, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!profile) {
    return (
      <div className="glass rounded-3xl p-8">
        <div className="mb-4 h-6 w-40 animate-pulse rounded bg-white/10" />
        <div className="mb-2 h-4 w-72 animate-pulse rounded bg-white/5" />
        <div className="h-4 w-64 animate-pulse rounded bg-white/5" />
      </div>
    );
  }

  const initials = profile.name?.slice(0, 2)?.toUpperCase() || "ME";

  const handleUpdate = (updatedProfile) => {
    onUpdate(updatedProfile);
    setIsEditing(false);
  };

  return (
    <>
      <div className="glass rounded-3xl border border-white/10 p-8 shadow-lg shadow-cyan-500/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-400 text-lg font-semibold text-white shadow-lg shadow-indigo-900/30">
              {initials}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">{profile.name}</h2>
              <p className="text-sm text-slate-300">{profile.education}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
          </div>
        </div>

        <div className="mt-6 border-t border-white/5 pt-6">
          <p className="text-sm uppercase tracking-wide text-slate-400">Skills</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.skills.map((skill, i) => (
              <span
                key={i}
                className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-100 ring-1 ring-white/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {isEditing && (
        <EditProfile
          profile={profile}
          onUpdate={handleUpdate}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
}
