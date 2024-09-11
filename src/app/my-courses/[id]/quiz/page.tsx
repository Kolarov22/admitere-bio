'use client'
import React, {useState, useEffect} from 'react'

import { usePathname } from 'next/navigation'
import { quiz } from '@/app/data'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { Undo2 } from 'lucide-react'


const QuizPage = () => {
  const pathName = usePathname()
  const courseId = pathName.split('/')[2]
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [quizState, setQuizState] = useState('ongoing')
  
  const nextQuestion = () => {
    if (quiz[currentQuestion].correctAnswer === selectedAnswer) {
      setScore(prevScore => prevScore + 1)
    }

    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1)
    } else {
       setQuizState('finished')
    }

    setSelectedAnswer('')
}
  
  return quizState === "ongoing" ? (
    <main className="mt-20">
      <h1 className="text-center text-3xl">Welcome to quiz #{courseId}</h1>
      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-1 gap-4">
          {quiz.map(
            (item, index) =>
              currentQuestion === index && (
                <div
                  key={index}
                  className="bg-gray-100 p-4 shadow-md flex flex-col gap-3"
                >
                  <h3 className="text-xl text-center font-bold">
                    {item.question}
                  </h3>
                  <div className="grid grid-cols-1 gap-10 mt-4">
                    {item.answers.map((answer, index) => (
                      <button
                        onClick={() => setSelectedAnswer(answer)}
                        key={index}
                        className={`bg-gray-200 w-2/4 mx-auto p-4 rounded-md hover:bg-slate-300 transition ease-linear ${
                          selectedAnswer === answer ? "bg-slate-300" : ""
                        }`}
                      >
                        {answer}
                      </button>
                    ))}
                  </div>
                  <Button
                    onClick={nextQuestion}
                    className="p-4 rounded-md mt-10 mx-auto w-1/4"
                  >
                    {index === quiz.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              )
          )}
        </div>
      </div>
    </main>
  ) : (
    <div className="bg-gray-200 shadow-md rounded-md mt-40 w-5/6 md:w-2/4 mx-auto py-4 px-3 flex flex-col gap-8 items-center justify-center">
      <h1 className="text-center text-4xl font-bold mt-10">
        Quiz #{courseId} finished!
      </h1>
      <p className="text-center mt-5 text-2xl">
        Your score is {score} out of {quiz.length}
        <br />
        {Math.floor((score / quiz.length) * 100)}%
      </p>
      <Progress
        className=" my-10 max-w-1/3 w-1/2 mx-auto "
        value={(score / quiz.length) * 100}
      />

      <Button asChild>
        <Link href={`/my-courses/${courseId}`}>
         Return to course <Undo2 size={24} className='ml-1' />
        </Link>
      </Button>
    </div>
  );
}

export default QuizPage