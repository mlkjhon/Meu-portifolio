import { useScrollReveal } from '../hooks/useScrollReveal'
import { FiCode, FiCpu, FiTarget } from 'react-icons/fi'

export default function About() {
    const ref = useScrollReveal<HTMLElement>()

    return (
        <section id="sobre" ref={ref} className="reveal-section py-32 px-6 relative" style={{ backgroundColor: 'var(--bg-main)' }}>
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div>
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-muted mb-6 tracking-wide uppercase"
                            style={{ backgroundColor: 'var(--tag-bg)' }}
                        >
                            <span className="text-primary">01.</span> Sobre Mim
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-main mb-6 leading-[1.15] tracking-tight">
                            A maturidade técnica não se mede apenas em anos.
                        </h2>

                        <div className="space-y-4 text-muted text-lg leading-relaxed">
                            <p>
                                Tenho 17 anos (de Andradina-SP) e encaro o desenvolvimento de software como ofício e paixão. Minha jornada autodidata
                                me ensinou a não apenas escrever código, mas a arquitetar soluções robustas para problemas do mundo real.
                            </p>
                            <p>
                                Acredito num pragmatismo técnico: aprender contruindo. Projetos como o <strong className="text-main font-semibold border-b-2 border-primary/30">FinanceAI</strong> não são apenas portfólio — são
                                aplicações fullstack reais, resolvendo estresses financeiros usando IA e arquiteturas escaláveis.
                            </p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800/50 flex items-center gap-6">
                            <div>
                                <p className="text-4xl font-bold text-main">1</p>
                                <p className="text-sm font-medium text-muted mt-1">Ano codando</p>
                            </div>
                            <div className="w-px h-12 bg-neutral-200 dark:bg-neutral-800"></div>
                            <div>
                                <p className="text-4xl font-bold text-main">100%</p>
                                <p className="text-sm font-medium text-muted mt-1">Autodidata</p>
                            </div>
                        </div>
                    </div>

                    {/* Cards / Visuals */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        {[
                            {
                                icon: FiCode,
                                title: 'Clean Code',
                                desc: 'Foco na legibilidade, manutenibilidade e nos padrões modernos de desenvolvimento.'
                            },
                            {
                                icon: FiCpu,
                                title: 'Fullstack Mindset',
                                desc: 'Do banco de dados ao botão no frontend, compreendo o ecossistema como um todo.'
                            },
                            {
                                icon: FiTarget,
                                title: 'Product Focus',
                                desc: 'Não crio apenas features soltas, crio funcionalidades focadas na experiência final.'
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`p-6 card-base hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 ${i === 2 ? 'sm:col-span-2 lg:col-span-1 xl:col-span-2' : ''}`}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-inner flex items-center justify-center text-primary mb-4"
                                    style={{ backgroundColor: 'var(--card-muted)' }}
                                >
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-main mb-2">{item.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
