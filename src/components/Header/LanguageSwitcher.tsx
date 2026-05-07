export default function LanguageSwitcher({
  currentLocale,
  pathname,
  postId,
  postsMap,
  tagMap,
}: {
  currentLocale: string | undefined;
  pathname: string;
  postId?: string;
  postsMap?: Record<string, string>;
  tagMap?: Record<string, string>;
}) {
  const getLocalizedPath = () => {
    const isTagPage = pathname.includes("/posts/tags/");

    // If we're on a tag page, translate the tag slug
    if (isTagPage && tagMap) {
      const tagMatch = pathname.match(/\/posts\/tags\/([^/]+)/);
      if (tagMatch) {
        // Decode the URL-encoded tag slug
        const currentTagSlug = decodeURIComponent(tagMatch[1]);
        const translatedTag = tagMap[currentTagSlug];

        if (translatedTag) {
          if (currentLocale === "en") {
            return `/pt-br/posts/tags/${translatedTag}`;
          }
          return `/posts/tags/${translatedTag}`;
        }
      }
    }

    // Fallback: just swap the locale prefix if no tag mapping found
    if (isTagPage) {
      const isPortuguese = pathname.startsWith("/pt-br");
      const pathWithoutLocale = isPortuguese ? pathname.slice(6) : pathname;
      const normalizedPath = pathWithoutLocale || "/";

      if (currentLocale === "en") {
        return `/pt-br${normalizedPath}`;
      }
      return normalizedPath;
    }

    // If we're on a post page, find the translated post
    if (postId && postsMap) {
      const isPortuguese = postId.includes("pt-br");
      let translatedPostId: string | undefined;

      if (currentLocale === "en") {
        // Switch to Portuguese: find the pt-br version
        translatedPostId = `pt-br/${postId}`;
      } else {
        // Switch to English: remove the pt-br prefix
        translatedPostId = postId.replace("pt-br/", "");
      }

      const translatedSlug = postsMap[translatedPostId];
      if (translatedSlug) {
        if (currentLocale === "en") {
          return `/pt-br/posts/${translatedSlug}`;
        }
        return `/posts/${translatedSlug}`;
      }
    }

    // Default behavior for non-post pages
    const isPortuguese = pathname.startsWith("/pt-br");
    const pathWithoutLocale = isPortuguese ? pathname.slice(6) : pathname;
    const normalizedPath = pathWithoutLocale || "/";

    if (currentLocale === "en") {
      return `/pt-br${normalizedPath}`;
    }
    return normalizedPath;
  };

  return (
    <div id="languageSwitcher" className="ml-5 flex items-center">
      <a
        href={getLocalizedPath()}
        title={`Switch to ${currentLocale == "en" ? "Portuguese" : "English"}`}
        aria-label={`Switch to ${currentLocale == "en" ? "Portuguese" : "English"}`}
      >
        {currentLocale == "en" && (
          <img className="w-5" src="https://flagcdn.com/br.svg" alt="Brazil" />
        )}
        {currentLocale == "pt-br" && (
          <img
            className="w-5"
            src="https://flagcdn.com/us.svg"
            alt="United States"
          />
        )}
      </a>
    </div>
  );
}
