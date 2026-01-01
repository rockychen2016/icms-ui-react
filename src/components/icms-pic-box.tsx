'use client'
import React from 'react'

export type ICMSImageProps = {
    imageUrl?: string
    imageAlt?: string
    imageNode?: React.ReactNode
    imageOverlay?: React.ReactNode
}

export type ICMSLinkProps = {
    href: string,
    target?: '_self' | '_blank'
}

export type ICMSPicBoxProps = {
    className?: string,
    image: ICMSImageProps,
    title: React.ReactNode
    description?: React.ReactNode
    descriptionLines?: number
    footer?: React.ReactNode
    link?: ICMSLinkProps,
    onClick?: () => void
    disabled?: boolean,
    imageHeight?: string,
}

export default function ICMSPicBox({
    imageHeight='h-48',
    className,
    image,
    title,
    description,
    descriptionLines = 2,
    footer,
    link,
    onClick,
    disabled = false
}: Readonly<ICMSPicBoxProps>) {

    const clickable = !!link || typeof onClick === 'function'

    const Wrapper: React.ElementType<any> = link
        ? 'a'
        : typeof onClick === 'function'
            ? 'button'
            : 'div'

    const wrapperProps: any = {}
    if (link) {
        wrapperProps.href = link.href
        if (link.target) wrapperProps.target = link.target;
        if (link.target === '_blank') wrapperProps.rel = 'noopener noreferrer'
        if (disabled) wrapperProps['aria-disabled'] = true
    } else if (typeof onClick === 'function') {
        wrapperProps.type = 'button'
        wrapperProps.onClick = disabled ? undefined : onClick
        if (disabled) wrapperProps.disabled = true
    }

    return (
        <div className={`w-full ${className}`}>
            <Wrapper
                className={`block w-full text-left bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700 overflow-hidden ${clickable && !disabled ? 'cursor-pointer hover:shadow-md' : ''} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
                {...wrapperProps}
            >
                <div className="relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {image.imageNode ? (
                        <div className={`w-full ${imageHeight} object-cover`}>
                            {image.imageNode}
                        </div>
                    ) : image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={image.imageUrl} alt={image.imageAlt} className={`w-full ${imageHeight} object-cover`} />
                    ) : (
                        <div className={`w-full ${imageHeight}`} />
                    )}

                    {image.imageOverlay ? (
                        <div className="absolute top-2 left-2 z-10">
                            {image.imageOverlay}
                        </div>
                    ) : null}
                </div>

                <div className="p-3">
                    <div className="text-xl font-medium truncate">{title}</div>
                    {description ? (
                        <div
                            className="text-sm h-10 text-gray-500 dark:text-gray-400 mt-1"
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: descriptionLines,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {description}
                        </div>
                    ) : null}
                </div>
                {footer ? <div className="p-3 border-t border-zinc-100 dark:border-zinc-800">{footer}</div> : null}
            </Wrapper>
        </div>
    )
}