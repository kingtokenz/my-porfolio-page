import { motion } from 'framer-motion';
import { ArrowRight, Brain, Cpu, Shield, Zap, Code, Globe, Activity, Layers, Lock, MessageSquare } from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/20 to-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] w-full mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col items-start gap-8 py-12 lg:py-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-white/[0.08] to-white/[0.02] border border-white/[0.08] text-sm text-neutral-300 font-medium shadow-[0_0_15px_rgba(255,255,255,0.03)] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.12] hover:border-white/[0.15]"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            Active and available for new projects
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 leading-[1.1]"
          >
            Design.<br/>Code. Future.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 max-w-lg leading-relaxed"
          >
            I engineer modern digital experiences that push boundaries. Full-stack development meet visionary design for the next era of the web.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-neutral-100 transition-all duration-300 hover:scale-[1.03] shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2">
              View Projects <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-white/[0.15] text-white font-medium hover:bg-white/[0.05] hover:border-white/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] flex items-center justify-center gap-2">
              GitHub Repos
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] lg:h-[800px] w-full [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
        >
          <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
        </motion.div>
      </div>
    </section>
  );
}

export function SocialProofSection() {
  return (
    <section className="py-16 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-[1400px] mx-auto px-6">
        <p className="text-center text-sm text-neutral-500 font-medium mb-10 uppercase tracking-widest">
          Technologies I Master
        </p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 text-xl font-bold">React</div>
          <div className="flex items-center gap-2 text-xl font-bold">TypeScript</div>
          <div className="flex items-center gap-2 text-xl font-bold">Tailwind</div>
          <div className="flex items-center gap-2 text-xl font-bold">Next.js</div>
          <div className="flex items-center gap-2 text-xl font-bold">Gemini AI</div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const features = [
    { icon: Code, title: "Modern Stack", desc: "Expertise in React, TypeScript, and the latest frontend technologies for scalable apps." },
    { icon: Zap, title: "High Performance", desc: "Optimizing for core web vitals and smooth, high-frame-rate interactions." },
    { icon: Brain, title: "AI Integration", desc: "Building intelligent features using LLMs, vector databases, and semantic search." },
    { icon: MessageSquare, title: "Chatbot Automation", desc: "Developing conversational AI interfaces and automated support systems for seamless engagement." },
    { icon: Globe, title: "Responsive Design", desc: "Ensuring pixel-perfect experiences across all device types and screen sizes." },
    { icon: Layers, title: "System Architecture", desc: "Deep understanding of full-stack scalability and maintainable codebases." },
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Technical Expertise.</h2>
          <p className="text-xl text-neutral-400">Crafting high-quality software with a focus on precision, speed, and user experience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-neutral-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ShowcaseSection() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Current Focus.</h2>
          <p className="text-xl text-neutral-400">Sneak peak into the architecture of my latest open-source contribution: an AI-driven agent framework.</p>
        </div>
        
        <div className="relative rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] overflow-hidden h-[600px] flex items-center justify-center shadow-2xl">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
          
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          
          {/* Mock UI Card */}
          <div className="relative z-10 p-8 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl max-w-2xl w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-neutral-600" />
                  <div className="w-3 h-3 rounded-full bg-neutral-700" />
                  <div className="w-3 h-3 rounded-full bg-neutral-800" />
                </div>
                <div className="text-xs text-neutral-500 font-mono ml-2">ibedev-terminal ~ project-alpha</div>
              </div>
              <div className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">DEVELOPMENT</div>
            </div>
            
            <div className="font-mono text-sm text-neutral-400 space-y-3">
              <p className="flex items-center gap-2"><span className="text-blue-400">→</span> Compiling project sources...</p>
              <p className="flex items-center gap-2"><span className="text-green-400">✓</span> Build successful.</p>
              <p className="flex items-center gap-2"><span className="text-blue-400">→</span> Analyzing performance bottlenecks...</p>
              <p className="flex items-center gap-2"><span className="text-green-400">✓</span> Optimization complete (Avg 60fps).</p>
              <p className="flex items-center gap-2"><span className="text-blue-400">→</span> Deploying to global edge...</p>
              <p className="text-white mt-6 pt-4 border-t border-white/5">&gt; System live at alpha.ibedev.io</p>
              <span className="inline-block w-2 h-4 bg-white animate-pulse mt-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section id="stats" className="py-24 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        <div>
          <div className="text-5xl md:text-6xl font-light tracking-tighter text-white mb-3">50<span className="text-blue-500">+</span></div>
          <div className="text-sm text-neutral-400 font-medium uppercase tracking-wider">Projects Delivered</div>
        </div>
        <div>
          <div className="text-5xl md:text-6xl font-light tracking-tighter text-white mb-3">5<span className="text-blue-500">Y+</span></div>
          <div className="text-sm text-neutral-400 font-medium uppercase tracking-wider">Experience</div>
        </div>
        <div>
          <div className="text-5xl md:text-6xl font-light tracking-tighter text-white mb-3">200<span className="text-blue-500">k</span></div>
          <div className="text-sm text-neutral-400 font-medium uppercase tracking-wider">Lines of Code</div>
        </div>
        <div>
          <div className="text-5xl md:text-6xl font-light tracking-tighter text-white mb-3">10<span className="text-blue-500">+</span></div>
          <div className="text-sm text-neutral-400 font-medium uppercase tracking-wider">Countries Reached</div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialSection() {
  return (
    <section id="testimonials" className="py-32">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="mb-10 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center shadow-2xl">
            <Globe className="w-10 h-10 text-white/50" />
          </div>
        </div>
        <h3 className="text-3xl md:text-5xl font-medium leading-tight tracking-tight mb-12 text-white">
          " ibedev doesn't just write code; they build products. The technical depth and attention to detail they brought to our project fixed problems we didn't even know we had. "
        </h3>
        <div className="text-neutral-400">
          <div className="text-white font-medium text-xl mb-1">Marcus Thorne</div>
          <div className="text-sm uppercase tracking-widest">Founder, Astra Ventures</div>
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/5 blur-[150px] rounded-full max-w-4xl mx-auto pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white">Work with ibedev.</h2>
        <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">Currently accepting select projects for Q3 2026. Let's see if your vision aligns with my engineering philosophy.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://wa.me/0256745261" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-neutral-100 transition-all duration-300 hover:scale-[1.03] shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]">
            Get in Touch
          </a>
          <a href="https://github.com/ibedev" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-transparent border border-white/[0.15] text-white font-medium hover:bg-white/[0.05] hover:border-white/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-16 border-t border-white/5 bg-[#020202]">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="text-white font-semibold text-xl tracking-tight">ibedev</span>
          </div>
          <p className="text-neutral-500 max-w-xs leading-relaxed">
            Engineering digital excellence. Building the next generation of visionary web experiences.
          </p>
        </div>
        
        <div className="col-span-1">
          <h4 className="text-white font-medium mb-6">Work</h4>
          <ul className="space-y-4 text-sm text-neutral-500">
            <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
            <li><a href="#features" className="hover:text-white transition-colors">Expertise</a></li>
            <li><a href="#stats" className="hover:text-white transition-colors">Experience</a></li>
          </ul>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-white font-medium mb-6">Contact</h4>
          <ul className="space-y-4 text-sm text-neutral-500">
            <li><a href="mailto:ebe27712@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">Email: ebe27712@gmail.com</a></li>
            <li><a href="https://wa.me/0256745261" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">WhatsApp: 0256745261</a></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="text-white font-medium mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-neutral-500">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-neutral-600">
        <div>© 2026 ibedev. All rights reserved.</div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="https://twitter.com/ibedev" className="hover:text-white transition-colors">Twitter</a>
          <a href="https://github.com/ibedev" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/ibedev" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
