import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./CountdownTimer.css";

/**
 * Displays timer for specified interval in seconds and calls the callback function
 * when the time interval is finished.
 */
const renderTime = (time) => {
    return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
            <div className="dimension">seconds</div>
        </div>
    );
};

const CountdownTimer = ({ interval, timerFinishedCallback }) => {
    const timeFraction = [1, 0.5, 0];
    const colorsTime = timeFraction.map((x) => interval * x);
    console.log(colorsTime);

    return (
        <CountdownCircleTimer
            isPlaying
            duration={interval}
            colors={['#39C700', '#EBFA00', '#FA0000']}
            size={300}
            colorsTime={colorsTime}
            onComplete={() => timerFinishedCallback()}
        >
            {({ remainingTime }) => renderTime(remainingTime)}
        </CountdownCircleTimer>
    );
};

export default CountdownTimer;
