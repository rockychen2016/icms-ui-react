import { useEffect, useState } from "react";
import { AiFillMoon, AiFillSun } from "react-icons/ai";
import { Size } from "../common";

export type ThemeStyle = 'dark' | 'light';
export type ICMSThemeSwitchProps = {
    size?: Size,
    defaultTheme?: ThemeStyle
}

const sessionKey = '_icms_theme_style_key';
const sizeMap = {
    "sm": 32,
    "md": 34,
    "lg": 36
}

const setStyle = (theme: ThemeStyle) => {
    const removeStyle = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.remove(removeStyle);
    document.documentElement.classList.add(theme)
    document.documentElement.style.setProperty('color-scheme', theme)
    sessionStorage.setItem(sessionKey, theme);
}

const toggle = () => {
    if (document.documentElement.classList.contains('light')) {
        setStyle('dark')
    } else {
        setStyle('light')
    }
}


export default function ICMSThemeSwitch({
    size = 'md',
    defaultTheme = 'dark'
}: Readonly<ICMSThemeSwitchProps>) {
    const [value, setValue] = useState<ThemeStyle>(defaultTheme)

    useEffect(() => {
        const style = sessionStorage.getItem(sessionKey);
        const sessionTheme: ThemeStyle = style ? (style as ThemeStyle) : defaultTheme;
        setStyle(sessionTheme);
        if (sessionTheme != value) {
            setValue(sessionTheme);
        }
    }, [defaultTheme])

    return (
        <div className="flex justify-center items-center cursor-pointer active:opacity-50" onClick={() => {
            toggle();
            setValue(sessionStorage.getItem(sessionKey) as ThemeStyle)
        }}>
            {
                value === 'dark' ? <AiFillMoon size={sizeMap[size]} className="opacity-50" /> : <AiFillSun size={sizeMap[size]} className="opacity-50" />
            }
        </div>
    );
}
