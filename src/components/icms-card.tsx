
export type ICMSCardProps = {
    className?: string,
    header: React.ReactNode,
    body: React.ReactNode,
    footer?: React.ReactNode
}
export default function ICMSCard({
    className,
    header,
    body,
    footer
}: Readonly<ICMSCardProps>) {
    return (
        <div className={`w-full min-w-[375px] flex flex-col shadow-sm ring-1 ring-zinc-200 ${className ?? ''}`}>
            <div className="p-2">
                {header}
            </div>
            <div className="p-2 border-t border-zinc-200 dark:border-zinc-800">
                {
                    body
                }
            </div>
            {
                footer ? <div className="p-2 mt-2 border-t border-zinc-200 dark:border-zinc-800">
                    {
                        footer
                    }
                </div> : null
            }
        </div>
    );
}