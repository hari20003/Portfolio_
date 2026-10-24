import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, ArrowUpRight, BrainCircuit, Check, ChevronDown, Code2, Cpu, Layers3, Menu, PhoneCall, Send, Sparkles, X } from 'lucide-react'
import './style.css'
import AskMyAI from './components/AskMyAI'

const email = 'tantragentech@gmail.com'
const services = [
  ['01', 'Websites that work harder', 'Clear, fast digital experiences designed to earn trust and turn the right visits into real conversations.', 'Website Development'],
  ['02', 'Software built for your workflow', 'Full-stack applications, dashboards, APIs and internal tools shaped around how your team actually works.', 'Software Development'],
  ['03', 'Mobile, made useful', 'Thoughtful iOS and Android apps that bring your services closer to the people who use them.', 'Mobile App Development'],
  ['04', 'AI agents with a job to do', 'Task-focused assistants that connect approved tools and move repeatable work forward with human oversight.', 'AI Agents'],
  ['05', 'Automation that gives time back', 'Connect systems, remove repetitive handoffs and make everyday business processes more reliable.', 'AI Automation'],
  ['06', 'Chat and voice experiences', 'Helpful conversational interfaces for answering questions, guiding customers and handling routine requests.', 'Chatbots and Voice Assistants'],
  ['07', 'AI shaped around your data', 'Practical machine learning and generative AI features, designed with clear boundaries and measurable goals.', 'Custom AI Solutions'],
  ['08', 'SaaS from first sketch to launch', 'Validate, design and build the product foundations for your next software business.', 'SaaS Development'],
  ['09', 'Data into decisions', 'Analytics and machine learning workflows that help teams understand patterns and act with confidence.', 'Data Analytics and Machine Learning'],
  ['10', 'Digital growth, built on substance', 'Content, search and campaign foundations that bring your product to the people who need it.', 'Digital Marketing'],
]
const projects = [
  { id: '01', category: 'AI · EdTech · Software Development', title: 'AI-Integrated Exam Portal', desc: 'An AI-powered coding assessment platform featuring programming challenges, an in-browser code editor, code execution, automated evaluation, and AI-assisted feedback.', type: 'code' },
  { id: '02', category: 'Computer Vision · AI', title: 'Framewise', desc: 'A computer vision annotation workspace for organizing image datasets, reviewing object labels, and visualizing annotation confidence.', type: 'vision' },
  { id: '03', category: 'Voice AI · Agentic AI · Healthcare Automation', title: 'AI Medical Receptionist', desc: 'A voice-enabled AI assistant that answers patient calls, understands appointment requests, checks doctor availability, books appointments after patient confirmation, and provides booking confirmations.', type: 'care' },
]
const technologies = ['React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'OpenAI', 'AWS', 'Figma', 'Docker']

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12 })
    nodes.forEach(n => observer.observe(n))
    return () => observer.disconnect()
  }, [])
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 24); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn) }, [])
  const links = [['Services', '#services'], ['Our work', '#work'], ['About', '#about'], ['Contact', '#contact']]
  return <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
    <a className="brand" href="#home" aria-label="TantraGenTech home"><span className="brand-mark"><i/><i/><i/></span><span>tantra<span className="brand-light">gen</span>tech</span></a>
    <nav className={open ? 'nav nav-open' : 'nav'} aria-label="Main navigation">{links.map(([name, href]) => <a key={name} href={href} onClick={() => setOpen(false)}>{name}</a>)}<a className="nav-email" href={`mailto:${email}`} aria-label={`Email ${email}`} onClick={() => setOpen(false)}>{email}</a><a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={15}/></a></nav>
    <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
  </header>
}

function HeroVisual() {
  return <div className="hero-visual" aria-label="Illustration of connected software, AI and product systems" role="img">
    <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
    <div className="visual-core"><span className="core-symbol"><Sparkles size={25}/></span><span className="core-title">intelligence</span><small>made practical</small></div>
    <div className="float-card card-code"><div className="card-head"><span className="dots">● ● ●</span><span>workflow.ts</span></div><code><b>01</b> <em>const</em> signal = await<br/><b>02</b> &nbsp; systems.connect()<br/><b>03</b> <em>return</em> <strong>momentum</strong></code></div>
    <div className="float-card card-node"><span className="node-icon"><BrainCircuit size={18}/></span><span><b>AI layer</b><small>context-aware</small></span><span className="live-dot"/></div>
    <div className="float-card card-data"><span className="data-icon"><Layers3 size={17}/></span><span>PRODUCT<br/><b>experience</b></span><ArrowUpRight size={14}/></div>
    <div className="visual-label label-left">BUILT WITH INTENT <span>↗</span></div><div className="visual-label label-right">SYSTEMS THAT CONNECT</div>
  </div>
}

