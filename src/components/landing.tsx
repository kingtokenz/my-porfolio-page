import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Shield, Zap, Globe, Activity, Layers } from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';
import { NikeSwoosh } from '@/components/ui/icons';
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
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-white font-bold tracking-widest uppercase backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            Limited Edition Drops
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.9] uppercase"
          >
            JUST<br/>DO IT.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-neutral-300 max-w-lg leading-relaxed font-medium"
          >
            Push your limits. Breakthrough your boundaries. Experience the next generation of performance engineering.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-black font-bold uppercase tracking-tighter hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-2">
              Shop New Arrivals <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-10 py-5 rounded-full bg-transparent border-2 border-white text-white font-bold uppercase tracking-tighter hover:bg-white hover:text-black transition-all duration-300">
              Explore Collection
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
        <p className="text-center text-sm text-neutral-500 font-bold mb-10 uppercase tracking-[0.2em]">
          AS SEEN ON THE STREETS & TRACKS
        </p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-2 text-2xl font-black uppercase italic tracking-tighter">AIR MAX</div>
          <div className="flex items-center gap-2 text-2xl font-black uppercase italic tracking-tighter">JORDAN</div>
          <div className="flex items-center gap-2 text-2xl font-black uppercase italic tracking-tighter">NIKE SB</div>
          <div className="flex items-center gap-2 text-2xl font-black uppercase italic tracking-tighter">RUNNING</div>
          <div className="flex items-center gap-2 text-2xl font-black uppercase italic tracking-tighter">FOOTBALL</div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const features = [
    { icon: Zap, title: "Nike Air", desc: "Revolutionary pressurized air that condenses on impact then immediately rebounds to its original shape." },
    { icon: Activity, title: "Flyknit Tech", desc: "A featherweight, form-fitting and virtually seamless upper for a snug, supportive fit." },
    { icon: Shield, title: "Dri-FIT", desc: "High-performance, microfiber, polyester fabric that moves sweat away from the body." },
    { icon: Layers, title: "ZoomX Foam", desc: "Delivers Nike's greatest energy return, giving you the responsiveness you need to push further." },
    { icon: Globe, title: "Move to Zero", desc: "Our journey toward zero carbon and zero waste to help protect the future of sport." },
    { icon: Cpu, title: "Performance Fit", desc: "Data-driven design that maps every muscle movement for ultimate athletic freedom." },
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase italic">Innovation in Motion.</h2>
          <p className="text-xl text-neutral-400">We obsess over the details so you can focus on your performance. Engineering excellence for every athlete.</p>
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
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase italic">Featured Styles.</h2>
          <p className="text-xl text-neutral-400">Iconic designs reimagined for the next generation of athletes.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
          <div className="relative rounded-[2.5rem] border border-white/10 bg-[#111] overflow-hidden flex items-end p-10 group cursor-pointer shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2070"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Air Max"
            />
            <div className="relative z-20">
              <h3 className="text-3xl font-black uppercase italic text-white mb-2">Air Max Pulse</h3>
              <p className="text-neutral-300 font-medium">Step into the future of comfort.</p>
              <button className="mt-4 px-6 py-2 bg-white text-black font-bold uppercase text-sm rounded-full">Shop Now</button>
            </div>
          </div>
          
          <div className="grid grid-rows-2 gap-8">
            <div className="relative rounded-[2.5rem] border border-white/10 bg-[#111] overflow-hidden flex items-end p-8 group cursor-pointer shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=2070"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Jordan"
              />
              <div className="relative z-20">
                <h3 className="text-2xl font-black uppercase italic text-white mb-1">Jordan Retro</h3>
                <p className="text-sm text-neutral-300 font-medium italic">Legends never die.</p>
              </div>
            </div>
            
            <div className="relative rounded-[2.5rem] border border-white/10 bg-[#111] overflow-hidden flex items-end p-8 group cursor-pointer shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=2070"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Running"
              />
              <div className="relative z-20">
                <h3 className="text-2xl font-black uppercase italic text-white mb-1">AlphaFly Next%</h3>
                <p className="text-sm text-neutral-300 font-medium italic">Fastest ever.</p>
              </div>
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
          <div className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-3 uppercase italic">50<span className="text-red-600">Y+</span></div>
          <div className="text-sm text-neutral-400 font-bold uppercase tracking-widest">Innovation</div>
        </div>
        <div>
          <div className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-3 uppercase italic">100<span className="text-red-600">M</span></div>
          <div className="text-sm text-neutral-400 font-bold uppercase tracking-widest">Nike Members</div>
        </div>
        <div>
          <div className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-3 uppercase italic">75<span className="text-red-600">%</span></div>
          <div className="text-sm text-neutral-400 font-bold uppercase tracking-widest">Recycled Poly</div>
        </div>
        <div>
          <div className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-3 uppercase italic">190<span className="text-red-600">+</span></div>
          <div className="text-sm text-neutral-400 font-bold uppercase tracking-widest">Countries</div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialSection() {
  return (
    <section id="testimonials" className="py-32 bg-black">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="mb-10 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              alt="Athlete"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight mb-12 text-white">
          " Okay, I need to talk about these. I've tried every running shoe out there, and nothing compares to the energy return on the new AlphaFly. It literally feels like you're cheating. "
        </h3>
        <div className="text-neutral-400">
          <div className="text-white font-black uppercase italic text-xl mb-1">Sarah Jenkins</div>
          <div className="text-sm font-bold uppercase tracking-[0.2em] text-red-600">Marathon Athlete</div>
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/5 blur-[150px] rounded-full max-w-4xl mx-auto pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-white uppercase italic">Become a Member.</h2>
        <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto font-medium">Join our community and get first access to the very best of Nike products, inspiration, and community.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" className="px-10 py-5 rounded-full bg-white text-black font-bold uppercase tracking-tighter hover:bg-neutral-200 transition-all duration-300">
            Join Us
          </a>
          <a href="#" className="px-10 py-5 rounded-full bg-transparent border-2 border-white text-white font-bold uppercase tracking-tighter hover:bg-white hover:text-black transition-all duration-300">
            Sign In
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-16 border-t border-white/5 bg-black">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <NikeSwoosh className="w-12 h-12 text-white" />
          </div>
          <p className="text-neutral-500 max-w-xs leading-relaxed font-medium">
            Our mission is what drives us to do everything possible to expand human potential.
          </p>
        </div>
        
        <div className="col-span-1">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Get Help</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
            <li><a href="#" className="hover:text-white transition-colors">Order Status</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">About Nike</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
            <li><a href="#" className="hover:text-white transition-colors">News</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Investors</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Promotions</h4>
          <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
            <li><a href="#" className="hover:text-white transition-colors">Student Discount</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Military Discount</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Teacher Discount</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-600">
        <div className="flex items-center gap-6">
          <span className="text-white">© 2026 Nike, Inc. All Rights Reserved</span>
          <a href="#" className="hover:text-white transition-colors">Guides</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Sale</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">Youtube</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
