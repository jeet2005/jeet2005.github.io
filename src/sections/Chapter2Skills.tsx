import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import SkillDesk from '../components/canvas/SkillDesk';
import { SKILLS } from '../data/portfolio';

export default function Chapter2Skills() {
  const tape1Ref = useRef<HTMLDivElement>(null);
  const tape2Ref = useRef<HTMLDivElement>(null);
  const tape3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Marquee animations
    if (tape1Ref.current) {
      gsap.fromTo(tape1Ref.current, { xPercent: 0 }, { xPercent: -50, ease: "none", duration: 20, repeat: -1 });
    }
    if (tape2Ref.current) {
      gsap.fromTo(tape2Ref.current, { xPercent: -50 }, { xPercent: 0, ease: "none", duration: 25, repeat: -1 });
    }
    if (tape3Ref.current) {
      gsap.fromTo(tape3Ref.current, { xPercent: 0 }, { xPercent: -50, ease: "none", duration: 15, repeat: -1 });
    }
  }, []);

  const coreSkills = SKILLS.slice(0, 4);
  const frameworkSkills = SKILLS.slice(4, 7);
  const otherSkills = SKILLS.slice(7);

  const renderTape = (skills: any[], ref: React.RefObject<HTMLDivElement | null>) => (
    <div className="relative w-full h-12 overflow-hidden bg-paper-shadow border-y border-ink-faded transform -rotate-1 mb-4 shadow-sm flex items-center" style={{ mixBlendMode: 'multiply' }}>
      <div ref={ref} className="flex whitespace-nowrap absolute left-0">
        {[...skills, ...skills, ...skills, ...skills, ...skills, ...skills].map((s, i) => (
          <div key={i} className="flex items-center mx-8">
            <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: s.color }} />
            <span className="special-elite text-ink-primary font-bold tracking-widest">{s.name.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="relative w-full py-24 flex flex-col justify-center min-h-[60vh]">
      <div className="text-center mb-16 mt-8">
        <h2 className="text-5xl playfair ink-bleed mb-4">The Arsenal</h2>
        <p className="special-elite text-ink-secondary">TOOLS OF THE CRAFT</p>
      </div>

      {/* Marquee Tapes */}
      <div className="pb-12 overflow-hidden flex flex-col gap-6">
        {renderTape(coreSkills, tape1Ref)}
        {renderTape(frameworkSkills, tape2Ref)}
        {renderTape(otherSkills, tape3Ref)}
      </div>
    </section>
  );
}
