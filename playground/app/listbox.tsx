'use client'
import ICMSListBox from "~/components/icms-list-box";


export default function ListBox() {
    return (
        <div className=''>
            <ICMSListBox
                onItemClick={(item) => console.log(item.title)}
                items={[
                    {
                        id: 'a1',
                        title: 'ROCK.CHEN',
                        description: '好的，好的',
                        startContent: <div className="w-10 h-10 rounded-full overflow-hidden"><img src="https://picsum.photos/200/300?random=1" className="object-cover" /></div>,
                        endContent: 2,
                        href: 'http://www.baidu.com',
                        disabled: true
                    },
                    {
                        id: 'a2',
                        title: 'Jacky',
                        disabled: true,
                        startContent:<div className="w-10 h-10 rounded-full overflow-hidden"><img src="https://picsum.photos/200/300?random=1" className="object-cover" /></div>,
                    },
                    {
                        id: 'a3',
                        title: 'Sunny',
                        startContent: <div className="w-10 h-10 rounded-full overflow-hidden"><img src="https://picsum.photos/200/300?random=1" className="object-cover" /></div>,
                    },
                ]}
            />
        </div>
    );
}