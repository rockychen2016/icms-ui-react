'use client'

const radiusMap = {
    "none": "",
    "sm": " rounded-sm",
    "md": " rounded-md",
    "lg": " rounded-lg",
    "full": "rounded-full"
}

const sizeMap = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
};
type Size = 'sm' | 'md' | 'lg';
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full'

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
    return (
        data.length > 0 ?
            <div className={`${sizeMap[size]} ${radiusMap[radius]} px-2 flex items-center bg-zinc-200 dark:bg-zinc-800 ${className}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"></path></svg>
                <select className="border-none outline-none bg-transparent" onChange={(e) => {
                    const value = e.target.value;
                    if (onValueChange && typeof onValueChange === 'function') {
                        onValueChange(value)
                    }
                }}>{data.map(item => <option value={item.id} selected={locale === item.id}>{item.name}</option>)}</select>
            </div>
            : null
    );
}