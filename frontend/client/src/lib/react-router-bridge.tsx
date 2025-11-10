"use client";

import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";
import { useCallback } from "react";
import { useRouter, useParams as useNextParams } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

type BridgeLinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  to: NextLinkProps["href"];
};

type NavigateOptions = {
  replace?: boolean;
  scroll?: boolean;
  state?: unknown;
};

export const Link = ({ to, ...rest }: BridgeLinkProps) => {
  return <NextLink href={to} {...rest} />;
};

export const useNavigate = () => {
  const router = useRouter();

  return useCallback(
    (to: string | number, options?: NavigateOptions) => {
      if (typeof to === "number") {
        if (to < 0) {
          router.back();
        } else {
          router.refresh();
        }
        return;
      }

      if (options?.replace) {
        router.replace(to, { scroll: options.scroll });
      } else {
        router.push(to, { scroll: options?.scroll });
      }

      // Accept the `state` option for compatibility, even though we do not persist it.
    },
    [router],
  );
};

export const useParams = <T extends Record<string, string | string[]>>() => {
  const params = useNextParams();
  return params as unknown as T;
};

// Lightweight fallbacks to maintain compatibility if these components are still imported.
export const BrowserRouter = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Routes = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Route = ({ element }: { element: ReactNode }) => <>{element}</>;
