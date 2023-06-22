import { useState, useEffect, useRef } from "react"

function Stopwatch() {

    let [totalSeconds, setTotalSeconds] = useState(0)

    let [seconds, setSeconds] = useState(0)
    let [minutes, setMinutes] = useState(0)
    let [hours, setHours] = useState(0)

    let [isTicking, setIsTicking] = useState(false)
    let [timerSet, SetTimerSet] = useState(false)

    let [intervalRef, setIntervalRef] = useState(null)

    const HRef = useRef(null)
    const MRef = useRef(null)
    const SRef = useRef(null)

    const reset = () => {
        clearInterval(intervalRef)

        setIsTicking(false)
        SetTimerSet(false)

        setSeconds(0)
        setMinutes(0)
        setHours(0)

        setTotalSeconds(0)

        HRef.current.value = '00'
        MRef.current.value = '00'
        SRef.current.value = '00'
    }

    const stopHandler = () => {
        clearInterval(intervalRef)
        setIsTicking(false)
    }

    const startHandler = () => {
        stopHandler()

        if (totalSeconds >= 0) {
            if (!timerSet) {
                SetTimerSet(true)
            }

            setIsTicking(true)
            const sec = setInterval(() => {
                setTotalSeconds((prev) => prev + 1)
            }, 1000);

            setIntervalRef(sec)

            return () => clearInterval(sec)
        }
    }

    useEffect(() => {
        let h = Math.floor(totalSeconds / 3600)
        let m = Math.floor((totalSeconds - h * 3600) / 60)
        let s = Math.floor((totalSeconds - h * 3600 - m * 60))

        setHours(h)
        setMinutes(m)
        setSeconds(s)

        if (totalSeconds >= 359999) {
            stopHandler()
        }
    }, [totalSeconds])

    // 

    return (
        <div className="container">
            <div className="input-container">
                <input ref={HRef} id="hour" type="number" disabled={true} min={0} max={99} {...(timerSet ? { value: hours < 10 ? '0' + hours : hours } : { value: '00' })}></input>
                <input ref={MRef} id="minute" type="number" disabled={true} min={0} max={59} {...(timerSet ? { value: minutes < 10 ? '0' + minutes : minutes } : { value: '00' })}></input>
                <input ref={SRef} id="second" type="number" disabled={true} min={0} max={59} {...(timerSet ? { value: seconds < 10 ? '0' + seconds : seconds } : { value: '00' })}></input>
            </div>

            <div className="button" onClick={() => {
                isTicking ? stopHandler() : startHandler()
            }}>
                {isTicking ? (<svg style={{ display: 'block', margin: 'auto' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                </svg>) : (<svg style={{ display: 'block', margin: 'auto' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>)}
            </div>
            <div className="button" onClick={reset}>
                <svg style={{ display: 'block', margin: 'auto' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
                </svg>
            </div>
        </div >
    )
}

export default Stopwatch