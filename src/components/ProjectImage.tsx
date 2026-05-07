import { useState, useEffect } from "react";

interface ProjectImageProps {
  projectUrl: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function ProjectImage({
  projectUrl,
  alt,
  width,
  height,
  className = "",
}: ProjectImageProps) {
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchScreenshot = async () => {
      try {
        console.log("Fetching screenshot for:", projectUrl);

        // Stagger requests to avoid rate limiting
        const delay = Math.random() * 500;
        await new Promise(resolve => setTimeout(resolve, delay));

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 35000);

        const response = await fetch(
          `https://api.microlink.io/?url=${encodeURIComponent(projectUrl)}&screenshot=true`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);
        const data = await response.json();
        console.log("Microlink response:", data);

        // Try screenshot first, fall back to og:image
        const imageUrl = data.data?.screenshot?.url || data.data?.image?.url;
        if (imageUrl) {
          console.log("Image URL:", imageUrl);
          setScreenshotUrl(imageUrl);
        } else {
          console.error("No image URL in response");
          setHasError(true);
        }
      } catch (error) {
        console.error("Failed to fetch screenshot:", error);
        setHasError(true);
      }
    };

    fetchScreenshot();
  }, [projectUrl]);

  if (!screenshotUrl && !hasError) {
    return (
      <div className="animate-pulse rounded-lg bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700" style={{aspectRatio: `${width}/${height}`}} />
    );
  }

  return (
    <div className="relative">
      {!isLoaded && !hasError && screenshotUrl && (
        <div className="absolute inset-0 z-10 animate-pulse rounded-lg">
          <div className="h-full w-full rounded-lg bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700" />
        </div>
      )}
      {screenshotUrl && !hasError ? (
        <img
          src={screenshotUrl}
          alt={alt}
          className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300 border border-neutral-200 dark:border-neutral-700`}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsLoaded(true);
            setHasError(true);
          }}
        />
      ) : null}
      {hasError && (
        <div
          className="flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800"
          style={{ aspectRatio: `${width}/${height}` }}
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Failed to load preview
          </p>
        </div>
      )}
    </div>
  );
}
