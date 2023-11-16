import { FC, useEffect, useState } from "react";

import "./greeting.style.css";

type Props = {
    name: string,
    is24HourFormat: boolean
}

const Greeting: FC<Props> = ({name, is24HourFormat}) => {
    const [time, setTime] = useState<string>("");
    const [greet, setGreet] = useState<string>("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = new Date();
            let hours: number | string = currentTime.getHours();
            let minutes: number | string = currentTime.getMinutes();

            if (hours === 0) {
                setGreet("midnight")
            } else if (hours >= 1 && hours <=5) {
                setGreet("night")
            } else if (hours >= 6 && hours <=11) {
                setGreet("morning")
            } else if (hours === 12 ) {
                setGreet("noon")
            } else if (hours >= 13 && hours <=17) {
                setGreet("afternoon")
            } else if (hours >= 18 && hours <=23) {
                setGreet("evening")
            }

            if (!is24HourFormat) {
                const ampm = hours >= 12 ? "PM" : "AM";
                hours = hours % 12 || 12;
                minutes = minutes < 10 ? `0${minutes}` : minutes;
        
                setTime(`${hours}:${minutes} ${ampm}`);
            } else {
                hours = hours < 10 ? `0${hours}` : hours;
                minutes = minutes < 10 ? `0${minutes}` : minutes;

                setTime(`${hours}:${minutes}`);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [is24HourFormat]);

    return (
        <div className="greeting">
            <div className="clock">{time}</div>
            <h2>Good {greet}, {name}</h2>
        </div>
    );
}

export default Greeting;