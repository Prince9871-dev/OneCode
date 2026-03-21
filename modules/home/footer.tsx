import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="relative z-20 w-full border-t border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo + Name */}
          <div className="flex items-center gap-2">
            <div className="rounded-xl overflow-hidden p-1 bg-linear-to-br from-violet-500/10 to-indigo-500/10">
              <Image
                src="/logo.svg"
                alt="OneCode Logo"
                height={28}
                width={28}
                className="rounded-lg"
              />
            </div>
            <span className="font-extrabold text-sm bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              OneCode
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/docs"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/api"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              API
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors flex items-center gap-1.5"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} OneCode. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  )
}

export default Footer