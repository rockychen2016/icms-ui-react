'use client'
import React from 'react';

export type ListItem = {
  id?: string | number;
  title: string;
  description?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  href?: string,
  className?: string;
  notAllowClick?: boolean,
  disabled?: boolean
};

export type ICMSListBoxProps = {
  items: ListItem[];
  header?: React.ReactNode,
  className?: string;
  onItemClick?: (item: ListItem) => void;
};

export default function ICMSListBox({ items, className, onItemClick }: Readonly<ICMSListBoxProps>) {
  return (
    <div
      className={`w-full h-full overflow-y-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 ${className ?? ''}`}
      role="listbox"
    >

      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {items.map((it) => {
          const key = it.id ?? String(it.title ?? Math.random());
          const href = it.href ?? ''
          const clickable = typeof onItemClick === 'function';
          if (href.length > 0) {
            if (it.disabled) {
              return (
                <li key={key} className="m-0">
                  <button
                    title={it.title}
                    className={`flex items-center gap-3 p-3 w-full text-left cursor-pointer opacity-50`}
                  >
                    {
                      it.startContent ? <div className="flex-shrink-0">{it.startContent}</div> : null
                    }
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{it.title}</div>
                      {it.description ? (
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{it.description}</div>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {it.endContent}
                      <svg className="w-4 h-4 text-gray-400 dark:text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                </li>
              );
            }
            return (
              <li key={key} className="m-0">
                <a
                  href={href}
                  title={it.title}
                  className={`flex items-center gap-3 p-3 w-full text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 ${it.className ?? ''}`}
                >
                  {
                    it.startContent ? <div className="flex-shrink-0">{it.startContent}</div> : null
                  }
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{it.title}</div>
                    {it.description ? (
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{it.description}</div>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {it.endContent}
                    <svg className="w-4 h-4 text-gray-400 dark:text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              </li>
            );
          }
          if (clickable && !it.notAllowClick) {
            if (it.disabled) {
              return (
                <li key={key} className="m-0">
                  <button
                    type="button"
                    className={`flex items-center gap-3 p-3 w-full text-left cursor-pointer opacity-50`}
                  >
                    {
                      it.startContent ? <div className="flex-shrink-0">{it.startContent}</div> : null
                    }
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{it.title}</div>
                      {it.description ? (
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{it.description}</div>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {it.endContent}
                      <svg className="w-4 h-4 text-gray-400 dark:text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                </li>
              );
            }
            return (
              <li key={key} className="m-0">
                <button
                  type="button"
                  onClick={() => onItemClick(it)}
                  className={`flex items-center gap-3 p-3 w-full text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700'} ${it.className ?? ''}`}
                >
                  {
                    it.startContent ? <div className="flex-shrink-0">{it.startContent}</div> : null
                  }
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{it.title}</div>
                    {it.description ? (
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{it.description}</div>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {it.endContent}
                    <svg className="w-4 h-4 text-gray-400 dark:text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              </li>
            );
          }

          return (
            <li key={key} className="m-0">
              <div className={`flex items-center gap-3 p-3 w-full text-left ${it.className ?? ''}`} role="option" aria-selected="false">
                <div className="flex-shrink-0">{it.startContent}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{it.title}</div>
                  {it.description ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">{it.description}</div>
                  ) : null}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">{it.endContent}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
