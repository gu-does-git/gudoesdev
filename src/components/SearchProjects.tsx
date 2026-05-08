import { useState, useMemo } from "react";

const animationStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInFromBottom {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }

  .animate-slide-in {
    animation: slideInFromBottom 0.4s ease-out forwards;
  }
`;

interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  url: string;
  tags?: string[];
}

export default function SearchProjects({
  projects,
  locale,
}: {
  projects: Project[];
  locale: string;
}) {
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    if (!query.trim()) return projects;

    const lowerQuery = query.toLowerCase();
    return projects.filter(
      project =>
        project.name.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery) ||
        (project.tags && project.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  }, [query, projects]);

  const noResultsText =
    locale === "pt-br"
      ? "Nenhum projeto encontrado com esse termo"
      : "No projects found matching that search";
  const searchPlaceholder =
    locale === "pt-br"
      ? "Pesquisar por nome, descrição ou tag..."
      : "Search by name, description, or tag...";

  return (
    <>
      <style>{animationStyles}</style>
      <div className="w-full">
        <div className="mb-8">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-500 transition-all duration-200 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-green-500 dark:focus:ring-green-500/20"
          />
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                className="group relative flex flex-col items-stretch rounded-2xl p-3 transition-transform duration-300 ease-out sm:p-7 animate-slide-in"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <span className="absolute inset-0 z-20 block h-full w-full rounded-2xl border border-dashed border-transparent bg-transparent duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border group-hover:border-dashed group-hover:border-neutral-300 group-hover:bg-white dark:group-hover:border-neutral-600 dark:group-hover:bg-neutral-950" />
                <span className="absolute inset-0 z-10 block h-full w-full rounded-2xl border border-dashed border-neutral-300 duration-300 ease-out group-hover:translate-x-1 group-hover:translate-y-1 dark:border-neutral-600" />
                <span className="relative z-30 block duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
                  <span className="mb-1 mt-0 block w-full px-1">
                    <span className="mb-3 flex items-center text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                      <img
                        src={`https://icon.horse/icon/${new URL(project.url).hostname}`}
                        width={24}
                        height={24}
                        className="mr-2 inline-block rounded-full border border-neutral-200 dark:border-neutral-700"
                        alt="Project icon"
                      />
                      <span>{project.name}</span>
                    </span>
                  </span>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {project.description}
                  </p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-600 dark:text-neutral-400 animate-fade-in">
            {noResultsText}
          </p>
        )}
      </div>
    </>
  );
}
