import React from 'react';

export type ICMSUserProps = {
  name: string;
  description?: React.ReactNode;
  avatarUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'circle';
  className?: string;
  onClick?: () => void;
};

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
};

export default function ICMSUser({ name, description, avatarUrl, size = 'md', shape = 'rounded', className, onClick }: ICMSUserProps) {
  const sizeCls = sizeMap[size] ?? sizeMap.md;
  const radiusCls = shape === 'circle' ? 'rounded-full' : 'rounded-md';

  const Container: any = onClick ? 'button' : 'div';
  
  return (
    <Container
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`flex items-center gap-3 ${className ?? ''} ${onClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md' : ''}`}
    >
      <div className={`${sizeCls} ${radiusCls} overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0`}>
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt={name} className={`w-full h-full object-cover ${radiusCls}`} />
        ) : (
          <svg className="w-3/4 h-3/4 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 21v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      <div className="min-w-0 flex-shrink-0">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{name}</div>
        {description ? <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{description}</div> : null}
      </div>
    </Container>
  );
}
