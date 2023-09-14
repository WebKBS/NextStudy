'use client';

import {useState} from "react";

export default function ShareLinkButton() {
    const [clicked, setClicked] = useState(false);


    const handleClick = () => {
        navigator.clipboard.writeText(window.location.href).then(_ => {
            setClicked(true);
            setTimeout(() => setClicked(false), 1500);
        });
        console.log("Hello", clicked);

    }
    return (
        <button
            onClick={handleClick}
            className="border px-2 py-1 rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700">
            {clicked ? "Link Copied" : "Share link"}
        </button>

    )
}