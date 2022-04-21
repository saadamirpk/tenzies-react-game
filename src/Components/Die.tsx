import React from "react";

export default function Die(props: any) {
    return (
        <div
            onClick={() => props.toggleHeld(props.id)}
            className={"die-face " + (props.isHeld && "die-face-green")}
        >
            <span className="die-num">{props.val}</span>
        </div>
    );
}
