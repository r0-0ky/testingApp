import { Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { TimerProps } from './types';

export const Timer: React.FC<TimerProps> = ({ handleStopTest, deadline, isRunning, hours, setHours, minutes, setMinutes, seconds, setSeconds }) => {
  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
      handleStopTest()
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
    
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(getTime, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <div className="flex items-center">
      <Typography variant="h6">{hours.toString().length >= 2 ? hours : `0${hours}`}</Typography>
      <Typography variant="h6">:</Typography>
      <Typography variant="h6">{minutes.toString().length >= 2 ? minutes : `0${minutes}`}</Typography>
      <Typography variant="h6">:</Typography>
      <Typography variant="h6">{seconds.toString().length >= 2 ? seconds : `0${seconds}`}</Typography>
    </div>
  );
};