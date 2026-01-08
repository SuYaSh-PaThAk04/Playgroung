"use client";
import { useState } from "react";
import { createProfile, login } from "../services/api";

export default function AddUser({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
    skills: [],
    projects: [],
  });
  const [skillInput, setSkillInput] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleAddProject = () => {
    if (projectTitle.trim()) {
      const newProject = {
        title: projectTitle.trim(),
        description: projectDescription.trim(),
        links: projectLink.trim() ? [projectLink.trim()] : [],
      };
      setFormData((prev) => ({
        ...prev,
        projects: [...prev.projects, newProject],
      }));
      setProjectTitle("");
      setProjectDescription("");
      setProjectLink("");
    }
  };

  const handleRemoveProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let token = null;
      if (typeof window !== "undefined") {
        token = window.localStorage.getItem("me_api_token");
      }

      // If we don't already have a token and password is provided, try to log in
      if (!token && adminPassword) {
        try {
          const { token: newToken } = await login(adminPassword);
          token = newToken;
          if (typeof window !== "undefined") {
            window.localStorage.setItem("me_api_token", token);
          }
        } catch (loginErr) {
          // If login fails but it's because auth isn't configured, continue without token
          if (loginErr.message.includes("not configured")) {
            token = null;
          } else {
            throw loginErr;
          }
        }
      }

      const newProfile = await createProfile(formData, token);
      onAdd(newProfile);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="glass w-full max-w-2xl rounded-3xl border border-white/10 p-8 shadow-2xl shadow-cyan-500/20 my-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Add New User</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/20 border border-red-500/30 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Admin password <span className="text-slate-500">(optional)</span>
            </label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition"
              placeholder="Only needed if auth is configured on server"
            />
            <p className="mt-1 text-xs text-slate-400">
              Leave empty if authentication is not configured. Otherwise, enter the admin password to enable creating profiles.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition"
              placeholder="User's full name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Education
            </label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition"
              placeholder="Education background"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Skills
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleAddSkill)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition"
                placeholder="Add a skill and press Enter"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-medium text-white transition hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              >
                Add
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.skills.map((skill, i) => (
                <span
                  key={i}
                  className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-3 py-1 text-sm font-medium text-white ring-1 ring-white/10"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="rounded-full p-0.5 text-white/60 transition hover:bg-white/20 hover:text-white"
                  >
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Projects
            </label>
            <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="grid gap-2">
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddProject)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition"
                  placeholder="Project title"
                />
                <input
                  type="text"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddProject)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition"
                  placeholder="Project description"
                />
                <input
                  type="url"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAddProject)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition"
                  placeholder="Project URL (optional)"
                />
              </div>
              <button
                type="button"
                onClick={handleAddProject}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:from-emerald-600 hover:to-cyan-600"
              >
                Add Project
              </button>
            </div>
            {formData.projects.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.projects.map((project, i) => (
                  <div
                    key={i}
                    className="group flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">
                        {project.title}
                      </p>
                      {project.description && (
                        <p className="text-xs text-slate-300">
                          {project.description}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(i)}
                      className="ml-2 rounded-full p-1 text-white/60 transition hover:bg-white/20 hover:text-white"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-medium text-white transition hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

