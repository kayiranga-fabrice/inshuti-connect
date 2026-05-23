import { ReactNode } from "react";

/** Centered content column — matches ReachOut-style max width and side padding */
export function SiteContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full max-w-[100rem] mx-auto px-2 sm:px-3 ${className}`}>
      {children}
    </div>
  );
}
