import { useState, useEffect, useRef } from 'react'
import { FiMessageSquare, FiX, FiSend, FiTrash2, FiCheckCircle } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Message {
    role: string;
    text: string;
    time: string;
    id?: number;
}

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            text: 'Olá! Eu sou o Jhonatan. Como posso te ajudar a conhecer meus projetos e habilidades hoje?',
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
    ])

    const scrollRef = useRef<HTMLDivElement>(null)

    // Auto-scroll para o fim da conversa
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isLoading])

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
            const systemPrompt = `Você é um clone virtual altamente inteligente, carismático e persuasivo de Jhonatan Moraes (@mlkjhon). 
Sua missão é conversar como o próprio Jhonatan com recrutadores e líderes técnicos, vendendo seu potencial de forma impecável.
Fale sempre na 1ª pessoa ("Eu desenvolvi", "Minha visão"). NUNCA diga que você é uma IA ou assistente.

Contexto Chave:
- 17 anos (Andradina/SP). Estudante obstinado do Senai SP.
- Perfil: Desenvolvedor Júnior Fullstack com mentalidade de produto e maturidade técnica acima da média.
- Skillset: React, Node.js, TypeScript, Next.js, PostgreSQL e integrações avançadas de IA.
- Destaque: Autor do FinanceAI, um SaaS financeiro robusto que resolve problemas reais de gestão.

Diretrizes de Resposta:
1. EQUILÍBRIO NA FALA: Seja conciso e direto, mas não "seco". Suas respostas devem ser curtas (geralmente um parágrafo bem escrito), mas profundas o suficiente para demonstrar inteligência.
2. PODER DE PERSUASÃO: Cada resposta deve reforçar que, apesar da idade, você entrega código de nível sênior e tem uma curva de aprendizado acelerada.
3. ARGUMENTO DE EXPERIÊNCIA: Se questionarem sua idade ou falta de empresa no currículo, foque no FinanceAI. Explique que construir um produto do zero exige mais competência do que muitas tarefas de manutenção em empresas grandes.
4. CALL TO ACTION: Se pedirem contato, responda: "Podemos conversar agora mesmo pelo LinkedIn ou pelo meu e-mail: jhonatan.moraes957@gmail.com".
5. TOM DE VOZ: Profissional, ambicioso, mas humilde e focado em resolver problemas técnicos e de negócio.

Pergunta: ${userMsg}`;

            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error('Chave da API Gemini não configurada.');
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            // Inicia streaming
            const result = await model.generateContentStream(systemPrompt);

            // Adiciona uma mensagem vazia para o assistente
            const assistantMsgId = Date.now();
            setMessages((prev) => [...prev, {
                role: 'assistant',
                text: '',
                time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                id: assistantMsgId // Usando ID para facilitar atualização
            }]);

            let fullText = '';
            for await (const chunk of result.stream) {
                let chunkText = chunk.text();
                // Limpeza de markdown em tempo real (simplificada)
                chunkText = chunkText.replace(/\*\*/g, '');
                fullText += chunkText;

                setMessages((prev) => prev.map(msg =>
                    msg.id === assistantMsgId ? { ...msg, text: fullText.replace(/\* /g, '• ') } : msg
                ));
            }

        } catch (error: any) {
            console.error(error)
            const erroReal = error?.message || 'Erro Desconhecido';
            setMessages((prev) => [...prev, {
                role: 'assistant',
                text: `Desculpe, minha IA está temporariamente indisponível. Erro técnico: ${erroReal} | Verifique a VITE_GEMINI_API_KEY no Vercel.`,
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
                        <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white p-4 flex items-center justify-between shadow-2xl relative z-10 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 overflow-hidden shadow-2xl ring-2 ring-blue-500/20">
                                        <img src="https://avatars.githubusercontent.com/mlkjhon" alt="Jhonatan" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-indigo-900 shadow-sm animate-pulse"></div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="font-bold text-[15px] tracking-tight">Jhonatan Moraes</h3>
                                        <FiCheckCircle className="text-blue-400 fill-blue-400/20" size={13} title="Identidade Verificada" />
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                        <p className="text-[10px] text-blue-100/70 font-semibold uppercase tracking-wider">Online agora</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={clearChat}
                                    className="p-2.5 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                                    title="Reiniciar chat"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2.5 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                                    aria-label="Minimizar"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Chat History Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-5 overflow-y-auto flex flex-col gap-5 custom-scrollbar scroll-smooth"
                            style={{
                                backgroundColor: 'rgba(15, 23, 42, 0.98)',
                                backgroundImage: 'radial-gradient(circle at top right, rgba(37, 99, 235, 0.05), transparent 40%)'
                            }}
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex flex-col max-w-[88%] ${msg.role === 'assistant' ? 'self-start' : 'self-end'}`}
                                >
                                    <div className={`p-4 text-[13.5px] leading-relaxed rounded-2xl shadow-md transition-all ${msg.role === 'assistant'
                                        ? 'bg-[#1e293b] border border-white/5 text-slate-100 rounded-tl-none shadow-indigo-500/5'
                                        : 'bg-blue-600 border border-blue-500/50 text-white rounded-tr-none shadow-blue-500/20'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                    <span className={`text-[9px] text-slate-500 mt-2 px-1 font-bold uppercase tracking-widest ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                        {msg.time}
                                    </span>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="self-start flex flex-col max-w-[85%]"
                                >
                                    <div className="bg-[#1e293b] border border-white/5 shadow-inner rounded-2xl rounded-tl-none p-4 flex items-center justify-center gap-1.5 w-16">
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
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
                        <div className="p-4 bg-[#0f172a] border-t border-white/5 shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
                            <form onSubmit={handleSend} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Escreva uma mensagem..."
                                    className="w-full pl-5 pr-12 py-3.5 bg-[#1e293b] border border-white/5 rounded-2xl focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm text-slate-100 placeholder:text-slate-500 shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-30 disabled:grayscale transition-all shadow-lg active:scale-95"
                                    aria-label="Enviar mensagem"
                                >
                                    <FiSend size={18} />
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Powered by Gemini 2.5 Flash</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
