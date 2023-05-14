import React, {useEffect, useState} from 'react';

interface TimerType {
    getCurrency: () => void
}

const Timer = (props: TimerType) => {

    const minutes: string = '00'
    const [seconds, setSeconds] = useState<number>(60)


    useEffect(() => {
        setTimeout(() => {
            setSeconds(seconds - 1)
            if (seconds === 0) {
                props.getCurrency()
                setSeconds(60)
            }
        }, 1000)
    }, [seconds])


    return (
        <div>
            Currencies will be updated in: <span>{minutes}</span> : {seconds < 10 ? <span>0{seconds}</span> :
            <span>{seconds}</span>}
        </div>
    );
};

export default Timer;