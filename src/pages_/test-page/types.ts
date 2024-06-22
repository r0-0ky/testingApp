export interface TestPageProps {
  id: number | string
  timer?: TimerTypes
  questions: questionsTypes[]
  title: string
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