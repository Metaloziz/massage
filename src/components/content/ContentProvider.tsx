"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SessionServiceId } from "@/lib/content";
import {
  getDefaultContent,
  type ContentBundle,
  type EducationData,
  type LocationData,
  type ServiceData,
  type SiteData,
} from "@/lib/remoteContent";
import { fetchRemoteContent } from "@/lib/sheetsApi";

type ContentContextValue = ContentBundle & {
  getServiceById: (id: SessionServiceId) => ServiceData | undefined;
  status: "idle" | "loading" | "ready" | "error";
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentBundle>(() =>
    getDefaultContent(),
  );
  const [status, setStatus] = useState<ContentContextValue["status"]>("loading");

  useEffect(() => {
    let cancelled = false;

    void fetchRemoteContent({
      onUpdate: (fresh) => {
        if (!cancelled) {
          setContent(fresh);
          setStatus("ready");
        }
      },
      onRefreshError: () => {
        if (!cancelled) setStatus((prev) => (prev === "ready" ? prev : "error"));
      },
      onRefreshComplete: () => {
        if (!cancelled) {
          setStatus((prev) => (prev === "error" ? prev : "ready"));
        }
      },
    }).then((initial) => {
      if (cancelled) return;
      setContent(initial);
      setStatus("ready");
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<ContentContextValue>(
    () => ({
      ...content,
      status,
      getServiceById: (id) => content.services.find((service) => service.id === id),
    }),
    [content, status],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return ctx;
}

export function useSite(): SiteData {
  return useContent().site;
}

export function useServices(): ServiceData[] {
  return useContent().services;
}

export function useEducation(): EducationData {
  return useContent().education;
}

export function useLocations(): LocationData[] {
  return useContent().locations;
}
