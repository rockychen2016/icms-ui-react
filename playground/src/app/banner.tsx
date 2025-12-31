import ICMSBannerCarousel from "@/components/icms-banner-carousel";

export default function Banner() {
    return (
        <ICMSBannerCarousel items={[
            <div className='w-full h-full bg-slate-300 flex flex-col rounded-sm p-8'>
                <h1>关于</h1>
                <p className='text-sm'>好的很好!</p>
            </div>,
            <div className='w-full h-full bg-emerald-300 flex flex-col rounded-sm p-8'>
                <h1>关于</h1>
                <p className='text-sm'>好的很好!</p>
            </div>,
            <div className='w-full h-full bg-red-500 flex flex-col rounded-sm p-8'>
                <h1>关于</h1>
                <p className='text-sm'>好的很好!</p>
            </div>,
        ]} />
    );
}