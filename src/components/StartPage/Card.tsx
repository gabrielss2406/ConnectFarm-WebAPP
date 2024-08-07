import React from 'react';
import { IconType } from 'react-icons';

interface CardProps {
    title: string;
    text: string;
    icon: IconType;
    bgColor: string;
}

export const Card: React.FC<CardProps> = ({ icon: Icon, text, title, bgColor }) => {
    return (
        <div className={`
            flex flex-col gap-2 w-full p-8
            lg:w-1/3
            sm:w-1/2
            border border-transparent rounded-3xl
            hover:border-zinc-400 hover:bg-[#A2CE9B] hover:bg-opacity-15
        `}>
            <div
                className="flex items-center justify-center w-12 h-12 rounded-lg p-1"
                style={{ backgroundColor: bgColor }}
            >
                <Icon size={36} color="white" />
            </div>
            <div className="text-xl font-bold">{title}</div>
            <div className="text-base">
                {text}
            </div>
        </div>
    );
}
