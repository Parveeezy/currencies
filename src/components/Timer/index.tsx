import React, { useEffect, useState } from 'react';

interface TimerType {
    getCurrency: () => void
}

const Timer = ({ getCurrency }: TimerType) => {
    const minutes: string = '00';
    const [seconds, setSeconds] = useState<number>(59);

    useEffect(() => {
        if (seconds === 0) {
            getCurrency();
        }
    }, [seconds, getCurrency]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => prev === 0 ? 59 : prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            Currencies will be updated in: <span>{minutes}</span> : {seconds < 10 ? <span>0{seconds}</span> :
            <span>{seconds}</span>}
        </div>
    );
};

export default Timer;