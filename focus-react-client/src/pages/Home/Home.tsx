import { Play } from 'phosphor-react'
import {
  CountDownButton,
  CountDownContainer,
  FieldsContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  TaskInput,
} from './HomeStyles'

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FieldsContainer>
          <label htmlFor="task">gonna work in</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="give your task a name"
          />

          <datalist id="task-suggestions">
            <option value="Project 1" />
          </datalist>

          <label htmlFor="mnutesAmount">for</label>
          <MinutesAmountInput
            type="number"
            id="number"
            placeholder="00"
            step={5}
            min={5}
          />

          <span>minutes.</span>
        </FieldsContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <CountDownButton type="submit">
          <Play size={24} />
          Go!
        </CountDownButton>
      </form>
    </HomeContainer>
  )
}
