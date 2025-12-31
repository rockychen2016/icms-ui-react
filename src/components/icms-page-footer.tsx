"use client"
import React from "react";

export type FooterNavItem = {
	key?: string;
	label: React.ReactNode;
	href?: string;
};

export type FooterColumn = {
	key?: string;
	title?: React.ReactNode;
	items?: FooterNavItem[];
};

export type ICMSPageFooterProps = {
    comapnyName:string,
    icpNumber?:string,
	startContent?: React.ReactNode;
	endContent?: React.ReactNode;
	nav?: FooterColumn[]; // 中间导航列
	className?: string; // root 自定义类名
	navClassName?: string; // 导航区域自定义类名
	itemClassName?: string; // 每个链接自定义类名
    children?:React.ReactNode
};

export default function ICMSPageFooter({
    comapnyName,
    icpNumber,
	startContent = null,
	endContent = null,
	nav = [],
	className = "",
	navClassName = "",
	itemClassName = "",
    children
}: ICMSPageFooterProps) {
	const cols = nav.length || 0;

	return (
		<footer
			role="contentinfo"
			className={
				`w-full ${className}`
			}
		>
			<div className="mx-auto px-6 sm:px-6 lg:px-8 py-8">
				<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
					<div className="flex-shrink-0">{startContent}</div>

					<nav
						aria-label="Footer navigation"
						className={`w-full ${navClassName}`}
					>
						<ul className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:flex md:flex-row md:items-start md:gap-8`}>
							{nav.map((col, idx) => (
								<li key={col.key ?? String(idx)} className="md:flex-none">
									{col.title && (
										<h4 className="mb-2 text-sm font-semibold">
											{col.title}
										</h4>
									)}
									{col.items && (
										<ul className="space-y-1">
											{col.items.map((it, i) => (
												<li key={it.key ?? `${idx}-i-${i}`}> 
													<a
														href={it.href ?? "#"}
														className={`block text-sm ${itemClassName}`}
													>
														{it.label}
													</a>
												</li>
											))}
										</ul>
									)}
								</li>
							))}
						</ul>
					</nav>

					<div className="flex-shrink-0">{endContent}</div>
				</div>
				<div className="pt-2 mt-4 border-t border-zinc-200 dark:border-zinc-800">
					<div className="flex flex-col md:flex-row md:justify-between gap-2">
						<div>© {new Date().getFullYear()} {comapnyName}. All rights reserved.</div>
						<div className="flex items-center gap-3">
                            {
                                icpNumber ?  <p className="text-xs">ICP:<a href="https://beian.miit.gov.cn/" target="_blank">{icpNumber}</a></p> : null
                            }
                        </div>
					</div>
                    <div className="pt-4 flex justify-start gap-1">{children}</div>
				</div>
			</div>
		</footer>
	);
}
