"use client";

import React from "react";

export class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-8 text-red-500">
          <h2 className="text-2xl font-bold mb-4">3D Scene Error</h2>
          <pre className="text-sm overflow-auto max-w-full bg-black p-4 rounded border border-red-500/30 whitespace-pre-wrap">
            {this.state.error?.toString() || "Unknown error"}
          </pre>
          <pre className="text-xs text-red-400 mt-4 overflow-auto max-w-full">
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
