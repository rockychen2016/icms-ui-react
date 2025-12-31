import React from 'react'
import Banner from './banner'
import Nav from './nav'
import PageFooter from './page-footer'
import ICMSContentBlock from '@/components/icms-content-block';
import ICMSCard from '@/components/icms-card';
import ListBox from './listbox';
import ArticleListBox from './articleListbox';

export default function Page() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto' }}>
      
      <Nav />
      <Banner />
      <ICMSContentBlock className='bg-slate-100' title='产品中心'>
        <div className='flex flex-col md:flex-row md:justify-start gap-4'>
          <div className='flex-1'>1</div>
          <div className='flex-1'>2</div>
        </div>
      </ICMSContentBlock>
      <ICMSContentBlock className='bg-slate-200' title='经营理念' subTitle='xxxx'>
        <div className='flex flex-col md:flex-row md:justify-start gap-4'>
          <div className='flex-1'>1</div>
          <div className='flex-1'>2</div>
        </div>
      </ICMSContentBlock>
      <div className='flex items-stretch flex-nowrap gap-5'>
        <ICMSCard className='rounded-sm'
          header={
            <div className='flex items-center gap-2'>
              <div>1</div>
              <div>2</div>
            </div>
          }
          body={
            <div>1</div>
          }
        />
      </div>
      <ListBox />
      <ArticleListBox />
      <PageFooter />
    </main>
  )
}


