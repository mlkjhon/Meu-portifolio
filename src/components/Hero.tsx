import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown, FiGithub, FiLinkedin, FiTerminal } from 'react-icons/fi'

export default function Hero() {
    const [terminalOutput, setTerminalOutput] = useState<string[]>([
        'visitor@jhonatan-portfolio:~$ ./run_intro.sh',
        'Iniciando sistema...',
        'Carregando módulos Fullstack...',
        'Pronto! Digite "help" para ver os comandos.'
    ]);
    const [cmd, setCmd] = useState('');

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const command = cmd.trim().toLowerCase();
        let response = '';
        if (command === 'help') response = 'Comandos disponíveis: skills, projetos, contato, clear';
        else if (command === 'skills') response = 'React, TypeScript, Node.js, Next.js, PostgreSQL...';
        else if (command === 'projetos') response = 'FinanceAI - SaaS financeiro com IA. E mais 5 a caminho!';
        else if (command === 'contato') response = 'Email: jhonatan.moraes957@gmail.com | LinkedIn: Jhonatan Moraes';
        else if (command === 'clear') { setTerminalOutput([]); setCmd(''); return; }
        else if (command === '') return;
        else response = `bash: command not found: ${command}`;

        setTerminalOutput(prev => [...prev, `visitor@jhonatan-portfolio:~$ ${command}`, response]);
        setCmd('');
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        >
            {/* Background patterns */}
            <div className="absolute inset-0 bg-grid z-0 opacity-[0.3]"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Side: Text */}
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-sm text-xs font-medium text-muted mb-6"
                        style={{ backgroundColor: 'var(--card-bg)' }}
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Disponível para novas oportunidades
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-2 text-main"
                    >
                        Engenharia de <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                            Software.
                        </span>
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-2xl sm:text-3xl font-semibold text-muted mb-6"
                    >
                        Jhonatan Moraes
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg text-muted leading-relaxed mb-10 max-w-lg text-balance"
                    >
                        Transformando problemas complexos em produtos digitais funcionais e escaláveis. Foco em arquitetura robusta, interfaces minimalistas e alta performance.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap gap-4 items-center"
                    >
                        <a
                            href="#projetos"
                            className="px-6 py-3.5 font-semibold rounded-xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:!bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-primary/30 flex items-center gap-2 hover:brightness-110 hover:scale-[1.02]"
                        >
                            Ver Projetos
                        </a>
                        <a
                            href="#contato"
                            className="px-6 py-3.5 border-2 text-[var(--text-main)] bg-[var(--card-bg)] border-[var(--card-border)] font-semibold rounded-xl hover:!bg-[var(--btn-primary-bg)] hover:!text-[var(--btn-primary-text)] hover:!border-[var(--btn-primary-bg)] transition-all duration-200 shadow-sm"
                        >
                            Entrar em Contato
                        </a>

                        <div className="flex gap-2 ml-2">
                            <a
                                href="https://github.com/mlkjhon"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 text-muted hover:text-main transition-all duration-200 rounded-xl border-2"
                                style={{ backgroundColor: 'var(--card-muted)', borderColor: 'var(--card-border)' }}
                            >
                                <FiGithub size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/jhonatan-moraes-5136bb3b2/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 text-muted hover:text-main transition-all duration-200 rounded-xl border-2"
                                style={{ backgroundColor: 'var(--card-muted)', borderColor: 'var(--card-border)' }}
                            >
                                <FiLinkedin size={20} />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Interactive Terminal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="hidden lg:flex relative items-center justify-center h-full w-full max-w-lg mx-auto"
                >
                    {/* Decorative Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>

                    <div className="w-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm z-10 relative">
                        {/* Terminal Header */}
                        <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-black">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-xs font-mono text-neutral-400 flex items-center gap-2"><FiTerminal /> visitor@jhonatan:~</span>
                            <div className="w-10"></div>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-5 h-80 overflow-y-auto font-mono text-sm text-green-400 bg-[#1e1e1e]/90 flex flex-col gap-1 text-left">
                            {terminalOutput.map((line, i) => (
                                <div key={i} className={line.startsWith('visitor@') ? 'text-blue-400 mt-2 font-semibold' : 'text-green-400 leading-relaxed'}>{line}</div>
                            ))}
                            <form onSubmit={handleCommand} className="flex gap-2 mt-2">
                                <span className="text-blue-400 font-semibold shrink-0">visitor@jhonatan-portfolio:~$</span>
                                <input
                                    type="text"
                                    value={cmd}
                                    onChange={e => setCmd(e.target.value)}
                                    className="bg-transparent outline-none flex-1 text-white dark:text-white border-none focus:ring-0 p-0 m-0"
                                    autoFocus
                                    spellCheck={false}
                                />
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 dark:text-neutral-400"
            >
                <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <FiArrowDown size={18} />
                </motion.div>
            </motion.div>
        </section>
    )
}
