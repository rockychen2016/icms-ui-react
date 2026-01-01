const radiusMap = {
    "none": "",
    "sm": " rounded-sm",
    "md": " rounded-md",
    "lg": " rounded-lg",
    "full": "rounded-full"
}

export type ICMSCardProps = {
    className?: string,
    header: React.ReactNode,
    body: React.ReactNode,
    footer?: React.ReactNode,
    showDivider?: boolean,
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
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
        <div className={`w-full min-w-[320px] flex flex-col shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700 ${radiusMap[radius]} ${className}`}>
            <div className="p-2">
                {header}
            </div>
            <div className={`p-2 ${showDivider ? ' border-t border-zinc-200 dark:border-zinc-800' : ''}`}>
                {
                    body
                }
            </div>
            {
                footer ? <div className={`p-2 mt-2${showDivider ? ' border-t border-zinc-200 dark:border-zinc-800' : ''}`}>
                    {
                        footer
                    }
                </div> : null
            }
        </div>
    );
}