function Hero() {
 return <section id="home" className="hero">
  <div className="hero-copy"><div className="eyebrow reveal-on-load"><span className="eyebrow-line"/>AI <i>·</i> SOFTWARE <i>·</i> DIGITAL SOLUTIONS</div>
   <h1 className="hero-title reveal-on-load delay-1">Intelligent digital,<br/><span>engineered.</span></h1>
   <p className="hero-description reveal-on-load delay-2">We build thoughtful software, practical AI systems, and digital products that help businesses move forward.</p>
   <div className="hero-actions reveal-on-load delay-3"><a className="button button-light" href="#contact">Start a project <ArrowUpRight size={17}/></a><a className="button button-outline" href={`mailto:${email}`}>Email Us <ArrowUpRight size={15}/></a><a className="text-link" href="#work">Explore our work <ArrowDown size={15}/></a></div>
   <a className="hero-email reveal-on-load delay-3" href={`mailto:${email}`}>{email}<ArrowUpRight size={13}/></a>
  </div><HeroVisual/>
  <div className="hero-bottom"><span>INDEPENDENT DIGITAL STUDIO</span><span>IDEAS INTO SYSTEMS <ArrowDown size={13}/></span></div>
 </section>
}

function SectionIntro({ label, title, text, dark = false }: {label:string; title:string; text?:string; dark?:boolean}) {
 return <div className={`section-intro ${dark ? 'on-dark' : ''}`} data-reveal><div className="section-label"><span/> {label}</div><div className="intro-copy"><h2>{title}</h2>{text && <p>{text}</p>}</div></div>
}

function Services({ onSelect }: {onSelect:(value:string)=>void}) {
 return <section id="services" className="section services-section"><SectionIntro label="WHAT WE DO" title="Technology built around your business." text="We design, develop, and integrate digital solutions that solve real problems and create room for growth."/>
   <div className="services-grid">{services.map(([n,title,desc,key],i)=><button className="service-row" key={n} onClick={()=>onSelect(key)} data-reveal style={{transitionDelay:`${(i%2)*70}ms`}}><span className="service-number">{n}</span><span className="service-main"><b>{title}</b><small>{desc}</small></span><span className="service-action" aria-label={`Discuss ${title}`}><ArrowUpRight size={19}/></span></button>)}</div>
   <div className="services-note" data-reveal><span>Not sure where to begin?</span><a href="#contact">Tell us what you’re working on <ArrowRight size={15}/></a></div>
 </section>
}

