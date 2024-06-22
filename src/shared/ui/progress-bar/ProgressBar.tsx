"use client"

import { ProgressBarProps } from "./types"

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentElement, allElements }) => {
  return (
    <div className="flex gap-2 h-3 w-full">
      {Array(allElements).fill(1).map((_, i) => i++).map((item, index) => (
        <div key={index} className={`h-full w-full ${currentElement === item ? 'bg-red-600' : currentElement > item ? 'bg-black' : 'bg-gray-300' }`}></div>
      ))}
    </div>
  )
}