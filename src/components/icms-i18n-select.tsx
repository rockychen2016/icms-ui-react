'use client'

import { useState } from "react";
import { heightMap, Radius, radiusMap, Size } from "../common";
import { IconLang } from "./icms-icons";
import { clsx } from "clsx";

export type I18NData = {
    id: string,
    name: string,
    icon?: string
}

export default function ICMSI18NSelect({
    data,
    locale,
    className,
    size = 'md',
    radius = 'md',
    onValueChange
}: Readonly<{
    data: Array<I18NData>,
    locale: string,
    className?: string,
    size?: Size,
    radius?: Radius,
    onValueChange?: (v: string) => void
}>) {
    const [value, setValue] = useState(locale);
    return (
        data.length > 0 ?
            <div className={clsx(heightMap[size],radiusMap[radius],'px-2 flex items-center bg-zinc-200 dark:bg-zinc-800', className)}>
                <div className="min-w-8">
                    <IconLang />
                </div>
                <select className="border-none outline-none bg-transparent text-zinc-500 text-sm" value={value} onChange={(e) => {
                    const value = e.target.value;
                    setValue(value)
                    if (onValueChange && typeof onValueChange === 'function') {
                        onValueChange(value)
                    }
                }}>{data.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
            </div>
            : null
    );
}