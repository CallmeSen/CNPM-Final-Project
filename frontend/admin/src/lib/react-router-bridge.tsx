"use client";

import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";
import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

type BridgeLinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  to: NextLinkProps["href"];
};

type NavigateOptions = {
  replace?: boolean;
  scroll?: boolean;
};

type NavLinkClassName =
  | string
  | ((state: { isActive: boolean }) => string | undefined)
  | undefined;

type NavLinkChildren =
  | ReactNode
  | ((state: { isActive: boolean }) => ReactNode);

export const Link = ({ to, ...rest }: BridgeLinkProps) => {
  return <NextLink href={to} {...rest} />;
};

export const useNavigate = () => {
  const router = useRouter();

  return useCallback(
    (to: string, options?: NavigateOptions) => {
      if (options?.replace) {
        router.replace(to, { scroll: options.scroll });
      } else {
        router.push(to, { scroll: options?.scroll });
      }
    },
    [router],
  );
};

export const NavLink = ({
  to,
  className,
  children,
  ...rest
}: {
  to: string;
  className?: NavLinkClassName;
  children: NavLinkChildren;
} & Omit<ComponentProps<typeof NextLink>, "href" | "className" | "children">) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  const resolvedClassName =
    typeof className === "function" ? className({ isActive }) : className;

  const resolvedChildren =
    typeof children === "function" ? children({ isActive }) : children;

  return (
    <NextLink href={to} className={resolvedClassName} {...rest}>
      {resolvedChildren}
    </NextLink>
  );
};

export const Navigate = ({
  to,
  replace = false,
}: {
  to: string;
  replace?: boolean;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [router, to, replace]);

  return null;
};

export const BrowserRouter = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);

export const Routes = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Route = ({ element }: { element: ReactNode }) => <>{element}</>;
