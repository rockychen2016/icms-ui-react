'use client'
import clsx from "clsx";
import { Color, bgColorMap, heightMap, Radius, radiusMap, Size } from "../common";

export type ICMSButtonProps = {
    size?: Size,
    radius?: Radius,
    color?: Color,
    icon?: React.ReactNode,
    loading?: boolean,
    text: string,
    className?:string,
    disabled?:boolean,
    onClick?:()=>void
}
export default function ICMSButton({
    size = 'md',
    radius = 'md',
    color = 'default',
    icon,
    loading,
    text,
    className,
    disabled,
    onClick
}: Readonly<ICMSButtonProps>) {
    return (
        <button type="button" onClick={()=>{
            if(!disabled && onClick && typeof onClick === 'function'){
                onClick();
            }
        }} className={clsx('px-3 flex items-center text-white outline-none', bgColorMap[color], heightMap[size], radiusMap[radius], disabled ? 'opacity-60' : 'hover:opacity-80 active:opacity-75', className)}>
            <div className="flex items-center gap-2">
                {
                    loading ? <svg
                        className="size-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        fontSize={size==='sm' ? 16 : size==='md' ? 18 : ''}
                    >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> : null
                }
                <div className={clsx('flex-1 flex items-center',size==='sm'? 'text-xs' : size==='md' ? 'text-sm' : '')}>
                    {icon}
                    <span>{text}</span>
                </div>
            </div>
        </button>
    );
}