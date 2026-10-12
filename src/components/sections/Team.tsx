import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

// Source: Notion > EMPRESA > Sócios.
const TEAM = [
  {
    initials: "RV",
    name: "Rafael C. Vedana",
    role: "Design & Web",
    bio: "Cuida de tudo o que a sua marca mostra: sites, landing pages, interfaces, animações, social design e identidade visual.",
    skills: ["Next.js e React", "Interfaces", "Identidade visual"],
  },
  {
    initials: "AM",
    name: "Alison Morais",
    role: "Estratégia & Vídeo",
    bio: "Cuida de tudo o que a sua marca diz: vendas, mercado, concorrência e conversão, além dos roteiros e da edição dos vídeos.",
    skills: ["Conversão", "Roteiros", "Edição de vídeo"],
  },
];

function Monogram({ initials, flip }: { initials: string; flip?: boolean }) {
  return (
    <div className="relative size-28 shrink-0 sm:size-32">
      <svg aria-hidden viewBox="-70 -70 140 140" className="absolute inset-0 h-full w-full overflow-visible">
        <circle r="44" fill={`url(#mono-${initials})`} />
        <g transform={`rotate(${flip ? 30 : -30})`} fill="none">
          <ellipse rx="66" ry="24" stroke="rgb(237 236 242 / 0.5)" strokeWidth="1.4" />
          <ellipse rx="66" ry="24" stroke="#9670ea" strokeWidth="2.4" strokeDasharray="60 360" />
        </g>
        <defs>
          <radialGradient id={`mono-${initials}`} cx="30%" cy="25%" r="85%">
            <stop offset="0" stopColor="#3a1d86" />
            <stop offset="1" stopColor="#0d0640" />
          </radialGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-semibold tracking-[0.04em] text-metal">
        {initials}
      </span>
    </div>
  );
}

export function Team() {
  return (
    <section id="quem-faz" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            Design e estratégia na <span className="text-violet pr-[0.06em] font-light italic">mesma mesa.</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-mute">
            Quem atende você é quem faz. Sem intermediários entre a sua ideia e a entrega.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:mt-20 lg:grid-cols-2 lg:items-start lg:gap-8">
          {TEAM.map((person, i) => (
            <Reveal
              key={person.name}
              delay={i * 0.12}
              className={cn("panel relative overflow-hidden rounded-3xl p-7 sm:p-10", i === 1 && "lg:mt-24")}
            >
              <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
                <Monogram initials={person.initials} flip={i === 1} />
                <div>
                  <h3 className="font-display text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
                    {person.name}
                  </h3>
                  <p className="text-violet mt-1 font-display text-xl font-light italic">{person.role}</p>
                </div>
              </div>
              <p className="mt-8 max-w-[48ch] text-lg leading-relaxed text-mute">{person.bio}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {person.skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-ink/85">
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
