'use client'
import { useCallback } from 'react';

export type ArticleItem = {
    id?: string | number;
    title: string;
    description?: string;
    imageUrl?: string; // main image or thumbnail
    date?: string | number | Date;
    link?: {
        href: string,
        target?: '_blank'
    }
};

type ICMSArticleListProps = {
    items: ArticleItem[];
    className?: string;
    onItemClick?: (item: ArticleItem) => void;
};

function formatDate(input?: string | number | Date) {
    if (!input) return '';
    const d = typeof input === 'string' || typeof input === 'number' ? new Date(input) : input;
    if (Number.isNaN(d.getTime())) return '';

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.floor((startOfToday.getTime() - new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()) / (24 * 60 * 60 * 1000));

    const pad = (n: number) => String(n).padStart(2, '0');
    const hhmm = `${pad(d.getHours())}:${pad(d.getMinutes())}`;

    if (diffDays === 0) return `今天 ${hhmm}`;
    if (diffDays === 1) return `昨天 ${hhmm}`;
    if (diffDays === 2) return `前天 ${hhmm}`;

    if (d.getFullYear() === now.getFullYear()) {
        // 月份-日期 hh:mm
        return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${hhmm}`;
    }

    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${hhmm}`;
}

export default function ICMSArticleList({ items, className, onItemClick }: ICMSArticleListProps) {
    if (!items || items.length === 0) return null;

    const [first, ...rest] = items;

    const onTap = useCallback((item: ArticleItem) => {
        if (onItemClick && typeof onItemClick === 'function') {
            onItemClick(item);
        }
    }, [onItemClick])

    return (

        <div className={`w-full p-3 ${className ?? ''}`}>
            {/* First item: if has image, show full-width image with title overlay */}
            {first.imageUrl ? (
                first.link ?
                    <a className='block' title={first.title} href={first.link.href} target={first.link.target ?? '_self'}>
                        <article className="w-full mb-4">
                            <div className="relative w-full overflow-hidden rounded-md">
                                <img src={first.imageUrl} alt={typeof first.title === 'string' ? first.title : 'image'} className="w-full h-56 object-cover" />
                                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                    <h3 className="text-white text-lg font-semibold truncate">{first.title}</h3>
                                </div>
                            </div>
                        </article>
                    </a>
                    :
                    <article className="w-full mb-4" onClick={() => onTap(first)}>
                        <div className="relative w-full overflow-hidden rounded-md">
                            <img src={first.imageUrl} alt={typeof first.title === 'string' ? first.title : 'image'} className="w-full h-56 object-cover" />
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <h3 className="text-white text-lg font-semibold truncate">{first.title}</h3>
                            </div>
                        </div>
                    </article>
            ) : (
                first.link ?
                    <a className='block' href={first.link.href} target={first.link.target ?? '_self'} title={first.title}>
                        <article className="mb-4 p-3 rounded-md bg-white dark:bg-gray-800">
                            <h3 className="text-gray-900 dark:text-gray-100 text-lg font-semibold">{first.title}</h3>
                            {first.description ? <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-3">{first.description}</p> : null}
                        </article>
                    </a> :
                    <article className="mb-4 p-3 rounded-md bg-white dark:bg-gray-800" onClick={() => onTap(first)}>
                        <h3 className="text-gray-900 dark:text-gray-100 text-lg font-semibold">{first.title}</h3>
                        {first.description ? <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-3">{first.description}</p> : null}
                    </article>
            )}

            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {rest.map((it) => (
                    <li key={it.id ?? String(it.title)} className="py-3">
                        {
                            it.link ?
                                <a className='block' title={it.title} href={it.link.href} target={it.link.target ?? '_self'}>
                                    <div className="flex items-start gap-3">
                                        {it.imageUrl ? (
                                            <div className="flex-shrink-0 w-20 h-14 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700">
                                                <img src={it.imageUrl} alt={typeof it.title === 'string' ? it.title : 'thumb'} className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="flex-shrink-0 w-20 h-14 rounded-md bg-gray-50 dark:bg-gray-800" />
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-3">
                                                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{it.title}</h4>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{formatDate(it.date)}</div>
                                            </div>
                                            {it.description ? (
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate" title={it.description}>
                                                    {it.description.length > 100 ? `${it.description.slice(0, 100)}…` : it.description}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                </a>
                                :
                                <div className="flex items-start gap-3" onClick={() => onTap(it)}>
                                    {it.imageUrl ? (
                                        <div className="flex-shrink-0 w-20 h-14 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700">
                                            <img src={it.imageUrl} alt={typeof it.title === 'string' ? it.title : 'thumb'} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="flex-shrink-0 w-20 h-14 rounded-md bg-gray-50 dark:bg-gray-800" />
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{it.title}</h4>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{formatDate(it.date)}</div>
                                        </div>
                                        {it.description ? (
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate" title={it.description}>
                                                {it.description.length > 100 ? `${it.description.slice(0, 100)}…` : it.description}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
}
