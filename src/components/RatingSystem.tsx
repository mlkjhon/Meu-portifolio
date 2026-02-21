import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiSend, FiCheckCircle } from 'react-icons/fi'

export interface Evaluation {
    id: string
    name: string
    rating: number
    comment: string
    date: string
}

export default function RatingSystem({ onNewEvaluation }: { onNewEvaluation: (ev: Evaluation) => void }) {
    const [name, setName] = useState('')
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (rating === 0) return

        const newEval: Evaluation = {
            id: Date.now().toString(),
            name: name || 'Anônimo',
            rating,
            comment,
            date: new Date().toLocaleDateString('pt-BR')
        }

        onNewEvaluation(newEval)
        setIsSubmitted(true)

        // Reset form after some time
        setTimeout(() => {
            setIsSubmitted(false)
            setName('')
            setRating(0)
            setComment('')
        }, 3000)
    }

    return (
        <div className="card-base p-8 max-w-xl mx-auto">
            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="text-center mb-4">
                            <h3 className="text-2xl font-bold text-main">Avalie meu site</h3>
                            <p className="text-muted text-sm mt-1">Sua opinião é fundamental para minha evolução.</p>
                        </div>

                        {/* Star Rating */}
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`text-3xl transition-all duration-200 transform hover:scale-125 ${star <= (hover || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300 dark:text-neutral-700'
                                        }`}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    <FiStar />
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Seu Nome (Opcional)</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ex: Maria Silva"
                                    className="w-full rounded-xl px-4 py-3 text-main outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                                    style={{ backgroundColor: 'var(--card-bg)', border: '1.5px solid var(--card-border)', color: 'var(--text-main)' }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Seu Comentário</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="O que você achou do design e das funcionalidades?"
                                    rows={4}
                                    className="w-full rounded-xl px-4 py-3 text-main outline-none focus:ring-2 focus:ring-primary/30 transition-colors resize-none"
                                    style={{ backgroundColor: 'var(--card-bg)', border: '1.5px solid var(--card-border)', color: 'var(--text-main)' }}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg group ${rating > 0 ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:!bg-blue-600 hover:shadow-primary/20" : "bg-[var(--card-muted)] text-[var(--text-muted)] cursor-not-allowed opacity-50"}`}
                        >

                            <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            Enviar Avaliação
                        </button>
                    </motion.form>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-12 text-center"
                    >
                        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiCheckCircle size={48} />
                        </div>
                        <h3 className="text-2xl font-bold text-main">Obrigado pelo feedback!</h3>
                        <p className="text-muted mt-2">Sua avaliação foi registrada com sucesso.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
