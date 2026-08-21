type Props = {
  slug: string;
  title: string;
  cover?: string;
};

export function PortfolioCover({ title, cover }: Props) {
  if (cover) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={cover}
        alt=""
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center text-foreground transition-transform duration-500 group-hover:scale-[1.04]">
      <span className="max-w-[12ch] text-center text-2xl tracking-tight">
        {title}
      </span>
    </div>
  );
}
