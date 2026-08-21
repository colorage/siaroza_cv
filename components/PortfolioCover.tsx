type Props = {
  cover?: string;
};

export function PortfolioCover({ cover }: Props) {
  if (!cover) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={cover}
      alt=""
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
  );
}
