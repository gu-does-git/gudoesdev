import { useState, useEffect } from "react";

export default function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    const menu = document.getElementById("menu");
    if (menu) {
      if (isOpen) {
        menu.classList.add("animate-slide-up");
        menu.classList.remove("animate-slide-down");
        setTimeout(() => {
          menu.classList.add("hidden");
        }, 300);
      } else {
        menu.classList.remove("hidden");
        menu.classList.remove("animate-slide-up");
        menu.classList.add("animate-slide-down");
      }
    }
  };

  useEffect(() => {
    const closeMenuOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        const menu = document.getElementById("menu");
        if (menu) {
          menu.classList.add("animate-slide-up");
          menu.classList.remove("animate-slide-down");
          setTimeout(() => {
            menu.classList.add("hidden");
          }, 300);
        }
      }
    };

    document.addEventListener("keydown", closeMenuOnEscape);
    return () => document.removeEventListener("keydown", closeMenuOnEscape);
  }, [isOpen]);

  return (
    <button
      onClick={toggleMenu}
      className="flex sm:hidden flex-col gap-1.5 p-2"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <span
        className={`h-0.5 w-5 bg-neutral-900 transition-all duration-300 dark:bg-white ${
          isOpen ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`h-0.5 w-5 bg-neutral-900 transition-all duration-300 dark:bg-white ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`h-0.5 w-5 bg-neutral-900 transition-all duration-300 dark:bg-white ${
          isOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </button>
  );
}
