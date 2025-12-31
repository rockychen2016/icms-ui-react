import ICMSPageFooter from '@/components/icms-page-footer'
export default function PageFooter() {
    return (
        <ICMSPageFooter
            className='text-sm'
            comapnyName='深圳市十朵信息科技有限公司'
            icpNumber='粤ICP备19077724号-5'
            startContent={
                <div>LOGO</div>
            }
            endContent={
                <div>联系信息</div>
            }
            nav={[
                {
                    title: '产品中心',
                    items: [{
                        label: 'A1',
                    }, {
                        label: '12'
                    }]
                },
                {
                    title: '帮助中心',
                    items: [{
                        label: 'A1',
                    }, {
                        label: '12'
                    }]
                },
            ]}
        >111</ICMSPageFooter>
    );
}