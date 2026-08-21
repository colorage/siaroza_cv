import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactActions } from "@/components/ContactActions";
import { SiteHeader } from "@/components/SiteHeader";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const dict = await getDictionary(localeParam as Locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <div lang={locale === "by" ? "be" : "en"} className="flex min-h-full flex-col">
      <SiteHeader locale={locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl tracking-tight text-foreground md:text-4xl">
            {dict.footer.contact}
          </h2>
          <div className="mt-8">
            <ContactActions dict={dict} />
          </div>
          <p className="mt-10 text-[13px] text-muted">
            © {new Date().getFullYear()} {dict.hero.shortName}
          </p>
        </div>
      </footer>
    </div>
  );
}
