'use client'
import ICMSListBox from "@/components/icms-list-box";


export default function ListBox() {
    return (
        <div className=''>
            <ICMSListBox
                onItemClick={(item) => console.log(item.title)}
                items={[
                    {
                        id: 'a1',
                        title: 'list box1',
                        description: '好的，好的',
                        startContent: <>AVATAR</>,
                        endContent: <>xxx</>,
                        href: 'http://www.baidu.com',
                        disabled: true
                    },
                    {
                        id: 'a2',
                        title: 'list box1',
                        disabled: true,
                    },
                    {
                        id: 'a3',
                        title: 'list box1',
                        startContent: <>AVATAR</>,
                    },
                ]}
            />
        </div>
    );
}