function Demo({ type }: {type:string}) {
 if (type === 'code') return <div className="demo demo-code"><div className="demo-top"><span>EXAM PORTAL <i>AI CODING ASSESSMENT</i></span><span className="demo-status"><span/> DEMO WORKSPACE</span></div><div className="demo-body"><aside className="demo-rail"><span className="rail-active">01</span><span>02</span><span>03</span><span>···</span></aside><div className="code-window"><div className="code-window-head"><span>solution.py</span><span>Python 3.12</span></div><div className="code-lines"><p><i>01</i> <b>def</b> two_sum(nums, target):</p><p><i>02</i> &nbsp;&nbsp;seen = {'{}'}</p><p><i>03</i> &nbsp;&nbsp;<em>for</em> i, value <em>in</em> enumerate(nums):</p><p><i>04</i> &nbsp;&nbsp;&nbsp;&nbsp;needed = target - value</p><p className="active-line"><i>05</i> &nbsp;&nbsp;&nbsp;&nbsp;<span className="cursor"/></p><p><i>06</i> &nbsp;&nbsp;<span className="comment"># your solution continues here</span></p><p className="ai-feedback-line"><i>AI</i> Review: consider the empty-input case.</p></div><div className="run-button">▶ &nbsp; Run tests</div><div className="simulated-result"><Check size={11}/> SAMPLE EXECUTION · OUTPUT PREVIEW</div></div></div><div className="demo-foot"><span>ILLUSTRATIVE ASSESSMENT</span><span>AI FEEDBACK <b>ENABLED</b></span></div></div>
 if (type === 'vision') return <div className="demo demo-vision"><div className="demo-top"><span>FRAMEWISE <i>ANNOTATION STUDIO</i></span><span className="demo-status">PROJECT / FIELD STUDY</span></div><div className="vision-canvas"><div className="vision-photo"><div className="bbox box-one"><label>person <b>0.98</b></label></div><div className="bbox box-two"><label>bicycle <b>0.94</b></label></div><div className="photo-grid"/><span className="photo-caption">SAMPLE FRAME · 000248</span></div><div className="vision-side"><span className="side-label">ANNOTATIONS <b>02</b></span><div><i className="legend green"/><span>person<br/><small>conf. 98.2%</small></span><b>↗</b></div><div><i className="legend purple"/><span>bicycle<br/><small>conf. 94.6%</small></span><b>↗</b></div><button>＋ &nbsp; Add label</button></div></div><div className="demo-foot"><span>DATASET / URBAN-MOBILITY</span><span>FRAME <b>248 / 1,200</b></span></div></div>
 return <div className="demo demo-care" role="group" aria-label="Illustrative incoming call, conversation, appointment selection, and booking confirmation"><div className="demo-top"><span>MEDICAL RECEPTIONIST <i>VOICE ASSISTANT</i></span><span className="demo-status"><span/> SIMULATED CALL</span></div><div className="care-content"><div className="call-stack"><div className="incoming-call"><span className="call-ring"><PhoneCall size={14}/></span><span className="call-detail"><b>Incoming patient call</b><small>APPOINTMENT REQUEST</small></span><i>ANSWERED</i></div><div className="care-chat"><div className="chat-date">CALL · 01:24</div><div className="voice-wave" aria-label="Illustrative voice activity"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="bubble bot">Hello, I can help schedule an appointment. What day works for you?</div><div className="bubble user">Thursday afternoon, please.</div><div className="bubble bot">The doctor has 2:30 and 4:00 available.</div><div className="bubble user">4:00 works. Please book it.</div><div className="slots"><span>2:30 PM</span><span className="slot-selected">4:00 PM <Check size={12}/></span></div></div></div><div className="booking-card"><div className="booking-icon"><Check size={17}/></div><span className="side-label">BOOKING CONFIRMED</span><h4>Consultation</h4><p>Thursday<br/>4:00 — 4:30 PM</p><div className="booking-rule"/><small>Sample availability · confirmation after patient approval</small></div></div><div className="demo-foot"><span>ILLUSTRATIVE CALL FLOW</span><span>SYNTHETIC DEMO · NO PATIENT DATA</span></div></div>
}

function Projects() {
 const [active, setActive] = useState(0)
 const project = projects[active]
 return <section id="work" className="section work-section"><SectionIntro label="SELECTED CONCEPTS" title="Good ideas deserve a clear path to real life." text="A look at the kinds of thoughtful, human-centered systems we love to build."/>
  <div className="project-showcase" data-reveal><div className="project-tabs" role="tablist" aria-label="Featured projects">{projects.map((p,i)=><button id={`project-tab-${p.id}`} role="tab" aria-controls="project-panel" aria-selected={active===i} tabIndex={active===i?0:-1} className={active===i?'project-tab selected':'project-tab'} key={p.id} onClick={()=>setActive(i)} onKeyDown={event=>{let next=i;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(i+1)%projects.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(i+projects.length-1)%projects.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=projects.length-1;if(next!==i){event.preventDefault();setActive(next);document.getElementById(`project-tab-${projects[next].id}`)?.focus()}}}><span>{p.id}</span><span className="project-tab-title">{p.title}</span><ArrowUpRight size={14}/></button>)}</div>
   <div className="project-display" id="project-panel" role="tabpanel" aria-labelledby={`project-tab-${project.id}`}><div className="project-description"><div className="project-category">{project.category}</div><h3>{project.title}</h3><p>{project.desc}</p><span className="concept-note"><Sparkles size={14}/> CONCEPT DEMONSTRATION</span></div><div className="project-demo" key={project.id}><Demo type={project.type}/></div></div>
  </div><p className="work-disclaimer">These are illustrative product concepts created to demonstrate interaction and engineering direction.</p>
 </section>
}

