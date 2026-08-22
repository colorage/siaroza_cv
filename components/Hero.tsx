import Image from "next/image";
import { ContactActions } from "@/components/ContactActions";
import { SkillCursorTrail } from "@/components/SkillCursorTrail";
import type { Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
};

export function Hero({ dict }: Props) {
  return (
    <SkillCursorTrail>
      <div className="relative h-[min(62svh,34rem)] overflow-hidden md:absolute md:inset-0 md:h-auto">
        <Image
          src="/hero_bg.jpg"
          alt={dict.hero.name}
          fill
          preload
          sizes="100vw"
          className="pointer-events-none object-cover object-[78%_36%] max-md:origin-[78%_36%] max-md:scale-[1.7] md:object-[right_center]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent md:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-background from-[18%] via-background/80 via-50% to-transparent md:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-28 bg-gradient-to-t from-background to-transparent md:block"
        />
      </div>
      <div className="relative z-[1] mx-auto flex max-w-5xl flex-col justify-end px-6 pt-5 pb-14 md:min-h-[calc(100vh-3.5rem)] md:justify-center md:py-24">
        <p className="animate-fade-up mb-3 text-[13px] tracking-[0.08em] text-muted uppercase md:mb-4">
          {dict.hero.shortName}
        </p>
        <h1 className="animate-fade-up-delay max-w-3xl text-[clamp(2.25rem,10vw,4.5rem)] leading-[1.05] font-normal tracking-[-0.03em] text-foreground">
          {dict.hero.name}
        </h1>
        <p className="animate-fade-up-delay mt-4 text-lg tracking-tight text-foreground md:mt-5 md:text-2xl">
          {dict.hero.title}
        </p>
        <p className="animate-fade-up-delay-2 mt-3 max-w-xl text-[15px] leading-relaxed text-muted md:mt-4">
          {dict.hero.tagline}
        </p>
        <div className="animate-fade-up-delay-2 mt-8 md:mt-10">
          <ContactActions dict={dict} />
        </div>
      </div>
    </SkillCursorTrail>
  );
}
