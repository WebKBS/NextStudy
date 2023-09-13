import Heading from "@/components/Heading";
import Link from "next/link";

export default function HomePage() {
    return (
        <>
            <Heading>Indie Game</Heading>
            <p className="pb-3">Welcome</p>
            <div
                className="border w-80 bg-white rounded shadow hover:shadow-xl sm:w-full">
                <Link href='/reviews/stardew-valley'
                      className="flex flex-col sm:flex-row">
                    <img src="/images/stardew-valley.jpg" alt="" width="320"
                         height="180"
                         className="rounded-t sm:rounded-l sm:rounded-r-none"/>
                    <h2 className="font-semibold py-1 text-center font-orbitron sm:px-2">
                        Start
                    </h2>
                </Link>
            </div>
        </>
    );
}
