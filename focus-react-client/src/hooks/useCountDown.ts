import { useEffect, useState } from 'react'

export function useCountDown() {
  const [minutes, setMinutes] = useState(0)
  // const [startDate, setStartDate] = useState<number | undefined>(undefined)
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined)
  const [secondsPassed, setSecondsPassed] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  function end() {
    clearInterval(intervalId)
    setIntervalId(undefined)
    setMinutes(0)
    setSecondsPassed(0)
  }

  function resume() {
    if (!intervalId) {
      setIntervalId(
        setInterval(function () {
          if (secondsPassed === minutes * 60) {
            end()
          } else {
            setSecondsPassed((state) => state + 1)
          }
        }, 1000),
      )
    }
    setIsPaused(false)
  }

  useEffect(() => {
    if (minutes) {
      resume()
    }
  }, [minutes])

  function pause() {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(undefined)
    }
    setIsPaused(true)
  }

  function start(minutesAmount: number) {
    // setStartDate(Date.now())
    setMinutes(minutesAmount)
  }

  const remainingSeconds = minutes * 60 - secondsPassed

  return { start, end, pause, resume, isPaused, remainingSeconds } as const
}
