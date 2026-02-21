import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RatingSystem from './RatingSystem'
import type { Evaluation } from './RatingSystem'
import { FiStar } from 'react-icons/fi'

export default function Testimonials() {
    const [evaluations, setEvaluations] = useState<Evaluation[]>([])

    useEffect(() => {
        const saved = localStorage.getItem('site_evaluations')
        if (saved) {
            setEvaluations(JSON.parse(saved))
        }
    }, [])

    const handleNewEvaluation = (newEval: Evaluation) => {
        const updated = [newEval, ...evaluations]
        setEvaluations(updated)
        localStorage.setItem('site_evaluations', JSON.stringify(updated))
    }

    const averageRating = (evaluations.reduce((acc, curr) => acc + curr.rating, 0) / evaluations.length || 0).toFixed(1)

    return (
        <section id="avaliacoes" className="py-32 px-6 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left: Stats & Form */}
                    <div className="space-y-12">
                        <div>
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-muted mb-6 tracking-wide uppercase shadow-sm"
                                style={{ backgroundColor: 'var(--tag-bg)' }}
                            >
                                <span className="text-primary">05.</span> Avaliações
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-bold text-main mt-3 tracking-tight">
                                O que as pessoas <br /> estão dizendo.
                            </h2>

                            <div className="mt-8 flex items-center gap-4">
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <FiStar className="fill-yellow-400" />
                                    <span className="text-3xl font-bold text-main">{averageRating}</span>
                                </div>
                                <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800"></div>
                                <div className="text-muted">
                                    <p className="font-bold text-main">{evaluations.length}</p>
                                    <p className="text-sm">Total de avaliações</p>
                                </div>
                            </div>
                        </div>

                        <RatingSystem onNewEvaluation={handleNewEvaluation} />
                    </div>

                    {/* Right: List of Evaluations */}
                    <div className="space-y-6 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                        <AnimatePresence>
                            {evaluations.map((ev) => (
                                <motion.div
                                    key={ev.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="card-base p-6 hover:border-primary/20 transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="font-bold text-main">{ev.name}</p>
                                            <p className="text-xs text-muted">{ev.date}</p>
                                        </div>
                                        <div className="flex gap-0.5 text-yellow-400">
                                            {[...Array(ev.rating)].map((_, i) => (
                                                <FiStar key={i} className="fill-yellow-400" size={14} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-muted leading-relaxed italic text-sm">
                                        "{ev.comment}"
                                    </p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    )
}
