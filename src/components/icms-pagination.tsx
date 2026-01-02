'use client'
import React from "react";

const sizeMap = {
    "sm": "text-sm",
    "md": "text-base",
    "lg": "text-xl"
}

const radiusMap = {
    "none": "",
    "sm": " rounded-sm",
    "md": " rounded-md",
    "lg": " rounded-lg",
    "full": "rounded-full"
}



export interface ICMSPageInfo {
    pageNo: number;
    pageSize: number;
    total: number;
}

export interface ICMSPaginationProps {
    className?: string,
    size?: 'sm' | 'md' | 'lg',
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
    activeColor?: string
    pageInfo: ICMSPageInfo;
    onClick?: (pageNo: number) => void;
    /**
     * href can be a string template containing `{pageNo}` or a function that returns a string.
     * If provided, links will be used and `onClick` will not be invoked (href 优先).
     */
    href?: string | ((pageNo: number) => string);
    /** 最大显示页码数量，默认 7 */
    maxPagesToShow?: number;
    /** 导航图标或渲染函数（传入 disabled: boolean） */
    firstIcon?: React.ReactNode | ((disabled: boolean) => React.ReactNode);
    prevIcon?: React.ReactNode | ((disabled: boolean) => React.ReactNode);
    nextIcon?: React.ReactNode | ((disabled: boolean) => React.ReactNode);
    lastIcon?: React.ReactNode | ((disabled: boolean) => React.ReactNode);
}

const getTotalPages = (pageInfo: ICMSPageInfo) =>
    Math.max(1, Math.ceil(pageInfo.total / pageInfo.pageSize));

const buildHref = (href: string | ((pageNo: number) => string), pageNo: number) => {
    if (typeof href === "function") return href(pageNo);
    if (href.includes("{pageNo}")) return href.replace(/{pageNo}/g, String(pageNo));
    const sep = href.includes("?") ? "&" : "?";
    return `${href}${sep}pageNo=${pageNo}`;
};

const ICMSPagination: React.FC<ICMSPaginationProps> = ({
    className = '',
    size = 'md',
    radius = 'md',
    activeColor = 'bg-red-500',
    pageInfo,
    onClick,
    href,
    maxPagesToShow = 7,
    firstIcon,
    prevIcon,
    nextIcon,
    lastIcon,
}) => {
    const totalPages = getTotalPages(pageInfo);
    const current = Math.min(Math.max(1, pageInfo.pageNo || 1), totalPages);

    const handleClick = (pageNo: number) => (e?: React.MouseEvent) => {
        if (href) return; // href 优先，使用链接导航
        e && e.preventDefault();
        if (onClick) onClick(pageNo);
    };

    const makeItem = (pageNo: number, key?: string | number) => {
        const isActive = pageNo === current;
        const className = [`icms-pagination-item border px-2 py-1 ${radiusMap[radius]}`, isActive ? ` ${activeColor} text-white` : null]
            .filter(Boolean)
            .join(" ");

        if (href) {
            const h = buildHref(href, pageNo);
            return (
                <a key={key ?? pageNo} href={h} className={className} aria-current={isActive ? "page" : undefined}>
                    {pageNo}
                </a>
            );
        }

        return (
            <button key={key ?? pageNo} onClick={handleClick(pageNo)} className={className} disabled={isActive}>
                {pageNo}
            </button>
        );
    };

    // Build page list with windowing and ellipsis
    const pages: React.ReactNode[] = [];
    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, current - half);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);
    if (end - start + 1 < maxPagesToShow) {
        start = Math.max(1, end - maxPagesToShow + 1);
    }

    if (start > 1) {
        pages.push(makeItem(1));
        if (start > 2) pages.push(<span key="start-ellipsis" className="icms-pagination-ellipsis">…</span>);
    }

    for (let i = start; i <= end; i++) pages.push(makeItem(i));

    if (end < totalPages) {
        if (end < totalPages - 1) pages.push(<span key="end-ellipsis" className="icms-pagination-ellipsis">…</span>);
        pages.push(makeItem(totalPages));
    }

    const renderItemContent = (label: React.ReactNode, icon?: React.ReactNode | ((disabled: boolean) => React.ReactNode), disabled?: boolean) => {
        if (icon) return typeof icon === "function" ? icon(Boolean(disabled)) : icon;
        return label;
    };

    const renderNav = (
        label: React.ReactNode,
        target: number,
        disabled: boolean,
        key?: string,
        icon?: React.ReactNode | ((disabled: boolean) => React.ReactNode),
    ) => {
        const className = `icms-pagination-nav border ${radiusMap[radius]} px-2 py-1 ${disabled ? " disabled:text-gray-500" : ""}`;
        const content = renderItemContent(label, icon, disabled);
        if (href) {
            return (
                <a key={key ?? String(label)} href={buildHref(href, target)} className={className} aria-disabled={disabled}>
                    {content}
                </a>
            );
        }
        return (
            <button key={key ?? String(label)} onClick={handleClick(target)} className={className} disabled={disabled}>
                {content}
            </button>
        );
    };

    return (
        <nav className={`flex justify-center items-center gap-1 ${sizeMap[size]} ${className}`} aria-label="Pagination">
            {renderNav("首页", 1, current === 1, "first", firstIcon)}
            {renderNav("上一页", Math.max(1, current - 1), current === 1, "prev", prevIcon)}
            <div className="flex items-center gap-1">{pages}</div>
            {renderNav("下一页", Math.min(totalPages, current + 1), current === totalPages, "next", nextIcon)}
            {renderNav("尾页", totalPages, current === totalPages, "last", lastIcon)}
        </nav>
    );
};

export default ICMSPagination;