function AISection() {
 return <section className="ai-section"><div className="ai-grid"/><div className="ai-inner"><div className="ai-copy" data-reveal><div className="section-label on-dark"><span/> THOUGHTFUL BY DESIGN</div><h2>AI is powerful.<br/><span>Good judgment is the product.</span></h2><p>We start with the work that needs doing. Then we choose the right tools, set useful boundaries, and keep people in the loop where it matters.</p><a className="ai-link" href="#contact">Explore an AI use case <ArrowRight size={16}/></a></div><div className="ai-diagram" data-reveal><div className="diagram-ring ring-a"/><div className="diagram-ring ring-b"/><div className="diagram-core"><BrainCircuit size={31}/><span>INTELLIGENCE</span></div><div className="diagram-node node-a"><Cpu size={15}/> YOUR SYSTEMS</div><div className="diagram-node node-b"><Code2 size={15}/> CLEAR RULES</div><div className="diagram-node node-c"><Check size={15}/> HUMAN REVIEW</div><span className="diagram-caption">A USEFUL AI SYSTEM<br/>STARTS WITH INTENT.</span></div></div></section>
}

function Process() {
 const items=[['01','Listen closely','Understand the context, the people involved, and the outcome that matters.'],['02','Shape the solution','Agree on a clear scope, useful milestones, and the simplest path to a strong result.'],['03','Build with care','Make progress visible, test assumptions early, and keep quality in the conversation.'],['04','Launch and learn','Ship thoughtfully, gather feedback, and make a plan for what should improve next.']]
 return <section className="section process-section"><SectionIntro label="HOW WE WORK" title="A clear process. A better outcome." text="Good work comes from shared understanding and steady progress."/><div className="process-grid">{items.map(([n,title,desc])=><article className="process-item" key={n} data-reveal><span>{n}</span><div className="process-marker"><i/></div><h3>{title}</h3><p>{desc}</p></article>)}</div></section>
}

function About() {
 return <section id="about" className="about-section"><div className="about-left" data-reveal><div className="section-label on-dark"><span/> A SMALL STUDIO, BUILT FOR BIG IDEAS</div><h2>Curiosity in the details.<br/><span>Clarity in the outcome.</span></h2></div><div className="about-right" data-reveal><p>TantraGenTech is an independent digital studio working at the intersection of software, AI, and product design. We pair technical craft with a grounded understanding of the problem in front of us.</p><p>Whether you are refining an idea or ready to improve an existing system, we bring a practical, collaborative approach from first conversation through delivery.</p><a href="#contact" className="text-link light-link">A little about your idea <ArrowUpRight size={15}/></a></div><div className="about-foot"><span>INDEPENDENT BY DESIGN</span><span>BUILT AROUND YOUR NEXT STEP</span></div></section>
}

function Tech() { return <section className="tech-section"><div className="tech-heading" data-reveal><div className="section-label"><span/> OUR TOOLKIT</div><h2>The right tools for<br/>the right problem.</h2><p>Technology choices follow the product and the people who use it.</p></div><div className="tech-list" data-reveal>{technologies.map((t,i)=><span key={t}><i>{String(i+1).padStart(2,'0')}</i>{t}</span>)}</div></section> }

