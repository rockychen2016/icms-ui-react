import { useEffect, useState } from "react";
import { AiFillMoon, AiFillSun } from "react-icons/ai";

export type ThemeStyle = 'dark' | 'light';
export type ICMSThemeSwitchProps = {
    defaultTheme?: ThemeStyle
}

const sessionKey = '_icms_theme_style_key';

const toggle = (theme?: ThemeStyle) => {
    if (document.documentElement.classList.contains('light') || theme === 'dark') {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark')
        document.documentElement.style.setProperty('color-scheme', 'dark')
        sessionStorage.setItem(sessionKey, 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light')
        document.documentElement.style.setProperty('color-scheme', 'light')
        sessionStorage.setItem(sessionKey, 'light');
    }
}

export default function ICMSThemeSwitch({
    defaultTheme = 'dark'
}: Readonly<ICMSThemeSwitchProps>) {
    const [value, setValue] = useState<ThemeStyle>(defaultTheme)
    useEffect(() => {
        const style = sessionStorage.getItem(sessionKey);
        const sessionTheme: ThemeStyle = style ? (style as ThemeStyle) : defaultTheme;
        toggle(sessionTheme);
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
                value === 'dark' ? <AiFillSun size={32} className="opacity-50" /> : <AiFillMoon size={32} className="opacity-50" />
            }
        </div>
    );
}
