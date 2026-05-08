import { useEffect, useRef, useState } from "react";

interface NumberCounterProps {
  end: number;
  start?: number;
  suffix?: string;
  duration?: number;
}

export default function NumberCounter({
  end,
  start = 0,
  suffix = "",
  duration = 2,
}: NumberCounterProps) {
  const [count, setCount] = useState(start);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();

          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);
            const currentCount = start + (end - start) * progress;
            setCount(Math.floor(currentCount));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, start, duration]);

  return (
    <div ref={elementRef} className="text-4xl font-bold text-green-600 dark:text-green-500">
      {count}
      {suffix}
    </div>
  );
}
