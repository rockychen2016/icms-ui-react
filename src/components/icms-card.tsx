import { Radius, radiusMap } from "../common";
import { clsx } from "clsx";

export type ICMSCardProps = {
    className?: string,
    header: React.ReactNode,
    body: React.ReactNode,
    footer?: React.ReactNode,
    showDivider?: boolean,
    radius?: Radius
}
export default function ICMSCard({
    className = '',
    header,
    body,
    footer,
    showDivider = true,
    radius = 'md'
}: Readonly<ICMSCardProps>) {
    return (
        <div className={clsx('w-full flex flex-col flex-shrink shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800', radiusMap[radius], className)}>
            <div className="p-2">
                {header}
            </div>
            <div className={clsx('p-2', showDivider ? 'border-t border-zinc-200 dark:border-zinc-800' : '')}>
                {
                    body
                }
            </div>
            {
                footer ? <div className={clsx('p-2 mt-2', showDivider ? 'border-t border-zinc-200 dark:border-zinc-800' : '')}>
                    {
                        footer
                    }
                </div> : null
            }
        </div>
    );
}