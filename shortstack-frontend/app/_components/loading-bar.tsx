"use client";

import { useEffect, useState } from "react";

export function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    const startLoading = () => {
      setLoading(true);
      setProgress(0);

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
    };

    const completeLoading = () => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 200);
    };

    startLoading();

    const timeout = setTimeout(completeLoading, 1000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] bg-red-600 z-50 transition-transform duration-200 ease-out"
      style={{
        transform: `translateX(${progress - 100}%)`,
      }}
    />
  );
}
