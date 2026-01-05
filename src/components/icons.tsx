import React, { SVGProps } from "react";
const defaultSize = 20;

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};
export const IconLang: React.FC<IconSvgProps> = ({
    size = defaultSize,
    width,
    height,
    ...props
}) => {
    return (
        <svg
            fill="none"
            className="outline-none"
            height={size || height}
            viewBox="0 0 32 32"
            width={size || width}
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
            />
        </svg>
    );
}