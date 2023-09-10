import {obitron} from "@/app/fonts";

export default function Heading({children}) {
    return (
        <div className={`font-bold pb-3 text-2xl ${obitron.className}`}>
            {children}
        </div>
    )
}