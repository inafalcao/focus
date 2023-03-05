import { Pause, Play, Stop } from 'phosphor-react'
import {
  ButtonsContainer,
  CountDownButton,
  FieldsContainer,
  HomeContainer,
  MinutesAmountInput,
  TaskInput,
} from './HomeStyles'
import { CountDown } from './components/CountDown/CountDown'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from 'react'
import { useCountDown } from '../../hooks/useCountDown/useCountDown'

const newWorkSprintValidationSchema = zod.object({
  task: zod.string().min(1, 'Inform the task.'),
  minutes: zod.number().min(1, 'Time must be at least 1 minute.'),
})

type WorkSprintForm = zod.infer<typeof newWorkSprintValidationSchema>

interface WorkSprint {
  id: string
  task: string
  minutes: number
  start: Date
  end?: Date
}

export function Home() {
  const [workSprints, setWorkSprints] = useState<WorkSprint[]>([])
  const [activeSprintId, setActiveSprintId] = useState<string | undefined>()
  const { start, pause, resume, end, isPaused, remainingSeconds } =
    useCountDown(onFinishTask)

  const { register, handleSubmit, reset /*, watch, formState */ } =
    useForm<WorkSprintForm>({
      resolver: zodResolver(newWorkSprintValidationSchema),
      defaultValues: {
        minutes: 0,
        task: '',
      },
    })

  function handleCreateNewWorkSprint(data: WorkSprintForm) {
    if (!activeSprintId) {
      // Todo: this code would be ideally in a context
      const id = Date.now().toString()

      const newSprint: WorkSprint = {
        id,
        minutes: data.minutes,
        task: data.task,
        start: new Date(),
      }

      setActiveSprintId(id)
      setWorkSprints((state) => [...state, newSprint])

      start(/* newSprint.minutes */ 0.1)
    }
  }

  function onToggleResume() {
    if (!isPaused) {
      pause()
      console.log('pausou')
    } else {
      console.log('resumiu ')
      resume()
      console.log(isPaused)
    }
  }

  function onFinishTask() {
    console.log('CountDown finished')
    setActiveSprintId(null)

    // todo: add task to the list inside the context
    // todo: compute the total amount of time passed to add on the task itself
  }

  const activeSprint = workSprints.find(
    (sprint) => sprint.id === activeSprintId,
  )

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewWorkSprint)}>
        <FieldsContainer>
          <label htmlFor="task">gonna work in</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="give your task a name"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Project 1" />
          </datalist>

          <label htmlFor="minutes">for</label>
          <MinutesAmountInput
            type="number"
            id="minutes"
            placeholder="00"
            step={5}
            {...register('minutes', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FieldsContainer>

        <CountDown seconds={remainingSeconds}></CountDown>

        <ButtonsContainer>
          {!activeSprint && (
            <CountDownButton type="submit">
              <Play size={24} />
            </CountDownButton>
          )}

          {activeSprint && (
            <CountDownButton onClick={() => onToggleResume()} type="button">
              {isPaused ? <Play size={24} /> : <Pause size={24} />}
            </CountDownButton>
          )}

          {activeSprint && (
            <CountDownButton
              className="danger"
              onClick={() => end()}
              type="button"
            >
              <Stop size={24} />
            </CountDownButton>
          )}
        </ButtonsContainer>
      </form>
    </HomeContainer>
  )
}
