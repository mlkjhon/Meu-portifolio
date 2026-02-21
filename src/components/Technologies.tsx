import { useScrollReveal } from '../hooks/useScrollReveal'
import { motion } from 'framer-motion'
import { SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiNextdotjs, SiPostgresql, SiOpenai, SiGithub, SiFigma } from 'react-icons/si'
import { FiLink } from 'react-icons/fi'

type Tech = {
    name: string
    category: string
    icon: React.ElementType
    color: string
}

const technologies: Tech[] = [
    { name: 'React', category: 'Frontend', icon: SiReact, color: 'text-blue-500' },
    { name: 'TypeScript', category: 'Linguagem', icon: SiTypescript, color: 'text-blue-600' },
    { name: 'Tailwind CSS', category: 'Estilo', icon: SiTailwindcss, color: 'text-teal-400' },
    { name: 'Node.js', category: 'Backend', icon: SiNodedotjs, color: 'text-green-500' },
    { name: 'Next.js', category: 'Framework', icon: SiNextdotjs, color: 'text-neutral-900 dark:text-white' },
    { name: 'PostgreSQL', category: 'Banco de Dados', icon: SiPostgresql, color: 'text-blue-400' },
    { name: 'APIs de IA', category: 'Integração', icon: SiOpenai, color: 'text-emerald-500' },
    { name: 'Git & GitHub', category: 'Controle', icon: SiGithub, color: 'text-neutral-800 dark:text-neutral-100' },
    { name: 'REST APIs', category: 'Arquitetura', icon: FiLink, color: 'text-neutral-600 dark:text-neutral-400' },
    { name: 'Figma', category: 'Design', icon: SiFigma, color: 'text-pink-500' },
]

export default function Technologies() {
    const ref = useScrollReveal<HTMLElement>()

    return (
        <section id="tecnologias" ref={ref} className="reveal-section py-24 px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-alt)' }}>
            {/* Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-[100%] blur-[80px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16 px-4">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-muted mb-6 tracking-wide uppercase shadow-sm"
                        style={{ backgroundColor: 'var(--tag-bg)' }}
                    >
                        <span className="text-primary">02.</span> Tecnologias
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-main mt-3 tracking-tight">
                        Toolkit para problemas reais.
                    </h2>
                    <p className="text-muted mt-4 max-w-xl mx-auto text-lg leading-relaxed">
                        Meu foco é dominar as ferramentas que permitem construir aplicações completas, do banco de dados à interface.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {technologies.map((tech, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            key={tech.name}
                            className="group p-4 sm:p-6 card-base hover:border-primary/40"
                        >
                            <div className="flex flex-col items-center">
                                <div
                                    className="w-14 h-14 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-sm"
                                    style={{ backgroundColor: 'var(--tag-bg)' }}
                                >
                                    <tech.icon size={28} />
                                </div>
                                <span className="font-bold text-main tracking-tight">{tech.name}</span>
                                <p className="text-[10px] sm:text-xs font-bold text-muted mt-1 uppercase tracking-widest">{tech.category}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
