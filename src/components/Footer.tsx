import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
    return (
        <footer className="py-8 px-6 border-t text-neutral-600 dark:text-neutral-400" style={{ backgroundColor: 'var(--bg-alt)', borderColor: 'var(--card-border)' }}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Logo / Name */}
                <div className="flex items-center gap-3">
                    <div className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20">
                        <span className="font-mono text-xs font-black text-primary tracking-[0.2em] uppercase">Jhonatan</span>
                    </div>
                </div>

                {/* Copyright */}
                <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center md:text-left leading-relaxed">
                    Projetado e desenvolvido com
                    <span className="mx-1 px-1.5 py-0.5 rounded bg-blue-500/5 text-blue-500 font-medium">Vite</span>,
                    <span className="mx-1 px-1.5 py-0.5 rounded bg-cyan-500/5 text-cyan-500 font-medium">React</span>,
                    <span className="mx-1 px-1.5 py-0.5 rounded bg-blue-600/5 text-blue-600 font-medium">TypeScript</span> e
                    <span className="mx-1 px-1.5 py-0.5 rounded bg-indigo-500/5 text-indigo-500 font-medium">Tailwind</span>.
                    <br className="md:hidden" />
                    <span className="block md:inline mt-2 md:mt-0 md:ml-2 opacity-60">
                        &copy; {new Date().getFullYear()} Todos os direitos reservados.
                    </span>
                </p>

                {/* Social */}
                <div className="flex gap-3">
                    {[
                        { href: 'https://github.com/mlkjhon', icon: FiGithub, label: 'GitHub', color: 'hover:text-slate-600 dark:hover:text-white' },
                        { href: 'https://www.linkedin.com/in/jhonatan-moraes-5136bb3b2/', icon: FiLinkedin, label: 'LinkedIn', color: 'hover:text-[#0077B5]' },
                        { href: 'https://mail.google.com/mail/?view=cm&fs=1&to=jhonatan.moraes957@gmail.com', icon: FiMail, label: 'Email', color: 'hover:text-[#EA4335]' },
                    ].map(({ href, icon: Icon, label, color }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className={`p-2.5 rounded-xl text-muted transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-lg ${color}`}
                            style={{ backgroundColor: 'var(--card-bg)', border: '1.5px solid var(--card-border)' }}
                        >
                            <Icon size={18} />
                        </a>
                    ))}
                </div>

            </div>
        </footer>
    )
}
