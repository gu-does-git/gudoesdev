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

interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  pubDatetime: string;
  author: string;
  tags?: string[];
}

export default function SearchPosts({
  posts,
  locale,
}: {
  posts: Post[];
  locale: string;
}) {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;

    const lowerQuery = query.toLowerCase();
    return posts.filter(
      post =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.description.toLowerCase().includes(lowerQuery) ||
        post.author.toLowerCase().includes(lowerQuery) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  }, [query, posts]);

  const postUrl = locale === "pt-br" ? "/pt-br/posts" : "/posts";
  const noResultsText =
    locale === "pt-br"
      ? "Nenhum post encontrado com esse termo"
      : "No posts found matching that search";
  const searchPlaceholder =
    locale === "pt-br"
      ? "Pesquisar por título, descrição ou tag..."
      : "Search by title, description, or tag...";

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

      {filteredPosts.length > 0 ? (
        <div className="space-y-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="flex flex-col gap-3 border-b border-neutral-200 pb-8 transition-all duration-300 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600 animate-slide-in"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex flex-col gap-1">
                <a href={`${postUrl}/${post.slug}`}>
                  <h2 className="text-2xl font-semibold text-neutral-900 transition-colors hover:text-green-600 dark:text-neutral-100 dark:hover:text-green-500">
                    {post.title}
                  </h2>
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <time>
                  {new Date(post.pubDatetime).toLocaleDateString(
                    locale === "pt-br" ? "pt-BR" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </time>
                <span>•</span>
                <span>{post.author}</span>
              </div>
              <p className="text-base text-neutral-600 dark:text-neutral-400">
                {post.description}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <a
                      key={tag}
                      href={`${postUrl}/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 transition-colors hover:bg-green-600 hover:text-white dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-green-600"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              )}
            </article>
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