function ContactForm({ selectedService }: {selectedService:string}) {
 const [status,setStatus]=useState('idle')
 const [service,setService]=useState(selectedService)
 useEffect(()=>{ if(selectedService) setService(selectedService) },[selectedService])
 const submit=(e:React.FormEvent<HTMLFormElement>)=>{e.preventDefault();const data=new FormData(e.currentTarget);const name=String(data.get('name')).trim();const desc=String(data.get('description')).trim();const reply=String(data.get('email')).trim();if(!name||!desc||!/^\S+@\S+\.\S+$/.test(reply)){setStatus('invalid');return}const subject=encodeURIComponent(`Project enquiry — ${service || 'New project'}`);const body=encodeURIComponent(`Name: ${name}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')||'Not provided'}\nService: ${service||'Not sure yet'}\nBudget: ${data.get('budget')||'Not sure yet'}\nPreferred contact: ${data.get('contact')||'Email'}\n\nProject details:\n${desc}`);window.location.href=`mailto:${email}?subject=${subject}&body=${body}`;setStatus('ready')}
 return <form className="contact-form" onSubmit={submit} noValidate><div className="form-note"><span><i className="required-star">*</i> Required fields</span><span>Usually a good first step takes 2 minutes.</span></div><div className="form-grid"><label>Your name <i>*</i><input name="name" autoComplete="name" placeholder="How should we address you?" required/></label><label>Work email <i>*</i><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required/></label><label>Company <span>OPTIONAL</span><input name="company" autoComplete="organization" placeholder="Where you work"/></label><label>What can we help with?<select value={service} onChange={e=>setService(e.target.value)}><option value="">Choose a service</option>{['Website Development','Software Development','Mobile App Development','Agentic AI','AI Agents','Chatbots and Voice Assistants','AI Automation','Custom AI Solutions','SaaS Development','Data Analytics and Machine Learning','Digital Marketing','Other'].map(option=><option key={option}>{option}</option>)}</select></label><label>Approximate budget <span>OPTIONAL</span><select name="budget"><option value="">Not sure yet</option><option>Under ₹50,000</option><option>₹50,000–₹2,00,000</option><option>₹2,00,000–₹5,00,000</option><option>₹5,00,000+</option><option>Discuss together</option></select></label><label>Preferred contact <span>OPTIONAL</span><select name="contact"><option>Email</option><option>Video call</option></select></label><label className="form-wide">A little about the project <i>*</i><textarea name="description" rows={4} placeholder="What are you hoping to make or improve? A few sentences is plenty." required/></label></div>{status==='invalid'&&<p className="form-status error" role="alert">Please enter your name, a valid email address, and a short project description.</p>}{status==='ready'&&<p className="form-status" role="status">Your email app should open with the enquiry ready to send. If it did not, email <a href={`mailto:${email}`}>{email}</a>.</p>}<div className="form-submit"><button className="button button-light" type="submit">Prepare your enquiry <Send size={15}/></button><span>Your details stay in your email app.<br/>Nothing is sent automatically.</span></div></form>
}

function Contact({ selectedService }: {selectedService:string}) { return <section id="contact" className="contact-section"><div className="contact-inner"><div className="contact-intro" data-reveal><div className="section-label on-dark"><span/> START A CONVERSATION</div><h2>Let’s make<br/><span>something useful.</span></h2><p>Tell us what you have in mind. We’ll get back to you with a clear next step.</p><a className="contact-email" href={`mailto:${email}`} aria-label={`Email ${email}`}>{email}<ArrowUpRight size={15}/></a><a className="button button-light contact-email-button" href={`mailto:${email}`}>Email Us <ArrowUpRight size={15}/></a><div className="contact-side-note"><i/> GOOD PROJECTS START WITH A GOOD CONVERSATION</div></div><div className="contact-panel" data-reveal><ContactForm selectedService={selectedService}/></div></div></section> }

function Footer() { return <footer className="footer"><div className="footer-main"><div className="footer-brand-block"><a className="brand" href="#home"><span className="brand-mark"><i/><i/><i/></span><span>tantra<span className="brand-light">gen</span>tech</span></a><p>Intelligent digital experiences<br/>and AI-powered solutions.</p></div><div className="footer-column"><span>EXPLORE</span><a href="#services">Services</a><a href="#work">Our work</a><a href="#about">About</a><a href="#contact">Contact</a></div><div className="footer-column"><span>CAPABILITIES</span><a href="#services">Software & web</a><a href="#services">AI & automation</a><a href="#services">Mobile products</a><a href="#services">Data & growth</a></div><div className="footer-column"><span>SAY HELLO</span><a href={`mailto:${email}`}>{email} <ArrowUpRight size={13}/></a><a href="#contact">Start a project <ArrowUpRight size={13}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} TANTRAGENTECH</span><span>AI · SOFTWARE · DIGITAL PRODUCTS</span><a href={`mailto:${email}?subject=Privacy%20or%20terms%20question`}>Privacy & terms <ArrowUpRight size={12}/></a></div><p className="legal-note">Privacy and terms information is available on request and should be reviewed for your business before publication.</p></footer> }

function App() { const [selectedService,setSelectedService]=useState(''); useReveal(); const choose=(v:string)=>{setSelectedService(v);document.querySelector('#contact')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}; return <><Header/><main><Hero/><Services onSelect={choose}/><Projects/><AISection/><Process/><About/><Tech/><Contact selectedService={selectedService}/></main><Footer/><AskMyAI/></> }

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)







