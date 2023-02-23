import { CountDownContainer, Separator } from './CountDownStyles'

interface CountDownProps {
  seconds: number
}

export function CountDown({ seconds }: CountDownProps) {
  const minutesPart = Math.trunc(seconds * (1 / 60))
    .toString()
    .padStart(2, '0')
  const secondsPart = (seconds % 60).toString().padStart(2, '0')

  return (
    <CountDownContainer>
      <span>{minutesPart[0]}</span>
      <span>{minutesPart[1]}</span>
      <Separator>:</Separator>
      <span>{secondsPart[0]}</span>
      <span>{secondsPart[1]}</span>
    </CountDownContainer>
  )
}
