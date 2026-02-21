import { useScrollReveal } from '../hooks/useScrollReveal'
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi'

export default function Contact() {
    const ref = useScrollReveal<HTMLElement>()

    return (
        <section id="contato" ref={ref} className="reveal-section py-32 px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-alt)' }}>
            {/* Glow effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16 px-4">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-muted mb-6 tracking-wide uppercase shadow-sm"
                        style={{ backgroundColor: 'var(--tag-bg)' }}
                    >
                        <span className="text-primary font-bold">04.</span> Próximos Passos
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-main mt-3 tracking-tight mb-6">
                        Vamos construir algo juntos?
                    </h2>
                    <p className="text-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        Estou em busca de minha primeira oportunidade oficial.
                        Se você procura um desenvolvedor júnior com mentalidade de produto e
                        maturidade técnica, minha caixa de entrada está sempre aberta.
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="grid sm:grid-cols-3 gap-4 mb-16">
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=jhonatan.moraes957@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center justify-center p-8 card-base hover:border-primary/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 backdrop-blur-sm"
                    >
                        <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center mb-4 text-primary group-hover:text-primary group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                            <FiMail size={24} />
                        </div>
                        <p className="font-semibold text-lg text-main mb-1">E-mail</p>
                        <p className="text-sm text-muted group-hover:text-primary transition-colors">Enviar uma mensagem</p>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/jhonatan-moraes-5136bb3b2/"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center justify-center p-8 card-base hover:border-blue-500/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 backdrop-blur-sm"
                    >
                        <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center mb-4 text-blue-500 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                            <FiLinkedin size={24} />
                        </div>
                        <p className="font-semibold text-lg text-main mb-1">LinkedIn</p>
                        <p className="text-sm text-muted group-hover:text-blue-400 transition-colors">Jhonatan Moraes</p>
                    </a>

                    <a
                        href="https://github.com/mlkjhon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center justify-center p-8 card-base hover:border-neutral-400 dark:border-neutral-600 shadow-sm hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                    >
                        <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center mb-4 text-[var(--text-main)] group-hover:text-[var(--btn-primary-bg)] group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                            <FiGithub size={24} />
                        </div>
                        <p className="font-semibold text-lg text-main mb-1">GitHub</p>
                        <p className="text-sm text-muted group-hover:text-[var(--text-main)] transition-colors">mlkjhon</p>
                    </a>
                </div>

                <div className="flex justify-center">
                    <div
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm font-medium text-main shadow-sm"
                        style={{ backgroundColor: 'var(--card-bg)' }}
                    >
                        <FiMapPin className="text-primary" />
                        Andradina, SP - Brasil
                    </div>
                </div>
            </div>
        </section>
    )
}
