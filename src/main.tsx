import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import portrait from './assets/akhil-portrait.png';
import './style.css';

function FadeIn({ children, delay = 0, y = 28, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .7, delay, ease: [.25,.1,.25,1] }}>{children}</motion.div>;
}
function ContactButton({ href = '#contact', label = 'Contact me' }: { href?: string; label?: string }) {
  const external = href.startsWith('http');
  return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="contact-btn">{label} <ArrowUpRight size={17}/></a>;
}
function Magnet({ children }: { children: ReactNode }) { const ref=useRef<HTMLDivElement>(null); const [t,setT]=useState('translate3d(0,0,0)'); const move=(e:React.MouseEvent<HTMLDivElement>)=>{const r=ref.current?.getBoundingClientRect();if(!r)return;const x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;setT(`translate3d(${x/11}px,${y/11}px,0)`)}; return <div ref={ref} className="magnet" onMouseMove={move} onMouseLeave={()=>setT('translate3d(0,0,0)')} style={{transform:t}}>{children}</div>}

function Hero(){return <section className="hero"><FadeIn y={-18} className="nav"><a href="#about">About me</a><a href="#projects">Projects</a><a href="#certificates">Certificates</a><a href="#contact">Contact</a></FadeIn><FadeIn delay={.12} className="title-wrap"><p className="eyebrow">Digital maker · India</p><h1>Hi, I&apos;m <span>Akhil</span></h1></FadeIn><FadeIn delay={.45} className="portrait-motion"><div className="portrait"><Magnet><img src={portrait} alt="Illustrated portrait of Akhil Roy"/></Magnet></div></FadeIn><div className="hero-bottom"><FadeIn delay={.28}><p>video editor · developer · creator<br/>building interactive digital experiences</p></FadeIn><FadeIn delay={.4}><ContactButton/></FadeIn></div></section>}

const aboutText="I don't follow trends; I explore what comes next. From creative storytelling and video editing to building interactive web experiences, I work at the intersection of curiosity, craft, and technology.";
function RevealText(){const ref=useRef<HTMLParagraphElement>(null);const {scrollYProgress}=useScroll({target:ref,offset:['start .8','end .25']});return <p ref={ref} className="about-copy">{aboutText.split('').map((c,i)=><Letter key={i} c={c} i={i} p={scrollYProgress}/>)}</p>}
function Letter({c,i,p}:{c:string;i:number;p:MotionValue<number>}){const opacity=useTransform(p,[i/aboutText.length*.65,Math.min(1,i/aboutText.length*.65+.32)],[.18,1]);return <motion.span style={{opacity}}>{c}</motion.span>}
function About(){return <section id="about" className="about"><div className="orb orb-a"/><div className="orb orb-b"/><FadeIn><p className="eyebrow">01 / core system</p><h2>About <span>me</span></h2></FadeIn><RevealText/><div className="about-tags" style={{marginTop:'2rem', marginBottom:'2rem', gap:'16px', display:'flex', flexWrap:'wrap'}}><span><MapPin size={16}/> India</span><span>Root user since 2002</span><span>Redefining limits</span></div><div style={{marginTop:'1rem'}}><ContactButton href="https://www.instagram.com/ideleo007/" label="Instagram"/></div></section>}
const repositories=[
  ['01','Sign Translator','Python and HTML implementation for real-time gesture-to-text translation. Built with computer vision and deep learning to help bridge communication gaps.','https://satyamroy007.github.io/sign-language-/','Computer vision'],
  ['02','Village Life','An immersive and interactive web experience that brings creative storytelling, HTML5, CSS3, and animation together.','https://satyamroy007.github.io/village-life/','Creative code'],
  ['03','Pixel Village Portfolio','A living world combining portfolio showcase with procedural generation, seasonal dynamics, and real-time weather simulation in JavaScript.','https://satyamroy007.github.io/portfilio/','Creative code'],
] as const;
function RepoCard({repo,index}:{repo:typeof repositories[number];index:number}){const ref=useRef<HTMLDivElement>(null);const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});const scale=useTransform(scrollYProgress,[0,1],[1,1-(2-index)*.025]);return <div ref={ref} className="repo-shell"><motion.article style={{scale,top:index*24}} className="repo"><div className="repo-top"><strong>{repo[0]}</strong><span>{repo[4]}</span></div><h3>{repo[1]}</h3><p>{repo[2]}</p><a href={repo[3]} target={repo[3]==='#'?undefined:'_blank'} rel="noreferrer">Open repository <Github size={17}/></a></motion.article></div>}
function Projects(){return <section id="projects" className="projects"><FadeIn><p className="eyebrow">02 / selected work</p><h2>Repositories</h2></FadeIn>{repositories.map((repo,i)=><RepoCard key={repo[0]} repo={repo} index={i}/>)}</section>}

const certificates=['Video Editor','Google Cloud','Python Data Science','TensorFlow','AWS Cloud9','Gen-AI Analytics','Keras Deep Learning','SEO Strategy','Brand Marketing','FB Ads Insights','Cloud Native Dev','Software Engineering'];
function Certificates(){return <section id="certificates" className="certificates"><FadeIn><p className="eyebrow">03 / credentials</p><h2>Certificates</h2></FadeIn><div className="cert-grid">{certificates.map((c,i)=><FadeIn key={c} delay={i*.035}><div className="cert"><span>✓</span>{c}</div></FadeIn>)}</div></section>}
function Contact(){return <footer id="contact"><div><p className="eyebrow">04 / secure inquiry</p><h2>Let&apos;s make<br/><span>something.</span></h2></div><div className="contact-links"><a href="mailto:satyam.roy02@gmail.com"><Mail/>satyam.roy02@gmail.com</a><a href="https://github.com/satyamroy007" target="_blank" rel="noreferrer"><Github/>github.com/satyamroy007</a><a href="https://www.linkedin.com/in/akhil-roy-bb0908234/" target="_blank" rel="noreferrer"><Linkedin/>LinkedIn <ArrowUpRight/></a></div></footer>}
function App(){return <main><Hero/><About/><Projects/><Certificates/><Contact/></main>}
const container = document.getElementById('root')!;
const root = (window as any).__reactRoot ?? createRoot(container);
(window as any).__reactRoot = root;
root.render(<App />);
