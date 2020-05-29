# 语雀NextJS博客

这个博客生成器利用了 [语雀API](https://www.yuque.com/yuque/developer/api) 和 [NextJS的SSG功能](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) 搭建，搭建部署之后不需要额外进行更新，只需要在语雀发布文章即可更新。

博客的样式参考了 [etch主题](https://github.com/LukasJoswiak/etch) 。如果需要进行修改，可以fork之后使用 `styled-components` 自行替换对应的组件。

# Demo

https://yuque-blog.now.sh

# 语雀的准备工作

- 生成一个 [语雀API Token](https://www.yuque.com/yuque/developer/api#785a3731) 
- 创建一个知识库，并把路径设置成 `blog`。项目只拉路径为 `blog` 的知识库下面的全部已发布的文章

# 本地开发

首先复制 `.env.example` 到 `.env` 并把语雀的API Token填到 `YUQUE_TOKEN` 环境变量

项目使用标准的NextJS开发流程。请查阅 [package.json](./package.json) 查看对应的 `scripts` 部分。

# 部署

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/xanthous-tech/yuque-blog/tree/master)

推荐使用 [Vercel](https://vercel.com) （原Zeit NOW）进行部署。也可以选用 [腾讯云](https://github.com/serverless-components/tencent-nextjs) 或者 [阿里云](https://developer.aliyun.com/article/703315) 部署。

部署时候需要根据云平台把语雀的API Token写到 `YUQUE_TOKEN` 的环境变量里。

# 通过Webhook部署更新内容

如果使用Vercel，或者其他支持Deploy Hook的云平台，推荐把 [博客知识库的Webhook](https://www.yuque.com/yuque/developer/doc-webhook) 配置成Deploy Hook。这样文章发布的时候可以自动部署。

[以Vercel为例](https://vercel.com/docs/v2/more/deploy-hooks)

# 开源证书

[MIT](./LICENSE)
