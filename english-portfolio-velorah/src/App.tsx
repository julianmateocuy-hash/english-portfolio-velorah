import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  FileText,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  file?: string;
};

type Skill = {
  id: number;
  name: string;
  category: string;
  percentage: number;
};

const initialProjects: Project[] = [
  {
    id: 1,
    title: "Cartoon Food Menu",
    category: "English Project",
    description:
      "An English food menu inspired by the imaginative meals and restaurants found in animated series.",
  },
  {
    id: 2,
    title: "AI Store",
    category: "English Project",
    description:
      "An innovative store concept focused on products connected with artificial intelligence.",
  },
  {
    id: 3,
    title: "Build Your Civilization",
    category: "Interactive Project",
    description:
      "A civilization game where players manage population, food, wood, stone, houses and resources.",
  },
  {
    id: 4,
    title: "Learn",
    category: "Educational App",
    description:
      "An educational English-learning experience built around interactive activities and practice.",
  },
  {
    id: 5,
    title: "CV",
    category: "Professional",
    description:
      "My English curriculum vitae, presented as a concise professional profile.",
    file: "CV.pdf",
  },
];

const initialSkills: Skill[] = [
  { id: 1, name: "HTML", category: "Frontend", percentage: 90 },
  { id: 2, name: "CSS", category: "Frontend", percentage: 85 },
  { id: 3, name: "JavaScript", category: "Programming", percentage: 72 },
  { id: 4, name: "PHP", category: "Backend", percentage: 65 },
  { id: 5, name: "MySQL", category: "Database", percentage: 70 },
  { id: 6, name: "English", category: "Language", percentage: 82 },
];

