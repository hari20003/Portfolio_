import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, Bot, MessageCircle, RotateCcw, Send, Sparkles, X } from 'lucide-react'
import './AskMyAI.css'

type Reply = { text: string; action?: { label: string; href: string }; secondaryAction?: { label: string; href: string } }
type ChatMessage = Reply & { id: number; role: 'assistant' | 'user' }

const welcome = 'Hi! Welcome to Tantra Gen Tech. I’m here to help you explore our services and find the right technology solution for your business. What would you like to know?'
const suggestions = [
  'What services does Tantra Gen Tech offer?',
  'Can you build a website for my business?',
  'How can AI automate my business processes?',
  'Do you develop AI agents and chatbots?',
  'Can you build a custom SaaS application?',
  'How can I discuss my project with your team?',
]
const contactAction = { label: 'Go to the project contact form', href: '#contact' }
const emailAction = { label: 'Email tantragentech@gmail.com', href: 'mailto:tantragentech@gmail.com' }

function answerFor(question: string): Reply {
  const q = question.toLowerCase().trim()
  if (/\b(price|prices|pricing|cost|budget|charge|rates|quote|estimate)\b/.test(q)) {
    return { text: 'Project cost depends on the scope, requirements, integrations, and level of support involved. TantraGenTech does not list fixed prices here. Share a little about what you need and the team can discuss a suitable scope.', action: contactAction }
  }
  if (/\b(email|email address|business email|email you)\b/.test(q)) {
    return { text: 'The business email is tantragentech@gmail.com. This opens your email application; it does not send anything from this chat.', action: emailAction }
  }
  if (/\b(generative ai|genai|large language model|\bllm\b|custom ai|ai solution)\b/.test(q)) {
    return { text: "Generative AI and custom AI solutions are listed among the studio’s capabilities. A suitable approach depends on the task, the information it should use, and how people review its output.", action: contactAction }
  }
  if (/\b(contact|email|talk|speak|discuss|start a project|hire|reach|team|consult)\b/.test(q)) {
    return { text: 'You can describe your goals in the project contact form, or email the business directly. This chat is informational; it does not submit a request or notify anyone.', action: contactAction, secondaryAction: emailAction }
  }
  if (/\b(projects|portfolio|work|examples|case stud(?:y|ies)|featured)\b/.test(q)) {
    return { text: 'The featured work section contains three illustrative product concepts: an AI-integrated coding exam portal, Framewise for computer-vision annotation, and an AI medical receptionist call flow. They demonstrate possible interfaces and workflows, not confirmed client deployments.', action: { label: 'See the featured concepts', href: '#work' } }
  }
  if (/\b(website|web site|landing page|e-?commerce|online presence)\b/.test(q)) {
    return { text: 'Yes. The studio offers website development, including business sites, landing pages, portfolios, e-commerce experiences, and conversion-focused web experiences. If you share your audience and the main thing the site should help people do, I can point you toward a useful starting scope.', action: contactAction }
  }
  if (/\b(mobile|android|ios|app development|mobile app|application)\b/.test(q)) {
    return { text: 'Mobile app development is listed as a service, including cross-platform and iOS or Android experiences. The right approach depends on the users, key workflows, and systems the app needs to connect with.', action: contactAction }
  }
  if (/\b(automate|automation|workflow|repetitive|process)\b/.test(q)) {
    return { text: 'TantraGenTech offers AI-powered business process automation and workflow integrations. A good first step is to identify the repetitive handoff, the tools involved, and where a person should review or approve the result. What process are you hoping to improve?', action: contactAction }
  }
  if (/\b(agentic|agent|agents|chatbot|chatbots|voice assistant|voice ai|receptionist|phone calls?)\b/.test(q)) {
    return { text: 'The studio lists AI agents, agentic AI, chatbots, and voice assistants among its services. These can be designed for defined tasks such as answering routine questions or supporting a workflow, with appropriate human review. The medical receptionist shown on the site is an illustrative call-flow concept, not a live booking service.', action: contactAction }
  }
  if (/\b(saas|subscription software|software as a service|product idea)\b/.test(q)) {
    return { text: 'SaaS development is one of the studio’s services, from shaping a product idea through building its software foundations. Useful first details include who the product serves, the core task it should solve, and any systems or data it needs to work with.', action: contactAction }
  }
  if (/\b(computer vision|image annotation|annotat|dataset|object label|machine learning|\bml\b|data science|analytics|data)\b/.test(q)) {
    return { text: 'TantraGenTech lists data analytics, machine learning, and custom AI solutions. The featured Framewise concept illustrates an image-annotation workspace with datasets, object labels, and sample confidence values; it is not presented as a deployed customer product.', action: { label: 'View the Framewise concept', href: '#work' } }
  }
  if (/\b(software|full.?stack|web app|application|api|dashboard|internal tool|custom system)\b/.test(q)) {
    return { text: 'The studio builds custom software and web applications, including full-stack applications, dashboards, APIs, internal tools, and business systems. Tell us what your team needs to accomplish and what tools it already uses, and we can help frame a solution.', action: contactAction }
  }
  if (/\b(service|services|what do you do|capabilit|help with|solutions)\b/.test(q)) {
    return { text: 'TantraGenTech offers website and software development, mobile apps, generative AI, AI agents, chatbots and voice assistants, business automation, SaaS development, data science, machine learning, computer vision, and custom digital solutions. Which area are you exploring?', action: contactAction }
  }
  if (/\b(hi|hello|hey|good morning|good afternoon)\b/.test(q)) {
    return { text: 'Hello! I can answer questions about TantraGenTech’s services, illustrative project concepts, and how to get in touch. What are you looking to build or improve?' }
  }
  return { text: 'I can help with TantraGenTech’s services, project concepts, and ways to get in touch. I don’t have enough business information to answer that one reliably. Is your question about a website, custom software, AI, automation, mobile apps, or data solutions?', action: contactAction }
}

