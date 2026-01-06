export const radiusMap = {
    "none": "",
    "sm": " rounded-sm",
    "md": " rounded-md",
    "lg": " rounded-lg",
    "full": "rounded-full"
}

export const heightMap = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
};

export const shapSizeMap = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
};

export const thumbSizeMap = {
    sm:'w-14 h-14',
    md:'w-16 h-16',
    lg:'w-20 h-20',
}

export const textSizeMap = {
    "sm": "text-sm",
    "md": "text-base",
    "lg": "text-xl"
}

export const bgColorMap ={
    "primary":"bg-primary",
    "secondary":"bg-secondary",
    "success":"bg-success",
    "warning":"bg-warning",
    "danger":"bg-danger",
    "default":"bg-default",
}

export type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default'
export type Size = 'sm' | 'md' | 'lg';
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full'
