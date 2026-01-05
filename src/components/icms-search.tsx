'use client'
import { useState } from "react";
import { AiFillCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { heightMap, Size } from "../common";
import clsx from "clsx";
export { clsx } from 'clsx';
export type ICMSSearchProps = {
    className?: string,
    isClean?: boolean,
    size?: Size,
    onValueChange?: (value: string) => void,
    onSearch?: (value: string) => void
}
export default function ICMSSearch({
    className,
    isClean,
    size = 'md',
    onValueChange,
    onSearch
}: Readonly<ICMSSearchProps>) {
    const [value, setValue] = useState('')
    return (
        <div className={clsx(className, 'w-full px-4 flex items-center gap-1 bg-zinc-200 dark:bg-zinc-800 rounded-full')}>
            <input
                type="text"
                className={clsx(heightMap[size], 'flex-1 placeholder:text-gray-500 placeholder:text-sm outline-none text-sm bg-transparent')}
                value={value}
                onInput={(e) => {
                    const v = e.currentTarget.value;
                    if (onValueChange && typeof onValueChange === 'function') {
                        onValueChange(v);
                    }
                    setValue(v);
                }}
                onKeyDown={(e) => {
                    if (e.code.toLowerCase() === 'enter') {
                        if (onSearch && typeof onSearch === 'function') {
                            onSearch(value);
                        }
                    }
                }}
            />
            {
                isClean && value.length > 0 ?
                    <button
                        type="button"
                        onClick={() => setValue('')}
                    >
                        <AiFillCloseCircle />
                    </button> : null
            }
            <button
                type="button"
                onClick={() => {
                    if (onSearch && typeof onSearch === 'function') {
                        onSearch(value)
                    }
                }}
            >
                <AiOutlineSearch />
            </button>
        </div>
    );
}