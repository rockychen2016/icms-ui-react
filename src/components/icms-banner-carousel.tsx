'use client'
import React, { useEffect, useRef, useState } from 'react'
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc' // Import VscChevronLeft

export type ICMSBannerCarouselProps = {
	width?: string | number
	height?: string | number
	items?: React.ReactNode[]
	autoPlay?: boolean
	interval?: number
	loop?: boolean
	showDots?: boolean
	showArrows?: boolean,
	arrowsSize?: number,
	className?: string
	style?: React.CSSProperties
}

export default function ICMSBannerCarousel({
	width = '100%',
	height = 300,
	items,
	autoPlay = true,
	interval = 3000,
	loop = true,
	showDots = true,
	showArrows = true,
	arrowsSize = 16,
	className,
	style
}: ICMSBannerCarouselProps) {
	const childrenArray = React.Children.toArray((items as any) ?? [])
	const [current, setCurrent] = useState(0)
	const count = childrenArray.length
	const timerRef = useRef<number | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!autoPlay || count <= 1) return
		timerRef.current = window.setInterval(() => {
			setCurrent(prev => {
				const next = prev + 1
				if (next >= count) return loop ? 0 : prev
				return next
			})
		}, interval)
		return () => {
			if (timerRef.current) window.clearInterval(timerRef.current)
		}
	}, [autoPlay, interval, count, loop])

	function goTo(index: number) {
		if (index < 0) index = 0
		if (index >= count) index = count - 1
		setCurrent(index)
	}

	function next() {
		if (count === 0) return
		const nextIndex = current + 1
		if (nextIndex >= count) {
			if (loop) setCurrent(0)
		} else {
			setCurrent(nextIndex)
		}
	}

	function prev() {
		if (count === 0) return
		const prevIndex = current - 1
		if (prevIndex < 0) {
			if (loop) setCurrent(count - 1)
		} else {
			setCurrent(prevIndex)
		}
	}

	return (
		<div
			ref={containerRef}
			className={`min-h-[300px] lg:min-h-[500px] ${className}`}
			style={{ width, height, position: 'relative', overflow: 'hidden', ...style }}
			onMouseEnter={() => {
				if (timerRef.current) {
					window.clearInterval(timerRef.current)
					timerRef.current = null
				}
			}}
			onMouseLeave={() => {
				if (autoPlay && count > 1 && !timerRef.current) {
					timerRef.current = window.setInterval(() => {
						setCurrent(prev => {
							const next = prev + 1
							if (next >= count) return loop ? 0 : prev
							return next
						})
					}, interval)
				}
			}}
		>
			<div
				style={{
					display: 'flex',
					width: `${count * 100}%`,
					height: '100%',
					transform: `translateX(-${(current * 100) / Math.max(1, count)}%)`,
					transition: 'transform 400ms ease'
				}}
			>
				{childrenArray.map((child, index) => (
					<div key={index} style={{ width: `${100 / Math.max(1, count)}%`, flexShrink: 0, height: '100%' }}>
						<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							{child}
						</div>
					</div>
				))}
			</div>

			{showArrows && count > 1 && (
				<>
					<button
						aria-label="previous"
						onClick={prev}
						style={{
							position: 'absolute',
							left: 8,
							top: '50%',
							transform: 'translateY(-50%)',
							background: 'rgba(0,0,0,0)',
							color: '#fff',
							border: 'none',
							padding: '6px 8px',
							borderRadius: 4,
							cursor: 'pointer'
						}}
					>
						<VscChevronLeft size={arrowsSize} />
					</button>
					<button
						aria-label="next"
						onClick={next}
						style={{
							position: 'absolute',
							right: 8,
							top: '50%',
							transform: 'translateY(-50%)',
							background: 'rgba(0,0,0,0)',
							color: '#fff',
							border: 'none',
							padding: '6px 8px',
							borderRadius: 4,
							cursor: 'pointer'
						}}
					>
						<VscChevronRight size={arrowsSize} />
					</button>
				</>
			)}

			{showDots && count > 1 && (
				<div style={{ position: 'absolute', left: 0, right: 0, bottom: 8, display: 'flex', justifyContent: 'center', gap: 8 }}>
					{childrenArray.map((_, index) => (
						<button
							key={index}
							aria-label={`go-to-${index}`}
							onClick={() => goTo(index)}
							style={{
								width: 10,
								height: 10,
								borderRadius: '50%',
								border: 'none',
								background: index === current ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.35)',
								cursor: 'pointer'
							}}
						/>
					))}
				</div>
			)}
		</div>
	)
}

