const YEAR = new Date().getFullYear();
import Image from "next/image";
export default {
  footer: (
    <footer>
      <small>
        <time>{YEAR}</time> © Gustavo Rocha.
        <a href="/feed.xml">RSS</a>
      </small>
      <style jsx>{`
        footer {
          margin-top: 8rem;
        }
        a {
          float: right;
        }
      `}</style>
    </footer>
  ),
  projectLink: "https://github.com/gu-does-git/gudoesdev/tree/nextjs-v1",
  titleSuffix: " - Gustavo Rocha",
  darkMode: true,
};
