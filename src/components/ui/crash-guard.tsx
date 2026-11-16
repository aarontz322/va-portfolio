"use client";
import React from "react";
import { trace } from "@/lib/motion";

type Props = {
  /** Name shown in trace mode. */
  name: string;
  /** What to show if the effect fails. Default: nothing. */
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Crash guard for decorative effects (3D robot, cursor trail).
 * If the effect throws, it is replaced by the fallback and the
 * rest of the page keeps working.
 */
export class CrashGuard extends React.Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    trace(this.props.name, `crashed and was hidden (${String(error)})`);
  }

  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}
