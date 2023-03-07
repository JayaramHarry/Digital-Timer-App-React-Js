// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimeRunning: false,
  getElapsedInSeconds: 0,
  getTimerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount = () => {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  onDecreaseMinutesLimit = () => {
    const {getTimerLimitInMinutes} = this.state

    if (getTimerLimitInMinutes > 1) {
      this.setState(prevState => ({
        getTimerLimitInMinutes: prevState.getTimerLimitInMinutes - 1,
      }))
    }
  }

  onIncrementMinutesLimit = () => {
    this.setState(prevState => ({
      getTimerLimitInMinutes: prevState.getTimerLimitInMinutes + 1,
    }))
  }

  renderTimeLimitController = () => {
    const {getElapsedInSeconds, getTimerLimitInMinutes} = this.state
    const isButtonIsDisable = getElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="timer-limit">Set Timer Limit</p>
        <div className="increase-decrease-buttons">
          <button
            className="button"
            disabled={isButtonIsDisable}
            onClick={this.onDecreaseMinutesLimit}
            type="button"
          >
            -
          </button>
          <p className="count">{getTimerLimitInMinutes}</p>
          <button
            className="button"
            onClick={this.onIncrementMinutesLimit}
            disabled={isButtonIsDisable}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedSeconds = () => {
    const {getElapsedInSeconds, getTimerLimitInMinutes} = this.state
    const isTimeCompleted = getElapsedInSeconds === getTimerLimitInMinutes * 60

    if (isTimeCompleted) {
      this.clearTimeInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        getElapsedInSeconds: prevState.getElapsedInSeconds + 1,
      }))
    }
  }

  onClickTimeStartAndPause = () => {
    const {
      isTimeRunning,
      getElapsedInSeconds,
      getTimerLimitInMinutes,
    } = this.state

    const isTimeCompleted = getElapsedInSeconds === getTimerLimitInMinutes * 60

    if (isTimeCompleted) {
      this.setState({getElapsedInSeconds: 0})
    }
    if (isTimeRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedSeconds, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  renderTimeController = () => {
    const {isTimeRunning} = this.state
    const startOrPauseImgUrl = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimeRunning ? 'pause icon' : 'play icon'

    return (
      <div className="icon-option-container">
        <button
          onClick={this.onClickTimeStartAndPause}
          type="button"
          className="button"
        >
          <img
            className="start-reset-icons"
            src={startOrPauseImgUrl}
            alt={startOrPauseAltText}
          />
          <p className="options">{isTimeRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button onClick={this.onResetTimer} className="button" type="button">
          <img
            className="start-reset-icons"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
          <p className="options">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {getElapsedInSeconds, getTimerLimitInMinutes} = this.state
    const totalRemainingSeconds =
      getTimerLimitInMinutes * 60 - getElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimeRunning} = this.state
    const labelText = isTimeRunning ? 'Running' : 'Paused'

    return (
      <div className="digital-timer-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="display-timer">
            <div className="white-container">
              <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="running-paused-time">{labelText}</p>
            </div>
          </div>
          <div className="stop-start-container">
            {this.renderTimeController()}
            {this.renderTimeLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
