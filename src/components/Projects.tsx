import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { FiGithub, FiExternalLink, FiClock, FiActivity, FiPieChart, FiFolder, FiChevronDown } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const financeAITags = [
    'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'
]

const mockProjects = [
    {
        title: 'E-commerce API',
        desc: 'API RESTFul construída com Node.js e Express, incluindo autenticação JWT, pagamentos simulados e integração com banco de dados relacional.',
        tags: ['Node.js', 'Express', 'JWT', 'PostgreSQL'],
        github: 'https://github.com/mlkjhon',
    },
    {
        title: 'TaskFlow',
        desc: 'Aplicação web no estilo Kanban com drag-and-drop para gerenciamento de tarefas pessoais da faculdade e trabalho.',
        tags: ['React', 'Redux', 'Tailwind CSS', 'Firebase'],
        github: 'https://github.com/mlkjhon',
    },
    {
        title: 'HealthTrack CLI',
        desc: 'Utilitário de linha de comando para monitorar ingestão de água e horas de sono diretamente do terminal.',
        tags: ['TypeScript', 'Node.js', 'CLI'],
        github: 'https://github.com/mlkjhon',
    }
]

export default function Projects() {
    const ref = useScrollReveal<HTMLElement>()
    const [showMore, setShowMore] = useState(false)

    return (
        <section id="projetos" ref={ref} className="reveal-section py-32 px-6 relative" style={{ backgroundColor: 'var(--bg-main)' }}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 px-4">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-muted mb-6 tracking-wide uppercase shadow-sm"
                        style={{ backgroundColor: 'var(--tag-bg)' }}
                    >
                        <span className="text-primary font-bold">03.</span> Portfólio
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-main mt-3 tracking-tight">
                        Construindo o futuro.
                    </h2>
                    <p className="text-[var(--text-muted)] mt-4 max-w-2xl mx-auto text-lg text-balance">
                        Aplicações reais, problemas reais. Aqui está em que tenho focado recentemente.
                    </p>
                </div>

                {/* Featured Project Card */}
                <div className="relative group rounded-[2rem] card-base overflow-hidden hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 mb-16">
                    <div className="grid lg:grid-cols-2 gap-0">

                        {/* Content Left */}
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold mb-6 w-max uppercase tracking-wider">
                                <FiClock size={12} className="animate-pulse" />
                                Quase finalizado
                            </div>

                            <h3 className="text-3xl sm:text-4xl font-bold text-main mb-4 tracking-tight">
                                Finance<span className="text-primary">AI</span>
                            </h3>

                            <p className="text-muted text-lg leading-relaxed mb-8">
                                Um SaaS fullstack financeiro pessoal. Uma plataforma robusta que facilita o registro
                                de gastos, oferecendo categorizações fluídas e insights de economia adaptados ao comportamento do usuário.
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-10">
                                {financeAITags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-white dark:bg-black/40 rounded-full border border-neutral-200 dark:border-neutral-800 text-[10px] sm:text-xs font-medium text-muted"
                                        style={{ backgroundColor: 'var(--tag-bg)' }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 mt-auto">
                                <a
                                    href="https://github.com/mlkjhon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] hover:!bg-blue-600 text-sm font-semibold rounded-xl cursor-pointer shadow-sm transition-colors"
                                    title="Código ainda fechado"
                                >
                                    <FiGithub size={18} />
                                    Código Privado
                                </a>
                                <span
                                    className="inline-flex items-center gap-2 px-6 py-3 text-[var(--text-main)] bg-[var(--card-bg)] border-[1.5px] border-[var(--card-border)] hover:!bg-[var(--card-hover-bg)] text-sm font-semibold rounded-xl cursor-pointer shadow-sm transition-colors"
                                    title="Demo em breve"
                                >
                                    <FiExternalLink size={18} />
                                    Demo em Breve
                                </span>
                            </div>
                        </div>

                        {/* Visual Right (Mockup) */}
                        <div
                            className="relative p-8 lg:p-12 flex items-center justify-center overflow-hidden border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800"
                            style={{ backgroundColor: 'var(--bg-main)' }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[60px]"></div>

                            <div
                                className="relative w-full max-w-md rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden transform group-hover:scale-[1.02] group-hover:-translate-y-2 transition-all duration-500"
                                style={{ backgroundColor: 'var(--card-bg)' }}
                            >

                                <div
                                    className="border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 flex items-center gap-2"
                                    style={{ backgroundColor: 'var(--bg-main)' }}
                                >
                                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                                    <div
                                        className="ml-4 flex-1 h-5 rounded-md border border-neutral-200/60 dark:border-neutral-800 text-[10px] text-muted font-mono flex items-center justify-center"
                                        style={{ backgroundColor: 'var(--card-muted)' }}
                                    >
                                        app.financeai.com
                                    </div>
                                </div>

                                <div className="p-5 flex flex-col gap-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div
                                            className="rounded-lg p-3 border border-neutral-100 dark:border-neutral-800"
                                            style={{ backgroundColor: 'var(--card-muted)' }}
                                        >
                                            <p className="text-[10px] text-muted font-medium uppercase tracking-wider mb-1">Saldo Atual</p>
                                            <p className="text-lg font-bold text-main">R$ 4.250,00</p>
                                        </div>
                                        <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                                            <p className="text-[10px] text-primary/70 font-medium uppercase tracking-wider mb-1 flex items-center gap-1"><FiActivity size={10} /> IA Insight</p>
                                            <p className="text-xs font-semibold text-primary/90 mt-1 leading-tight">Você economizou 15% em delivery este mês.</p>
                                        </div>
                                    </div>

                                    <div
                                        className="border border-neutral-100 dark:border-neutral-800 rounded-lg p-4 shadow-sm flex items-center gap-4"
                                        style={{ backgroundColor: 'var(--card-bg)' }}
                                    >
                                        <div className="w-16 h-16 rounded-full border-4 border-neutral-100 dark:border-neutral-800 border-t-primary border-r-blue-300 flex items-center justify-center">
                                            <FiPieChart className="text-main" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div
                                                className="h-2 rounded-full w-full overflow-hidden"
                                                style={{ backgroundColor: 'var(--bg-main)' }}
                                            >
                                                <div className="h-full bg-primary w-[40%]"></div>
                                            </div>
                                            <div
                                                className="h-2 rounded-full w-full overflow-hidden"
                                                style={{ backgroundColor: 'var(--bg-main)' }}
                                            >
                                                <div className="h-full bg-blue-400 w-[25%]"></div>
                                            </div>
                                            <div
                                                className="h-2 rounded-full w-full overflow-hidden"
                                                style={{ backgroundColor: 'var(--bg-main)' }}
                                            >
                                                <div className="h-full bg-emerald-400 w-[15%]"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div
                                            className="h-8 rounded-md border border-neutral-100 dark:border-neutral-800 flex items-center px-3 justify-between"
                                            style={{ backgroundColor: 'var(--card-muted)' }}
                                        >
                                            <div className="h-2 w-20 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                                            <div className="h-2 w-12 bg-red-200 dark:bg-red-900/30 rounded"></div>
                                        </div>
                                        <div
                                            className="h-8 rounded-md border border-neutral-100 dark:border-neutral-800 flex items-center px-3 justify-between"
                                            style={{ backgroundColor: 'var(--card-muted)' }}
                                        >
                                            <div className="h-2 w-24 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                                            <div className="h-2 w-16 bg-emerald-200 dark:bg-emerald-900/30 rounded"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* More Projects Section */}
                <div className="text-center">
                    <button
                        onClick={() => setShowMore(!showMore)}
                        style={{ backgroundColor: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold hover:bg-primary transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
                    >
                        {showMore ? 'Ver Menos' : 'Mais Projetos'}
                        <motion.div
                            animate={{ rotate: showMore ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FiChevronDown size={18} />
                        </motion.div>
                    </button>
                </div>

                <AnimatePresence>
                    {showMore && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden mt-12"
                        >
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {mockProjects.map((project, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col p-6 shadow-sm card-base hover:border-primary/30 hover:shadow-lg"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                                <FiFolder size={20} />
                                            </div>
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:text-white transition-colors"
                                            >
                                                <FiGithub size={20} />
                                            </a>
                                        </div>

                                        <h4 className="text-lg font-bold text-main mb-2">{project.title}</h4>
                                        <p className="text-muted text-sm leading-relaxed mb-6 flex-1">
                                            {project.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-xs font-mono text-neutral-500">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    )
}
