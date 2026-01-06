'use client'
import React from "react";
import { heightMap, Radius, radiusMap, Size } from "../common";
import { RxChevronLeft, RxChevronRight, RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { clsx } from "clsx";

export interface ICMSPageInfo {
    pageNo: number;
    pageSize: number;
    total: number;
}

export interface ICMSPaginationProps {
    className?: string,
    size?: Size,
    radius?: Radius,
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
    activeColor = 'bg-primary',
    pageInfo,
    onClick,
    href,
    maxPagesToShow = 7
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
        const className = ['icms-pagination-item px-2 border dark:border-zinc-700', radiusMap[radius], heightMap[size], isActive ? `${activeColor} text-white` : '']
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

    const renderItemContent = (icon: React.ReactNode | ((disabled: boolean) => React.ReactNode), disabled?: boolean) => {
        return typeof icon === "function" ? icon(Boolean(disabled)) : icon;
    };

    const renderNav = (
        icon: React.ReactNode | ((disabled: boolean) => React.ReactNode),
        target: number,
        disabled: boolean,
        key: string,
    ) => {
        const className = clsx('icms-pagination-nav max-sm:hidden border dark:border-zinc-700', radiusMap[radius], heightMap[size], 'px-2 py-1', disabled ? 'disabled:text-zinc-500' : '')
        const content = renderItemContent(icon, disabled);
        if (href) {
            return (
                <a key={key} href={buildHref(href, target)} className={className} aria-disabled={disabled}>
                    {content}
                </a>
            );
        }
        return (
            <button key={key} onClick={handleClick(target)} className={className} disabled={disabled}>
                {content}
            </button>
        );
    };

    return (
        <nav className={clsx('flex justify-center items-center gap-1', className)} aria-label="Pagination">
            {renderNav(<RxDoubleArrowLeft />, 1, current === 1, "first")}
            {renderNav(<RxChevronLeft />, Math.max(1, current - 1), current === 1, "prev")}
            <div className="flex items-center gap-1">{pages}</div>
            {renderNav(<RxChevronRight />, Math.min(totalPages, current + 1), current === totalPages, "next")}
            {renderNav(<RxDoubleArrowRight />, totalPages, current === totalPages, "last")}
        </nav>
    );
};

export default ICMSPagination;

