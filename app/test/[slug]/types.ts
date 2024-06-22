export interface TestHomePageProps {
  params: { slug: string | number }
}

export interface dataTypes {
  id: number | string
  timer?: TimerTypes
  questions: questionsTypes[]
}

interface questionsTypes {
  id: number | string
  title: string
  answer: (number|string)[]
  type: 'radio' | 'checkbox' | 'input' | 'textArea'
  answerVariants?: (string|number)[]
}

interface TimerTypes {
  hours: number
  minutes: number
  seconds: number
}