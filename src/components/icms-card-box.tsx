import { Radius, radiusMap, shapSizeMap, Size, thumbSizeMap } from "../common";
import ICMSCard from "./icms-card";
export type ICMSCardBoxProps = {
    icon?: {
        url: string,
        size?: Size,
        radius?: Radius,
        className?:string,
    },
    title: string,
    subTitle?: string,
    radius?: Radius,
    content: React.ReactNode,
    footer?: React.ReactNode,
    className?:string
}
export default function ICMSCardBox({
    icon ={
        url:'https://picsum.photos/200/300?random=1',
        size:'sm',
        radius:'md'
    },
    title,
    subTitle,
    content,
    footer,
    radius = 'lg',
    className
}: Readonly<ICMSCardBoxProps>) {
    return (
        <ICMSCard
            radius={radius}
            showDivider={false}
            className={`${className}`}
            header={
                <div className="flex items-center justify-start gap-2">
                    {
                        icon ?
                            <div className={`${thumbSizeMap[icon.size ?? 'md']} ${radiusMap[icon.radius??'md']} ${icon.className??''} overflow-hidden`}>
                                <img src={icon.url} alt={title} className={`object-cover`} />
                            </div>
                            : null
                    }
                    <div className="flex-1">
                        <h4 className="text-base font-medium">{title}</h4>
                        <p className="text-sm">{subTitle ?? ''}</p>
                    </div>
                </div>
            }
            body={content}
            footer={footer}
        />
    )
}