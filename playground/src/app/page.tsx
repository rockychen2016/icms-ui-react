import React from 'react'
import Banner from './banner'
import Nav from './nav'
import PageFooter from './page-footer'
import ICMSContentBlock from '@/components/icms-content-block';
import ICMSCard from '@/components/icms-card';
import ICMSCommentCard from '@/components/icms-comment-card'
import ICMSPicBox from '@/components/icms-pic-box';
import ListBox from './listbox';
import ArticleListBox from './articleListbox';


export default function Page() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto' }}>
      <Nav />
      <Banner />
      <ICMSContentBlock className='bg-slate-100' title='产品中心'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          <ICMSPicBox
            className='rounded-md'
            image={{
              imageUrl: '/image/product.jpg',
              imageAlt: '示例图片',
              imageOverlay: <span className='px-2 py-1 bg-red-500 text-white text-xs rounded'>新品</span>,
            }}
            title={<span>示例商品 A</span>}
            description={'这是一段示例描述，超过两行会自动裁剪并显示省略号。用来演示组件的文本截断效果。'}
            descriptionLines={2}
            footer={<div className='flex justify-end'><button className='px-3 py-1 bg-blue-600 text-white rounded'>购买</button></div>}
          />
          <ICMSPicBox
            className='rounded-md'
            image={{
              imageUrl: 'images/sample-2.jpg',
              imageAlt: '示例图片2',
              imageOverlay: <span className='px-2 py-1 bg-green-600 text-white text-xs rounded'>热卖</span>
            }}
            title={<span>示例商品 B</span>}
            description={'可选描述，如果没有则不显示 footer 同样可选。'}
            footer={<div className='flex justify-between'><span className='text-sm text-gray-500'>¥199</span><button className='px-3 py-1 bg-emerald-600 text-white rounded'>加入购物车</button></div>}
            link={{
              href: 'product/aaa'
            }}
          />
          <ICMSPicBox
            className='rounded-md'
            image={{
              imageUrl: 'images/sample-2.jpg',
              imageAlt: '示例图片2',
              imageOverlay: <span className='px-2 py-1 bg-green-600 text-white text-xs rounded'>热卖</span>
            }}
            title={<span>示例商品 B</span>}
            description={'可选描述，如果没有则不显示 footer 同样可选。'}
            footer={<div className='flex justify-between'><span className='text-sm text-gray-500'>¥199</span><button className='px-3 py-1 bg-emerald-600 text-white rounded'>加入购物车</button></div>}
            link={{
              href: 'product/aaa'
            }}
          />
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
      <div className='flex p-3 max-sm:flex-col items-center gap-5'>
        <ICMSCommentCard
          star={3}
          content='很好，不错'
          user={{
            name: 'rocky.chen',
            description: '26/01/01'
          }}
        />
        <ICMSCommentCard
          star={3}
          content='很好，不错'
          user={{
            name: 'rocky.chen',
            description: '26/01/01'
          }}
        />
      </div>
      <PageFooter />
    </main>
  )
}


