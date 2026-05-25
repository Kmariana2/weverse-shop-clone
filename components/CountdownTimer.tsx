'use client';

import { useCountdown } from '@/lib/hooks';

interface CountdownTimerProps {
  endDate: string | Date;
}

export function CountdownTimer({ endDate }: CountdownTimerProps) {
  const timeLeft = useCountdown(endDate);

  const isLessThanOneHour = timeLeft.startsWith('00:');

  return (
    <div
      className={`text-sm font-semibold ${
        isLessThanOneHour ? 'pulse-red' : 'text-red-600'
      }`}
    >
      {timeLeft}
    </div>
  );
}
