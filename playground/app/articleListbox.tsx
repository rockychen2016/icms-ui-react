'use client'
import ICMSArticleList from "~/components/icms-article-list-box";

export default function ArticleListBox() {
    return (
        <div className="px-3 mt-6">
            <ICMSArticleList
                onItemClick={(item) => console.log(item.title)}
                items={[
                    {
                        id: 'a1',
                        title: '示例首条大图文章',
                        description: '这是首条文章的摘要，展示为大图背景并在底部显示标题。',
                        imageUrl: 'https://picsum.photos/1200/600?random=1',
                        date: new Date(),
                        link: {
                            href: 'http://www.baidu.com',
                            target: '_blank'
                        }
                    },
                    {
                        id: 'a2',
                        title: '第二条文章',
                        description: '这是一段简短说明，用于在列表中展示文章摘要，长度会被截断到100字以内。',
                        imageUrl: 'https://picsum.photos/200/120?random=2',
                        date: new Date(Date.now() - 1000 * 60 * 60 * 5),
                        link: {
                            href: 'https://www.iboot.fun',
                            target: '_blank'
                        }
                    },
                    {
                        id: 'a3',
                        title: '前天的文章',
                        description: '前天发布的文章示例。',
                        imageUrl: 'https://picsum.photos/200/120?random=3',
                        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
                    },
                    {
                        id: 'a4',
                        title: '去年文章示例',
                        description: '跨年的文章，展示完整日期格式。',
                        imageUrl: 'https://picsum.photos/200/120?random=4',
                        date: new Date('2023-07-20T10:30:00'),
                    },
                ]}
            />
        </div>
    );
}