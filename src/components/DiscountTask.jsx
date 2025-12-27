import { useState, useEffect, useRef } from 'react'
import { HiCheckCircle, HiXCircle, HiGift, HiStar } from 'react-icons/hi'
import Button from './ui/Button'
import { generateDiscountCode, saveDiscountToStorage } from '../utils/discountUtils'
import { DISCOUNT_TASKS, STORAGE_KEYS } from '../data/constants'
import './DiscountTask.css'

function DiscountTask() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [completed, setCompleted] = useState(false)
  const [discountCode, setDiscountCode] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleAnswer = (answerIndex) => {
    const newAnswers = { ...answers, [currentStep]: answerIndex }
    setAnswers(newAnswers)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      if (currentStep < DISCOUNT_TASKS.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        // Calculate score
        const score = DISCOUNT_TASKS.filter((task, index) => 
          newAnswers[index] === task.correct
        ).length

        if (score === DISCOUNT_TASKS.length) {
          setCompleted(true)
          const code = generateDiscountCode('CRUNCH', 6)
          setDiscountCode(code)
          // Save to localStorage
          saveDiscountToStorage(STORAGE_KEYS.TASK_DISCOUNT, {
            code,
            discount: 20,
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
          })
        } else {
          setCurrentStep(0)
          setAnswers({})
          alert(`You got ${score}/${DISCOUNT_TASKS.length} correct! Try again for a discount.`)
        }
      }
    }, 500)
  }

  const resetTask = () => {
    setCurrentStep(0)
    setAnswers({})
    setCompleted(false)
    setDiscountCode(null)
  }

  if (completed && discountCode) {
    return (
      <div className="discount-task completed">
        <div className="task-content">
          <div className="success-icon">
            <HiStar />
          </div>
          <h3 className="task-title">Congratulations!</h3>
          <p className="task-description">
            You've completed the challenge! Here's your discount code:
          </p>
          <div className="discount-code-display">
            <span className="discount-code">{discountCode}</span>
            <span className="discount-amount">20% OFF</span>
          </div>
          <p className="discount-info">
            Use this code at checkout to get 20% off your order. Valid for 7 days.
          </p>
          <Button variant="primary" onClick={resetTask}>
            Start New Challenge
          </Button>
        </div>
      </div>
    )
  }

  const currentTask = DISCOUNT_TASKS[currentStep]
  const progress = ((currentStep + 1) / DISCOUNT_TASKS.length) * 100

  if (!currentTask) {
    return null
  }

  return (
    <div className="discount-task">
      <div className="task-header">
        <div className="task-icon">
          <HiGift />
        </div>
        <h3 className="task-title">Complete Challenge & Get 20% Off</h3>
        <p className="task-subtitle">Answer 3 questions correctly to unlock your discount</p>
      </div>

      <div className="task-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="progress-text">
          Question {currentStep + 1} of {DISCOUNT_TASKS.length}
        </span>
      </div>

      <div className="task-content">
        <div className="question-container">
          <h4 className="question-text">{currentTask.question}</h4>
          <div className="options-grid">
            {currentTask.options?.map((option, index) => {
              const isSelected = answers[currentStep] === index
              const isCorrect = index === currentTask.correct
              const showResult = answers[currentStep] !== undefined

              return (
                <button
                  key={index}
                  className={`option-button ${
                    isSelected 
                      ? isCorrect 
                        ? 'correct' 
                        : 'incorrect'
                      : ''
                  } ${showResult && isCorrect ? 'show-correct' : ''}`}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                >
                  <span className="option-icon">
                    {showResult && isSelected && (
                      isCorrect ? <HiCheckCircle /> : <HiXCircle />
                    )}
                    {showResult && !isSelected && isCorrect && <HiCheckCircle />}
                  </span>
                  <span className="option-text">{option}</span>
                </button>
              )
            }) || []}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscountTask

