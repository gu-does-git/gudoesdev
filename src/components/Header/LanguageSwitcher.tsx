export default function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: string | undefined;
}) {
  return (
    <div id="languageSwitcher" className="ml-5 flex items-center">
      <a
        href={`/${currentLocale == "en" ? "pt-br/" : ""}`}
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
