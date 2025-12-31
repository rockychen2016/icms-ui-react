
export default function ICMSContentBlock({
    title,
    subTitle,
    children,
    className
}: {
    title: string,
    subTitle?: string,
    children: React.ReactNode,
    className?: string
}) {

    return (
        <div className={`w-full px-4 py-8 flex flex-col gap-4 ${className ?? ''}`}>
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-xl sm:text-2xl font-bold">{title}</h3>
                {
                    subTitle ?? <p className="text-sm">{subTitle}</p>
                }
            </div>
            {children}
        </div>
    );
}