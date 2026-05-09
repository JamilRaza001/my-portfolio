'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

export const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <LazyMotion features={domAnimation}>{children}</LazyMotion>
);