const videoUrl =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [skills, setSkills] = useState(initialSkills);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        `${project.title} ${project.category} ${project.description}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [projects, query]
  );

  const addProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const project: Project = {
      id: Date.now(),
      title: String(data.get("title") || "Untitled Project"),
      category: String(data.get("category") || "English Project"),
      description: String(data.get("description") || ""),
      file: String(data.get("file") || "") || undefined,
    };
    setProjects((current) => [...current, project]);
    setShowProjectForm(false);
    event.currentTarget.reset();
  };

  const addSkill = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const percentage = Math.min(
      100,
      Math.max(0, Number(data.get("percentage") || 0))
    );
    setSkills((current) => [
      ...current,
      {
        id: Date.now(),
        name: String(data.get("name") || "New Skill"),
        category: String(data.get("category") || "Other"),
        percentage,
      },
    ]);
    setShowSkillForm(false);
    event.currentTarget.reset();
  };

  const removeProject = (id: number) =>
    setProjects((current) => current.filter((project) => project.id !== id));

  const updateSkill = (id: number, percentage: number) =>
    setSkills((current) =>
      current.map((skill) =>
        skill.id === id
          ? { ...skill, percentage: Math.min(100, Math.max(0, percentage)) }
          : skill
      )
    );

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Cinematic hero */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src={videoUrl}
        />
        <div className="relative z-10 flex min-h-screen flex-col">
          <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-8">
            <a href="#home" className="font-display text-3xl tracking-tight">
              Velorah<sup className="text-xs">®</sup>
            </a>

            <nav className="hidden items-center gap-7 md:flex">
              {["Home", "Studio", "About", "Journal", "Reach Us"].map((item) => (
                <a
                  key={item}
                  href={
                    item === "Home"
                      ? "#home"
                      : item === "About"
                        ? "#about"
                        : item === "Journal"
                          ? "#portfolio"
                          : item === "Reach Us"
                            ? "#contact"
                            : "#skills"
                  }
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => setAdminOpen(true)}
                className="liquid-glass rounded-full px-5 py-2.5 text-sm transition-transform hover:scale-[1.03]"
              >
                Manage Portfolio
              </button>
            </nav>

            <button
              className="liquid-glass rounded-full p-3 md:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Open menu"
            >
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </header>

          {mobileOpen && (
            <div className="mx-5 rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-xl md:hidden">
              <div className="grid gap-4">
                {["Home", "About", "Skills", "Portfolio", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-white/75 hover:text-white"
                  >
                    {item}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setAdminOpen(true);
                    setMobileOpen(false);
                  }}
                  className="liquid-glass rounded-full px-5 py-3 text-sm"
                >
                  Manage Portfolio
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center md:py-28">
            <p className="animate-fade-rise mb-5 text-xs uppercase tracking-[0.35em] text-white/55">
              English Academic Portfolio
            </p>
            <h1 className="animate-fade-rise max-w-7xl font-display text-5xl font-normal leading-[0.95] tracking-[-2.46px] sm:text-7xl md:text-8xl">
              Where <em className="not-italic text-muted-foreground">dreams</em>{" "}
              rise through the <em className="not-italic text-muted-foreground">silence.</em>
            </h1>
            <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A space for my English projects, academic work, creative experiments,
              skills and the ideas I am building along the way.
            </p>
            <a
              href="#portfolio"
              className="liquid-glass animate-fade-rise-delay-2 mt-12 rounded-full px-14 py-5 text-base transition-transform hover:scale-[1.03]"
            >
              Explore Portfolio
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="eyebrow">01 — About</p>
            <h2 className="section-title mt-4">Learning with intention.</h2>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              This portfolio brings together my English assignments and projects in
              one place. It is designed to evolve with me: new work, new skills and
              new evidence can be added without rebuilding the entire site.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="border-y border-white/10 bg-black/10">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">02 — Skills</p>
              <h2 className="section-title mt-4">What I can build.</h2>
            </div>
            <button
              onClick={() => setShowSkillForm(true)}
              className="liquid-glass inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-sm"
            >
              <Plus size={16} /> Add skill
            </button>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {skills.map((skill) => (
              <article key={skill.id} className="glass-card rounded-3xl p-6 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl">{skill.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {skill.category}
                    </p>
                  </div>
                  <span className="font-display text-3xl">{skill.percentage}%</span>
                </div>
                <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-700"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <input
                    aria-label={`Change ${skill.name} percentage`}
                    type="range"
                    min="0"
                    max="100"
                    value={skill.percentage}
                    onChange={(event) =>
                      updateSkill(skill.id, Number(event.target.value))
                    }
                    className="w-full accent-white"
                  />
                  <span className="w-10 text-right text-xs text-muted-foreground">
                    {skill.percentage}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">03 — Selected Work</p>
            <h2 className="section-title mt-4">Five pieces of the journey.</h2>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-white/30"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={`project-card group rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs text-muted-foreground">
                  0{index + 1}
                </span>
                <ArrowUpRight className="text-white/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={20} />
              </div>
              <p className="mt-16 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {project.category}
              </p>
              <h3 className="mt-3 font-display text-4xl leading-none">{project.title}</h3>
              <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
                {project.description}
              </p>
              <button
                onClick={() => setSelectedProject(project)}
                className="mt-8 inline-flex items-center gap-2 text-sm text-white transition-opacity hover:opacity-60"
              >
                View project <ArrowUpRight size={15} />
              </button>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={() => setShowProjectForm(true)}
            className="liquid-glass flex w-full items-center justify-center gap-2 rounded-3xl px-6 py-5 text-sm"
          >
            <Plus size={17} /> Add another project
          </button>
        </div>
      </section>

      <section id="contact" className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-32">
          <div>
            <p className="eyebrow">04 — Reach Us</p>
            <h2 className="section-title mt-4">Let’s start a conversation.</h2>
            <p className="mt-6 max-w-md leading-7 text-muted-foreground">
              Have a question about a project, want to discuss an idea, or simply
              want to leave a message? Use the form and make yourself heard.
            </p>
            <div className="mt-8 flex gap-3">
              <a className="social" href="mailto:your@email.com" aria-label="Email"><Mail size={17} /></a>
              <a className="social" href="#" aria-label="LinkedIn"><Linkedin size={17} /></a>
              <a className="social" href="#" aria-label="GitHub"><Github size={17} /></a>
              <a className="social" href="#" aria-label="Instagram"><Instagram size={17} /></a>
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setContactSent(true);
              event.currentTarget.reset();
            }}
            className="glass-card rounded-[2rem] p-6 md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="field">
                <span>Name</span>
                <input required name="name" placeholder="Your name" />
              </label>
              <label className="field">
                <span>Email</span>
                <input required type="email" name="email" placeholder="you@example.com" />
              </label>
            </div>
            <label className="field mt-5">
              <span>Subject</span>
              <input required name="subject" placeholder="What would you like to say?" />
            </label>
            <label className="field mt-5">
              <span>Message</span>
              <textarea required name="message" rows={6} placeholder="Write your message..." />
            </label>
            <button className="liquid-glass mt-6 w-full rounded-full px-6 py-4 text-sm transition-transform hover:scale-[1.01]">
              Send message
            </button>
            {contactSent && (
              <p className="mt-4 text-center text-sm text-white/70">
                Message captured in this demo. Connect the form to PHP/MySQL for production.
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          <span className="font-display text-xl text-white">Velorah<sup className="text-[8px]">®</sup></span>
          <span>English Academic Portfolio · 2026</span>
          <a href="#home" className="hover:text-white">Back to top ↑</a>
        </div>
      </footer>

      {selectedProject && (
        <Modal onClose={() => setSelectedProject(null)}>
          <p className="eyebrow">{selectedProject.category}</p>
          <h2 className="mt-4 font-display text-5xl leading-none">{selectedProject.title}</h2>
          <p className="mt-6 leading-8 text-muted-foreground">{selectedProject.description}</p>
          {selectedProject.file && (
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 p-4">
              <FileText size={18} />
              <span className="text-sm">{selectedProject.file}</span>
            </div>
          )}
        </Modal>
      )}

      {showProjectForm && (
        <Modal onClose={() => setShowProjectForm(false)}>
          <p className="eyebrow">Portfolio CMS</p>
          <h2 className="mt-4 font-display text-5xl">Add project.</h2>
          <form onSubmit={addProject} className="mt-8 grid gap-5">
            <label className="field"><span>Title</span><input required name="title" /></label>
            <label className="field"><span>Category</span><input name="category" /></label>
            <label className="field"><span>Description</span><textarea required name="description" rows={5} /></label>
            <label className="field"><span>File name (demo)</span><input name="file" placeholder="project.pdf" /></label>
            <button className="liquid-glass rounded-full px-6 py-4 text-sm">Create project</button>
          </form>
        </Modal>
      )}

      {showSkillForm && (
        <Modal onClose={() => setShowSkillForm(false)}>
          <p className="eyebrow">Portfolio CMS</p>
          <h2 className="mt-4 font-display text-5xl">Add skill.</h2>
          <form onSubmit={addSkill} className="mt-8 grid gap-5">
            <label className="field"><span>Name</span><input required name="name" /></label>
            <label className="field"><span>Category</span><input name="category" /></label>
            <label className="field"><span>Percentage</span><input required type="number" min="0" max="100" name="percentage" /></label>
            <button className="liquid-glass rounded-full px-6 py-4 text-sm">Create skill</button>
          </form>
        </Modal>
      )}

      {adminOpen && (
        <Modal onClose={() => setAdminOpen(false)}>
          <p className="eyebrow">Admin preview</p>
          <h2 className="mt-4 font-display text-5xl">Portfolio control.</h2>
          <p className="mt-6 leading-7 text-muted-foreground">
            This front-end package includes working local CRUD interactions for projects
            and skills. For production, connect these operations to your PHP/MySQL API.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="stat"><strong>{projects.length}</strong><span>Projects</span></div>
            <div className="stat"><strong>{skills.length}</strong><span>Skills</span></div>
            <div className="stat"><strong>0</strong><span>Messages</span></div>
          </div>
          <button
            onClick={() => {
              setAdminOpen(false);
              document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="liquid-glass mt-8 w-full rounded-full px-6 py-4 text-sm"
          >
            Continue to portfolio
          </button>
        </Modal>
      )}
    </main>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-md">
      <div className="glass-card relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] p-7 md:p-10">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-white/10 p-2 text-muted-foreground hover:text-white"
          aria-label="Close"
        >
          <X size={17} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default App;