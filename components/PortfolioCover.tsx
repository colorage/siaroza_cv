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
      className="h-full w-full object-contain"
    />
  );
}
