import { Radius, radiusMap } from "../common";
import { clsx } from "clsx";

export type ICMSImageProps = {
    width?: number | string,
    height?: number | string,
    src: string,
    alt: string,
    radius?: Radius,
    className?: string
}
export default function ICMSImage({
    width,
    height,
    src,
    alt,
    radius = 'md',
    className = 'object-cover'
}: Readonly<ICMSImageProps>) {
    return (
        <div className={clsx('inline-flex items-center ring-1 dark:ring-zinc-800',
            width ? (typeof width === 'number' ? width + 'px' : width) : '',
            height ? (typeof width === 'number' ? height + 'px' : height) : '',
            (width || height) ? `overflow-hidden ${radiusMap[radius]}` : radiusMap[radius]
        )}>
            <img src={src} alt={alt} className={clsx(radiusMap[radius], className)} />
        </div>
    );
}