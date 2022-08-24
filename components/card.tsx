import styles from "./card.module.css";
import Link from "next/link";
import { TbBrandNextjs } from "react-icons/tb";
import { RiReactjsFill } from "react-icons/ri";
import {
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiVercel,
  SiLua,
  SiNeovim,
  SiLinux,
  SiMarkdown,
} from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";

export default function Card(props) {
  const icons = {
    javascript: <SiJavascript />,
    typescript: <SiTypescript />,
    tailwindcss: <SiTailwindcss />,
    reactjs: <RiReactjsFill />,
    nextjs: <TbBrandNextjs />,
    vercel: <SiVercel />,
    lua: <SiLua />,
    neovim: <SiNeovim />,
    linux: <SiLinux />,
    markdown: <SiMarkdown />,
  };

  const repo = props.repo;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {repo.full_name}
        <Link href={repo.html_url} target="_blank">
          <a target="_blank">
            <FiExternalLink />
          </a>
        </Link>
      </div>

      <div className={styles.description}>{repo.description}</div>

      <div className={styles.icons}>
        {repo.topics.map((topic) => (
          <div>{icons[topic]}</div>
        ))}
      </div>
    </div>
  );
}
