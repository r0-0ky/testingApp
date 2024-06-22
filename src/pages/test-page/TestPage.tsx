"use client"

import { Button, Checkbox, FormControlLabel, Radio, RadioGroup, Rating, TextField, Typography } from "@mui/material"
import { ProgressBar } from '@/src/shared/ui/progress-bar';
import { TestPageProps } from "./types";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from "react";
import Link from "next/link";
import { Timer } from "@/src/shared/ui/timer";
import useLocalStorage from "@/src/shared/hooks/useLocalStorage";
import ReplayIcon from '@mui/icons-material/Replay';

export const TestPage: React.FC<TestPageProps> = ({ id, questions, timer, title }) => {
  const [deadline, setDeadline] = useLocalStorage('timerDeadline', '');
  const [startedTest, setStartedTest] = useLocalStorage('startedTest', '');
  const [questionNumberStorage, setQuestionNumberStorage] = useLocalStorage('questionNumberStorage', 0);
  const [result, setResult] = useLocalStorage('result', []);
  const [points, setPoints] = useLocalStorage('points', 0);
  const [hours, setHours] = useLocalStorage('hours', timer ? timer.hours : 0);
  const [minutes, setMinutes] = useLocalStorage('minutes', timer ? timer.minutes : 0);
  const [seconds, setSeconds] = useLocalStorage('seconds', timer ? timer.seconds : 0);
  const [currentQuestion, setCurrentQuestion] = React.useState(questions[questionNumberStorage])
  const [value, setValue] = React.useState('');
  const [checkboxValue, setCheckboxValue] = React.useState<{[index: string | number]: boolean}>({});

  const getDeadline = () => {
    const date = new Date(Date.now())

    if (timer !== undefined) {
      date.setHours(date.getHours() + timer.hours)
      date.setMinutes(date.getMinutes() + timer.minutes)
      date.setSeconds(date.getSeconds() + timer.seconds)
    }
    return date
  }

  // Сброс данных теста
  const handleResetTest = () => {
    setQuestionNumberStorage(0)
    setResult([])
    setPoints(0)
    setCurrentQuestion(questions[0])
    setDeadline('')
    if (timer) {
      setHours(timer.hours)
      setMinutes(timer.minutes)
      setSeconds(timer.seconds)
    }
  }

  const handleStopTest = () => {
    // Вывод всех ответов по тесту
    console.log(result);
    setQuestionNumberStorage(questions.length)
    setStartedTest('')
  }

  // Обработка нажатия на кнопку начала теста
  const handleClick = () => {
    setStartedTest(id)
    setDeadline(getDeadline)
  }

  // Обработка состояния данных формы
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentQuestion.type === 'checkbox') {
      setCheckboxValue({
        ...checkboxValue,
        [event.target.name]: event.target.checked,
      });
    }
    else {
      setValue(event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Обработка данных с checkbox
    if (currentQuestion.type === 'checkbox') {
      setResult([...result, { questionId: currentQuestion.id, type: currentQuestion.type, answer: Object.keys(checkboxValue) }])
      if (currentQuestion.answer.every(item => Object.keys(checkboxValue).length === currentQuestion.answer.length && checkboxValue[item])) {
        setPoints(points + 10 / questions.length)
      }
      setCheckboxValue({})
    }
    // Обработка данных с остальных инпутов
    else {
      setResult([...result, { questionId: currentQuestion.id, type: currentQuestion.type, answer: value.toString().toLowerCase().trim() }])
      if (currentQuestion.answer[0].toString().toLowerCase().trim() == value.toString().toLowerCase().trim()) {
        setPoints(points + 10 / questions.length)
      }
      setValue('')
    }
    // Обработка страницы с результатом
    if (questionNumberStorage + 1 === questions.length) {
    // Вывод всех ответов по тесту
      console.log(result);
      setStartedTest('')
    }
    setQuestionNumberStorage((prev: number) => ++prev)
  }

  React.useEffect(() => {
    setCurrentQuestion(questions[questionNumberStorage])
  }, [questionNumberStorage])

  return (
    <>
      <Link className="absolute top-5 left-5 font-semibold flex items-center hover:opacity-70 transition-all" href='/'><ArrowBackIcon className='mr-1' />На главную</Link>
      <div className="flex items-center pt-24 pb-2 justify-between">
        <Typography variant="h4" className="font-bold" component="h1">{questionNumberStorage === questions.length ? 'Результаты' : title }</Typography>
        {timer ? <Timer handleStopTest={handleStopTest} isRunning={startedTest === id} hours={hours} setHours={setHours} minutes={minutes} setMinutes={setMinutes} seconds={seconds} setSeconds={setSeconds} deadline={deadline} /> : "" }
      </div>
      <ProgressBar currentElement={questionNumberStorage} allElements={questions.length} />
      {questionNumberStorage !== questions.length ?
        <form action="#" onSubmit={handleSubmit} className="relative">
          { startedTest !== id && <div className="absolute w-full h-full z-20"></div> }
          <fieldset disabled={startedTest !== id} className={`${startedTest !== id ? 'blur-md' : ""} flex flex-col`}>
            <Typography className="py-8 inline-block font text-2xl">{currentQuestion.title}</Typography>
            {currentQuestion.type === 'radio' && currentQuestion.answerVariants !== undefined ?
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                {currentQuestion.answerVariants.map((item, index) => (
                  <FormControlLabel key={index} value={item} control={<Radio />} label={item} />
                ))}
              </RadioGroup>
              : currentQuestion.type === 'checkbox' && currentQuestion.answerVariants !== undefined ?
                currentQuestion.answerVariants.map((item, index) => (
                  <FormControlLabel key={index} label={item} control={<Checkbox className="self-start" key={index} checked={checkboxValue[item]} onChange={handleChange} name={item.toString()} />} />
                ))
              : currentQuestion.type === 'input' ?
                <TextField autoFocus value={value} onChange={handleChange}/>
              : currentQuestion.type === 'textArea' ?
                <TextField autoFocus value={value} onChange={handleChange} multiline rows={10}/>
              : <div></div>
            }
            <Button type="submit" disabled={startedTest !== id} sx={{mt: 4}} variant="contained" className="self-start">Ответить</Button>
          </fieldset>
          { startedTest !== id && <Button type="button" sx={{mt: 4, position: 'absolute'}} variant="contained" onClick={handleClick} className="z-50 self-start -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">Начать тест</Button> }
        </form>
      :
      <div className="flex font-medium text-xl flex-col justify-center items-center pt-24">
        <div className="pb-2">{(points * 10).toFixed(1)}%</div>
        <Rating max={10} value={points} readOnly />
        <Button onClick={handleResetTest} sx={{mt: 4}} variant="contained" endIcon={<ReplayIcon />}>Начать заново</Button>
      </div>
      }
    </>
  )
}