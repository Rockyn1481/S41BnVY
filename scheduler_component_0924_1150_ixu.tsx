// 代码生成时间: 2025-09-24 11:50:30
 * This component provides a simple scheduler that can execute tasks at regular intervals.
 */

import React, { useState, useEffect, useCallback } from 'react';

interface SchedulerProps {
  task: () => void;
  interval: number;
}

const SchedulerComponent: React.FC<SchedulerProps> = ({ task, interval }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  // This function is called to start the scheduler
  const startScheduler = useCallback(() => {
    if (!timerId) {
      const id = setInterval(task, interval);
      setTimerId(id);
    }
    setIsRunning(true);
  }, [timerId, task, interval]);

  // This function is called to stop the scheduler
  const stopScheduler = useCallback(() => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    setIsRunning(false);
  }, [timerId]);

  // This effect cleanup function to clear the interval when the component unmounts
  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerId]);

  // This effect to restart the scheduler when the interval changes
  useEffect(() => {
    if (timerId) {
      clearInterval(timerId);
      startScheduler();
    }
  }, [startScheduler, interval, timerId]);

  return (
    <div>
      <button onClick={startScheduler} disabled={isRunning}>Start</button>
      <button onClick={stopScheduler} disabled={!isRunning}>Stop</button>
      <p>Scheduler is {isRunning ? 'running' : 'stopped'}</p>
    </div>
  );
};

export default SchedulerComponent;
