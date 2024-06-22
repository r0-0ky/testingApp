export interface TimerProps { 
  handleStopTest: () => void
  deadline: string
  isRunning: boolean
  hours: string | number | boolean | Array<any>
  setHours: (value: string | number | boolean | Array<any> | ((state: string | number | boolean | Array<any> ) => string | number | boolean | Array<any>)) => void
  minutes: string | number | boolean | Array<any>
  setMinutes:  (value: string | number | boolean | Array<any> | ((state: string | number | boolean | Array<any> ) => string | number | boolean | Array<any>)) => void
  seconds: string | number | boolean | Array<any>
  setSeconds:  (value: string | number | boolean | Array<any> | ((state: string | number | boolean | Array<any> ) => string | number | boolean | Array<any>)) => void
}