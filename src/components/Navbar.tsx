import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'

const navLinks = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Tecnologias', href: '#tecnologias' },
    { label: 'Projetos', href: '#projetos' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [theme, setTheme] = useState(
        () => localStorage.getItem('theme') || 'dark'
    )

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const root = document.documentElement
        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-4 flex justify-center pointer-events-none">
            <nav
                className={`pointer-events-auto transition-all duration-300 rounded-full border ${scrolled
                    ? 'glass border-white/50 dark:border-white/10 py-2 px-6'
                    : 'bg-white/40 dark:bg-neutral-950/40 border-transparent py-4 px-6'
                    } flex items-center justify-between w-full max-w-4xl`}
            >
                {/* Logo */}
                <a
                    href="#"
                    className="font-mono text-sm font-bold text-main tracking-tight hover:text-primary transition-colors flex gap-1 items-center"
                >
                    <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm shadow-primary/40" />
                    Jhonatan
                </a>

                {/* Desktop nav */}
                <ul className="hidden md:flex items-center gap-8 ml-auto mr-8">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="text-sm font-medium text-muted hover:text-main hover:tracking-wide transition-all"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA & Theme */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full text-[var(--text-main)] hover:text-primary transition-colors shadow-sm border-[1.5px] border-[var(--card-border)] bg-[var(--card-bg)]"
                        title={theme === 'dark' ? 'Mudar para tema Claro' : 'Mudar para tema Escuro'}
                    >
                        {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
                    </button>
                    <a
                        href="#contato"
                        className="px-5 py-2 rounded-full text-sm font-bold shadow-sm bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:!bg-blue-600 transition-all duration-300"
                    >
                        Entrar em Contato
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:text-white transition-colors ml-auto"
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="absolute top-20 left-6 right-6 p-4 rounded-3xl glass border border-white/50 flex flex-col pointer-events-auto shadow-2xl md:hidden">
                    <ul className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="block px-4 py-3 text-sm font-medium text-main hover:bg-white/60 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li className="pt-2 flex flex-col gap-3">
                            <button
                                onClick={toggleTheme}
                                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 transition-colors border border-transparent dark:border-white/10 hover:bg-white dark:hover:bg-neutral-700 font-medium"
                            >
                                {theme === 'dark' ? <><FiSun size={18} /> Tema Claro</> : <><FiMoon size={18} /> Tema Escuro</>}
                            </button>
                            <a
                                href="#contato"
                                onClick={() => setMenuOpen(false)}
                                className="block text-center text-sm font-semibold px-4 py-3 rounded-xl text-white hover:bg-primary transition-colors"
                                style={{ backgroundColor: 'var(--btn-primary-bg)' }}
                            >
                                Entrar em Contato
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    )
}