function initialMessages(): ChatMessage[] {
  return [{ id: 0, role: 'assistant', text: welcome }]
}

export default function AskMyAI() {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [typing, setTyping] = useState(false)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<Set<number>>(new Set())
  const pendingRef = useRef(0)
  const nextIdRef = useRef(1)

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePanel()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    endRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'end' })
  }, [messages, typing, open])

  useEffect(() => () => timersRef.current.forEach(window.clearTimeout), [])

  function closePanel() {
    setOpen(false)
    requestAnimationFrame(() => launcherRef.current?.focus())
  }

  function sendMessage(value: string) {
    const text = value.trim()
    if (!text) return
    setMessages(current => [...current, { id: nextIdRef.current++, role: 'user', text }])
    setDraft('')
    pendingRef.current += 1
    setTyping(true)
    const timer = window.setTimeout(() => {
      timersRef.current.delete(timer)
      const reply = answerFor(text)
      setMessages(current => [...current, { id: nextIdRef.current++, role: 'assistant', ...reply }])
      pendingRef.current = Math.max(0, pendingRef.current - 1)
      setTyping(pendingRef.current > 0)
    }, 520)
    timersRef.current.add(timer)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    sendMessage(draft)
  }

  function clearChat() {
    timersRef.current.forEach(window.clearTimeout)
    timersRef.current.clear()
    pendingRef.current = 0
    setTyping(false)
    setMessages(initialMessages())
    setDraft('')
    inputRef.current?.focus()
  }

  return <div className="ask-ai-root">
    {open && <section className="ask-ai-panel" role="dialog" aria-labelledby="ask-ai-title" aria-modal="false">
      <header className="ask-ai-header">
        <span className="ask-ai-mark"><Bot size={18}/></span>
        <span className="ask-ai-heading"><b id="ask-ai-title">Tantra Gen Tech</b><small>Ask My AI · Business assistant</small></span>
        <button className="ask-ai-icon-button ask-ai-clear" type="button" onClick={clearChat} aria-label="Clear chat" title="Clear chat"><RotateCcw size={15}/></button>
        <button className="ask-ai-icon-button" type="button" onClick={closePanel} aria-label="Close Ask My AI"><X size={18}/></button>
      </header>
      <div className="ask-ai-messages" aria-live="polite" aria-relevant="additions text">
        {messages.map(message => <article className={`ask-ai-message ask-ai-${message.role}`} key={message.id}>
          {message.role === 'assistant' && <span className="ask-ai-message-icon"><Sparkles size={13}/></span>}
          <div className="ask-ai-message-content"><p>{message.text}</p>{message.action && <a className="ask-ai-action" href={message.action.href} onClick={message.action.href.startsWith('#') ? closePanel : undefined}>{message.action.label}<ArrowUpRight size={13}/></a>}{message.secondaryAction && <a className="ask-ai-action" href={message.secondaryAction.href}>{message.secondaryAction.label}<ArrowUpRight size={13}/></a>}</div>
        </article>)}
        {messages.length === 1 && <div className="ask-ai-suggestions" aria-label="Suggested questions">{suggestions.map(question => <button type="button" key={question} onClick={() => sendMessage(question)}>{question}<ArrowUpRight size={12}/></button>)}</div>}
        {typing && <div className="ask-ai-typing" role="status" aria-label="Preparing a response"><span/><span/><span/></div>}
        <div ref={endRef}/>
      </div>
      <form className="ask-ai-compose" onSubmit={onSubmit}>
        <label className="ask-ai-sr-only" htmlFor="ask-ai-input">Ask Tantra Gen Tech a question</label>
        <input id="ask-ai-input" ref={inputRef} value={draft} onChange={event => setDraft(event.target.value)} placeholder="Ask about services or ideas…" autoComplete="off" />
        <button type="submit" aria-label="Send message" disabled={!draft.trim()}><Send size={16}/></button>
      </form>
      <div className="ask-ai-footnote">Answers use the information on this website. Nothing is submitted from this chat.</div>
    </section>}
    <button className="ask-ai-launcher" ref={launcherRef} type="button" aria-haspopup="dialog" aria-expanded={open} aria-label={open ? 'Ask My AI is open' : 'Ask My AI'} onClick={() => setOpen(value => !value)}>
      {open ? <X size={17}/> : <MessageCircle size={17}/>}<span>{open ? 'Close chat' : 'Ask My AI'}</span>
    </button>
  </div>
}


