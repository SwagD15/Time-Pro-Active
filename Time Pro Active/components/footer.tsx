import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-2 px-4 w-full flex justify-center items-center">
      <a
        href="https://github.com/SwagD15"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:underline"
      >
        <Github size={20} />
        <span>Made with ‪‪❤︎‬ by © Swagatam 2025</span>
      </a>
    </footer>
  )
}

