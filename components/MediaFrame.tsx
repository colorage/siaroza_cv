import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function MediaFrame({ children, className = "" }: Props) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-border ${className}`}>
      {children}
    </div>
  );
}
