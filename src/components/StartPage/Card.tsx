interface CardProps {
    title: string
    text: string
    icon: string
}

export default function Card(props: CardProps) {
    return (
        <div className={`
            flex flex-col gap-2 w-full p-8
            lg:w-1/3
            sm:w-1/2
            border border-transparent rounded-3xl
            hover:border-zinc-400 hover:bg-[#A2CE9B] hover:bg-opacity-15
        `}>
            <img
                className="w-10 h-10"
                src={props.icon}
                alt={"finance"+"-icon"}
            />
            <div className="text-xl font-bold">{props.title}</div>
            <div className="text-base">
                {props.text}
            </div>
        </div>
    )
}