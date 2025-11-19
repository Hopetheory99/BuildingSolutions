import React, { useState, useRef, useEffect } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const CountUp: React.FC<{ end: number; duration?: number; suffix?: string; ariaLabelledby: string; start: boolean }> = ({ end, duration = 2000, suffix = '', ariaLabelledby, start }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (start && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTimestamp: number | null = null;
      const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

      const frame = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easedProgress = easeOutQuint(progress);
        setCount(Math.floor(easedProgress * end));
        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(frame);
    }
  }, [start, end, duration]);

  return (
    <p 
      className="text-4xl font-extrabold text-accent"
      aria-labelledby={ariaLabelledby}
      aria-live="polite"
      aria-atomic="true"
    >
      {count}{suffix}
    </p>
  );
};

// Define more robust types for our metrics data
type CounterMetric = { type: 'counter'; value: number; label: string; suffix: string; };
type StaticMetric = { type: 'static'; value: string; label: string; };
type Metric = CounterMetric | StaticMetric;

const metrics: Metric[] = [
    { type: 'counter', value: 2025, label: 'Founded', suffix: '' },
    { type: 'counter', value: 50, label: 'Suppliers', suffix: '+' },
    { type: 'counter', value: 100, label: 'Projects', suffix: '+' },
    { type: 'static', value: '24/7', label: 'Support' },
];

const MetricCard: React.FC<{ metric: Metric; index: number; isVisible: boolean }> = ({ metric, index, isVisible }) => {
  return (
    <div 
      className={`bg-gray-800 p-6 rounded-lg text-center opacity-0 ${isVisible ? 'animate-fade-in-up animate-delay' : ''}`}
      style={{ '--animation-delay': `${index * 150}ms`} as React.CSSProperties}
    >
        {metric.type === 'static' ? 
          <p id={`metric-label-${metric.label}`} className="text-4xl font-extrabold text-accent">{metric.value}</p> :
          <CountUp end={metric.value} suffix={metric.suffix} ariaLabelledby={`metric-label-${metric.label}`} start={isVisible} />
        }
        <p id={`metric-label-${metric.label}`} className="mt-2 text-lg font-semibold text-gray-300">{metric.label}</p>
    </div>
  );
};

const About: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.2 });
  const isVisible = !!entry?.isIntersecting;

  return (
    <section id="about" className="py-20 md:py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">About Building Solutions</h2>
            <p className="text-accent font-semibold mb-6">Revolutionizing Construction Supply Chains with Technology</p>
            <p className="text-gray-400 mb-4">
              Founded with a vision to revolutionize supply chains, Building Solutions leverages modern technology and a multi-decade established supplier network to streamline material and labor sourcing in Dhaka.
            </p>
            <p className="text-gray-400 mb-4">
              Our core principles are transparency, reliability, and technology-driven efficiency. We've replaced outdated methods with a seamless digital platform, ensuring you get what you need, when you need it.
            </p>
            <p className="text-gray-400">
             A key differentiator is our transparent 10-15% markup model. This commitment to honesty means you always know you're getting a fair price, allowing you to budget with confidence and build with trust.
            </p>
          </div>
          <div ref={ref} className="grid grid-cols-2 gap-8">
            {metrics.map((metric, index) => (
                <MetricCard key={metric.label} metric={metric} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;