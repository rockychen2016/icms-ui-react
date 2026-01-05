'use client'
import ICMSNavbar from '@/components/icms-navbar'
import ICMSSearch from '@/components/icms-search'
import ICMSUser from '@/components/icms-user';
import ICMSI18NSelect from '@/components/icms-i18n-select';

export default function Nav() {
    return (
        <ICMSNavbar
            className='px-4 py-2'
            startContent={<>LOGO</>}
            endContent={
                <div className='flex items-center gap-2 max-sm:flex-col'>
                    <ICMSUser shape='circle' name='ROCK' description='rocky@iboot.xin' />
                    <ICMSSearch isClean onSearch={(v) => console.log(v)} />
                    <ICMSI18NSelect radius='full' data={[
                        {
                            "id": 'zh-CN',
                            "name": '简体中文'
                        }, {
                            "id": 'en',
                            "name": "English"
                        }
                    ]}
                        locale='zh-CN'
                        onValueChange={(v) => console.log(v)}
                    />
                </div>
            }
            position='left'
            menus={[
                {
                    label: '首页',
                    href: '/',
                }, {
                    label: '新闻中心',
                }, {
                    label: '产品中心',
                    container: <div>111111</div>,
                    children: [{
                        label: '产品1',
                    }, {
                        label: '产品2',
                    }]
                }, {
                    label: '关于我们',
                    href: '/aboutus',
                    children: [{
                        label: '公司简介'
                    }, {
                        label: '联系方式'
                    }]
                }
            ]}
        />
    );
}