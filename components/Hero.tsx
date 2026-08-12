import type { Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
};

export function Hero({ dict }: Props) {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col justify-center px-6 py-24">
      <p className="animate-fade-up mb-4 text-[13px] tracking-[0.08em] text-muted uppercase">
        {dict.hero.shortName}
      </p>
      <h1 className="animate-fade-up-delay max-w-3xl text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.05] font-normal tracking-[-0.03em] text-foreground">
        {dict.hero.name}
      </h1>
      <p className="animate-fade-up-delay mt-5 text-xl tracking-tight text-foreground md:text-2xl">
        {dict.hero.title}
      </p>
      <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
        {dict.hero.tagline}
      </p>
      <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap gap-3">
        <a
          href="mailto:colorage503@gmail.com"
          className="inline-flex items-center rounded-full bg-button px-5 py-2.5 text-[14px] font-medium text-button-fg transition-opacity hover:opacity-90"
        >
          {dict.hero.email}
        </a>
        <a
          href="https://t.me/bardzobardzo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-button px-5 py-2.5 text-[14px] font-medium text-button-fg transition-opacity hover:opacity-90"
        >
          {dict.hero.telegram}
        </a>
      </div>
    </section>
  );
}
