import moment from 'moment'

export function getTimeElapsed (startTime) {
  return (moment() - moment(startTime)) / 1000
}
