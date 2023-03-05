import { useEffect, useReducer } from 'react'

interface UseCountDown {
  minutes: number
  intervalId?: number
  isPaused: boolean
  secondsPassed: number
}

export function useCountDown(onEnd: () => void) {
  const [countDown, dispatch] = useReducer(
    (state: UseCountDown, action) => {
      switch (action.type) {
        case 'START':
          return { ...state, minutes: action.payload }

        case 'RESUME': {
          const secondsPassed = state.secondsPassed + 1
          const isCountDownFinished = secondsPassed >= state.minutes * 60

          return {
            ...state,
            secondsPassed,
            minutes: isCountDownFinished ? 0 : state.minutes,
            isPaused: false,
          }
        }

        case 'PAUSE':
          if (state.intervalId) {
            clearInterval(state.intervalId)
            return { ...state, intervalId: undefined, isPaused: true }
          }
          return { ...state, isPaused: true }

        case 'END':
          clearInterval(state.intervalId)
          return {
            ...state,
            intervalId: undefined,
            minutes: 0,
            secondsPassed: 0,
            isPaused: false,
          }

        case 'SET_INTERVAL':
          return { ...state, intervalId: action.payload }

        default:
          return state
      }
    },
    { minutes: 0, intervalId: undefined, isPaused: false, secondsPassed: 0 },
  )

  useEffect(() => {
    if (countDown.minutes) {
      resume()
    } else {
      end()
    }
  }, [countDown.minutes])

  function resume() {
    dispatch({ type: 'RESUME' })
    if (!countDown.intervalId) {
      const intervalId = setInterval(function () {
        dispatch({ type: 'RESUME' })
      }, 1000)

      dispatch({ type: 'SET_INTERVAL', payload: intervalId })
    }
  }

  function pause() {
    dispatch({ type: 'PAUSE' })
  }

  function end() {
    dispatch({ type: 'END' })
    onEnd()
  }

  function start(minutesAmount: number) {
    dispatch({
      type: 'START',
      payload: minutesAmount,
    })
  }

  return {
    start,
    end,
    resume,
    pause,
    isPaused: countDown.isPaused,
    remainingSeconds: countDown.minutes * 60 - countDown.secondsPassed,
  }
}
