export default function ProjectList({ projects }) {
  if (!projects?.length) return null;

  return (
    <div className="glass rounded-3xl border border-white/10 p-8 shadow-lg shadow-sky-500/10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Portfolio
          </p>
          <h3 className="text-xl font-semibold text-white">Featured Projects</h3>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
          {projects.length} items
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {projects.map((project, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900/70 via-slate-900/30 to-slate-900/70 p-5 transition duration-200 hover:-translate-y-1 hover:border-white/15"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="relative">
              <h4 className="text-lg font-semibold text-white">{project.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-200">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.links.map((link, j) => (
                  <a
                    key={j}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-200 transition hover:bg-white/20"
                  >
                    View Project
                    <span aria-hidden className="text-white/70">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
