import React, { useEffect, useState } from "react";

export default function Die() {
    const [num, setNum] = useState(1);

    function getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
        //The maximum is inclusive and the minimum is inclusive
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setNum((prev) => {
                let n = getRandomIntInclusive(1, 9);
                while (n == prev) {
                    n = getRandomIntInclusive(1, 9);
                }
                return n;
            });
        }, getRandomIntInclusive(50, 100));
        return () => clearTimeout(timer);
    }, [num]);

    return (
        <div className="die-face">
            <span className="die-num">{num}</span>
        </div>
    );
}
