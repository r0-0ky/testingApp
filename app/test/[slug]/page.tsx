"use client"

import { TestPage } from "@/src/pages/test-page";
import { TestHomePageProps, dataTypes } from "./types";
import React from 'react';

const TestHomePage: React.FC<TestHomePageProps> = ({ params }) => {
  const [data, setData] = React.useState<dataTypes[]>([
    {
      id: 1,
      timer: {
        hours: 0,
        minutes: 0,
        seconds: 50
      },
      questions: [
        {
          id: 1,
          title: '2 + 2 = ?',
          answer: [4],
          answerVariants: [1, 4, 6, 7],
          type: 'radio',
        },
        {
          id: 2,
          title: '2 + 2 = ?',
          answer: [4],
          answerVariants: [1, 4, 6, 7],
          type: 'radio'
        },
        {
          id: 3,
          title: '2 + 2 = ?',
          answer: [4],
          answerVariants: [1, 4, 6, 7],
          type: 'radio'
        },
        {
          id: 4,
          title: 'x^2 = 4',
          answer: [2, -2],
          answerVariants: [2, 4, -2, 7],
          type: 'checkbox'
        },
        {
          id: 5,
          title: 'Плюс и ?',
          answer: ['Минус'],
          type: 'input'
        },
        {
          id: 6,
          title: 'Плюс и ?',
          answer: ['Минус'],
          type: 'textArea'
        }
      ]
    }
  ])
  const [testData] = React.useState(data.filter(item => item.id.toString() === params.slug.toString())[0])
  return (
    <main className="max-w-[900px] m-auto h-full p-6">
      <TestPage title="Математика 5+" id={testData.id} questions={testData.questions} timer={testData.timer} />
    </main>
  );
};

export default TestHomePage


