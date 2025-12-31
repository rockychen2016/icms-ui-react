'use client'
import React, { useEffect, useRef, useState } from "react";

export type ICMSMenuItem = {
    key?: string;
    label: React.ReactNode;
    href?: string;
    children?: Array<Pick<ICMSMenuItem, 'key' | 'label' | 'href'>>;
    className?: string,
    /**
     * container 在二级菜单面板中与子项并列显示的自定义内容（ReactNode）
     */
    container?: React.ReactNode;
};


export type ICMSNavbarProps = {
    menus: ICMSMenuItem[];
    itemClassName?: string,
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    className?: string;
    position?: 'left' | 'center' | 'right',
    childrenClass?: string,
};

export default function ICMSNavbar({
    menus,
    startContent,
    endContent,
    className = "",
    position = 'right',
    childrenClass = 'bg-white'
}: ICMSNavbarProps) {
    const [desktopOpenKey, setDesktopOpenKey] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileOpenKeys, setMobileOpenKeys] = useState<Record<string, boolean>>(
        {}
    );
    const navRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!navRef.current) return;
            if (!navRef.current.contains(e.target as Node)) {
                setDesktopOpenKey(null);
            }
        }
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    const toggleMobileKey = (key: string) => {
        setMobileOpenKeys((s) => ({ ...s, [key]: !s[key] }));
    };

    return (
        <nav
            ref={navRef}
            className={`w-full ${className}`}
            aria-label="Primary"
        >
            <div className="mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">{startContent}</div>
                    <div className={`flex items-center gap-4 ${position == 'left' ? 'flex-1' : position === 'right' ? 'flex-1 justify-end' : 'justify-center'}`}>
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-2">
                                {menus.map((m, idx) => {
                                    const key = m.key ?? String(idx);
                                    const hasChildren = !!m.children?.length;
                                    const open = desktopOpenKey === key;
                                    return (
                                        <div
                                            key={key}
                                            className="relative"
                                            onMouseEnter={() => hasChildren && setDesktopOpenKey(key)}
                                            onMouseLeave={() => hasChildren && setDesktopOpenKey(null)}
                                        >
                                            {m.href ? (
                                                <a
                                                    href={m.href}
                                                    className={`inline-flex items-center px-3 py-2 text-sm font-medium ${m.className ?? ''}`}
                                                >
                                                    {m.label}
                                                </a>
                                            ) : (
                                                <button
                                                    onClick={() => hasChildren && setDesktopOpenKey(open ? null : key)}
                                                    className={`inline-flex items-center px-3 py-2 text-sm font-medium ${m.className ?? ''}`}
                                                    aria-expanded={open}
                                                >
                                                    {m.label}
                                                </button>
                                            )}
                                            <div
                                                className={`absolute left-0 top-full z-50 rounded-t-none rounded-b-md shadow-lg min-w-[150px] dark:bg-zinc-900 ${childrenClass} ${m.children && open ? '' : 'hidden'}`}
                                                role="menu"
                                            >
                                                <div className="w-full flex justify-start">
                                                    <div className="flex-1">
                                                        {m.children && m.children.map((child, cidx) => (
                                                            <a
                                                                key={child.key ?? `${key}-c-${cidx}`}
                                                                href={child.href ?? "#"}
                                                                className="block px-3 py-2 text-sm"
                                                                role="menuitem"
                                                            >
                                                                {child.label}
                                                            </a>
                                                        ))}
                                                    </div>
                                                    {m.container ?? null}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">{endContent}</div>
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileOpen((s) => !s)}
                                aria-expanded={mobileOpen}
                                aria-label="Toggle menu"
                                className="inline-flex items-center justify-center rounded-md"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {mobileOpen ? (
                                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile panel */}
            {mobileOpen && (
                <div className="md:hidden fixed z-50 left-0 right-0 border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-800">
                    <div className="p-4">
                        <div className="py-3 flex items-center justify-center border-gray-300 dark:border-gray-800">
                            {endContent}
                        </div>
                        <div className="space-y-1">
                            {menus.map((m, idx) => {
                                const key = m.key ?? String(idx);
                                const hasChildren = !!m.children?.length;
                                const opened = !!mobileOpenKeys[key];
                                return (
                                    <div key={key} className="border-b pb-2 border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center justify-between">
                                            {m.href ? (
                                                <a href={m.href} className={`block px-2 py-2 text-base ${m.className ?? ''}`}>
                                                    {m.label}
                                                </a>
                                            ) : (
                                                <div className={`px-2 py-2 text-base text-gray-700 ${m.className ?? ''}`}>{m.label}</div>
                                            )}
                                            {hasChildren ? (
                                                <button
                                                    onClick={() => toggleMobileKey(key)}
                                                    className="mx-1 inline-flex h-8 w-8 items-center justify-center rounded text-gray-500"
                                                    aria-expanded={opened}
                                                >
                                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                                        {opened ? (
                                                            <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M6 14L14 6M6 6l8 8" />
                                                        ) : (
                                                            <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
                                                        )}
                                                    </svg>
                                                </button>
                                            ) : null}
                                        </div>

                                        {hasChildren && opened && (
                                            <div className="mt-2 space-y-1 px-4">
                                                {m.children!.map((child, cidx) => (
                                                    <a
                                                        href={child.href ?? "#"}
                                                        key={child.key ?? `${key}-m-c-${cidx}`}
                                                        className="block rounded p-1"
                                                    >
                                                        {child.label}
                                                    </a>
                                                ))}
                                                {m.container && (
                                                    <div className="mt-2 px-1 text-sm">{m.container}</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}