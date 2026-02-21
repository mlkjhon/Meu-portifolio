import { useState } from 'react'
import { FiMessageSquare, FiX, FiSend, FiTrash2 } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { GoogleGenerativeAI } from '@google/generative-ai'

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: 'Olá! Eu sou o Jhonatan. Fique à vontade para me fazer perguntas sobre minha experiência, projetos e tecnologias.',
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
    ])

    const QUICK_SUGGESTIONS = [
        "Quais seus principais projetos?",
        "Quais tecnologias você domina?",
        "Como entrar em contato?",
        "Fale sobre seu background."
    ]

    const clearChat = () => {
        setMessages([{
            role: 'assistant',
            text: 'Conversa recomeçada! Como posso te ajudar agora?',
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }])
    }

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMsg = input.trim()
        const currTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        setMessages((prev) => [...prev, { role: 'user', text: userMsg, time: currTime }])
        setInput('')
        setIsLoading(true)

        try {
            const systemPrompt = `Você é um clone virtual inteligente de Jhonatan Moraes (GitHub: mlkjhon). 
Sua missão é atuar como se fosse o próprio Jhonatan conversando de forma natural, profissional e muito confiante com visitantes, recrutadores e empresas lendo o seu portfólio. NUNCA diga que você é um "assistente" ou "terceiro", fale sempre na PRIMEIRA PESSOA do singular ("Eu desenvolvi", "Minhas habilidades").

Perfil do Jhonatan:
- 17 anos, residente em Andradina/SP. Estudante dedicado do Senai São Paulo.
- Objetivo: Primeira oportunidade oficial como Desenvolvedor Júnior Fullstack.
- Hard Skills: React, Node.js, TypeScript, Next.js, PostgreSQL, Tailwind CSS, integrações com IA.
- Diferencial: Maturidade técnica avançada para a idade, com foco em produtos reais. Ele construiu sistemas completos (como o FinanceAI - um SaaS financeiro inteligente).
- Soft Skills: Autodidata agressivo, resolvedor de problemas, comunicação clara e "mentalidade de dono" (product-minded).

Regras de Resposta:
1. Seja educado, humano, carismático e conciso (evite textos gigantescos).
2. Se o usuário perguntar sobre a falta de experiência em empresas, argumente que os projetos práticos dele (como o FinanceAI) têm nível de produção e mostram que ele está mais que pronto para agregar valor desde o dia 1.
3. Se perguntarem como contatá-lo, sugira o LinkedIn ou o e-mail (jhonatan.moraes957@gmail.com).
4. NUNCA invente tecnologias que ele não usa ou experiências falsas. Use o que está aqui para impressionar o usuário.
5. Fale sempre em português do Brasil, de forma clara.

Pergunta do visitante: ${userMsg}`;

            const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyCvCXbzbFrpCfHlj8IjlYJ21vOWLPtFQ3I";
            if (!apiKey) {
                throw new Error('Chave da API Gemini não configurada.');
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await model.generateContent(systemPrompt);
            let responseText = result.response.text();

            // Remove asteriscos de negrito e listas markdown
            responseText = responseText.replace(/\*\*/g, '');
            responseText = responseText.replace(/\* /g, '• ');

            setMessages((prev) => [...prev, {
                role: 'assistant',
                text: responseText,
                time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            }])
        } catch (error) {
            console.error(error)
            setMessages((prev) => [...prev, {
                role: 'assistant',
                text: 'Desculpe, minha IA está temporariamente indisponível. Caso seja o dono do site, verifique se a VITE_GEMINI_API_KEY foi adicionada nas variáveis de ambiente da Vercel.',
                time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-xl hover:scale-110 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
                aria-label="Abrir Assistente de IA"
            >
                <FiMessageSquare size={24} />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400"></span>
                </span>
            </button>

            {/* Chat Widget Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.9 }}
                        transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                        className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[380px] h-[500px] rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex items-center justify-between shadow-lg relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white overflow-hidden shadow-inner">
                                    <img src="https://avatars.githubusercontent.com/mlkjhon" alt="Jhonatan" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm leading-tight flex items-center gap-2">
                                        Jhonatan <span className="px-1.5 py-0.5 rounded text-[9px] bg-white/20 text-white uppercase font-bold tracking-widest border border-white/10">DEV</span>
                                    </h3>
                                    <p className="text-[11px] text-white/80 font-medium">Bate-papo Inteligente</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={clearChat}
                                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                    title="Limpar Conversa"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                    aria-label="Fechar"
                                >
                                    <FiX size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Chat History Area */}
                        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 custom-scrollbar" style={{ backgroundColor: 'var(--card-muted)' }}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className={`flex flex-col max-w-[85%] ${msg.role === 'assistant' ? 'self-start' : 'self-end'}`}
                                >
                                    <div className={`p-3.5 text-sm leading-relaxed rounded-2xl shadow-sm border ${msg.role === 'assistant'
                                        ? 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-main)] rounded-tl-sm'
                                        : 'bg-primary border-primary text-[var(--btn-primary-text)] rounded-tr-sm'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                    <span className={`text-[9px] text-neutral-500 mt-1.5 px-1 font-medium ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                        {msg.time}
                                    </span>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="self-start flex flex-col max-w-[85%]"
                                >
                                    <div className="bg-[var(--card-bg)] border-[1.5px] border-[var(--card-border)] shadow-sm rounded-2xl rounded-tl-sm p-4 flex items-center justify-center gap-1.5 w-fit">
                                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-[var(--btn-primary-bg)] rounded-full" />
                                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[var(--btn-primary-bg)] rounded-full" />
                                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-[var(--btn-primary-bg)] rounded-full" />
                                    </div>
                                </motion.div>
                            )}

                            {/* Quick Suggestions */}
                            {messages.length === 1 && !isLoading && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {QUICK_SUGGESTIONS.map((suggestion, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setInput(suggestion)
                                                // Trigger send if possible, but for now just setting input is simple
                                            }}
                                            className="px-3 py-1.5 text-[11px] rounded-full transition-all shadow-sm font-medium hover:!border-[var(--btn-primary-bg)] hover:!text-[var(--btn-primary-bg)] bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)]"
                                        >
                                            {suggestion}

                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-[var(--card-bg)] border-t border-[var(--card-border)]">
                            <form onSubmit={handleSend} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Faça uma pergunta..."
                                    className="w-full pl-4 pr-12 py-3.5 bg-[var(--card-muted)] border border-[var(--card-border)] rounded-xl focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)]"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 p-2 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-lg hover:!bg-blue-600 disabled:opacity-40 disabled:hover:!bg-[var(--btn-primary-bg)] transition-colors shadow-sm"
                                    aria-label="Enviar mensagem"
                                >
                                    <FiSend size={16} />
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <p className="text-[10px] text-[var(--text-muted)] font-medium">Bate-papo gerenciado pela interface interativa.</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
