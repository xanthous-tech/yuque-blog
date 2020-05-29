import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import moment from 'moment-timezone';
import sanitizeHtml from 'sanitize-html';

import Container from '../../components/Container';
import SiteHeader from '../../components/SiteHeader';
import Footer from '../../components/Footer';

import { YuqueApi, Repo, Doc } from '../../utils/yuque-api';

const CDN_ROOT = 'https://cdn.nlark.com';

interface PostPageProps {
  repo: Repo;
  doc: Doc;
}

interface PostHeaderProps {
  title: string;
  date?: string;
}

const PostContainer = styled(Container)`
  img {
    max-width: 100%;
    margin: 0 auto;
  }

  code,
  pre {
    font-family: 'Menlo', monospace;
  }

  code {
    font-size: 0.96em;
    padding: 0 5px;
  }

  pre {
    display: block;
    overflow-x: auto;
    font-size: 14px;
    font-size: 1.4rem;
    white-space: pre;
    margin: 20px 0;
    padding: 1.5rem 1.5rem;
    line-height: 1.4;
  }

  pre code {
    padding: 0;
  }

  @media (min-width: 770px) {
    img {
      max-width: 108%;
      margin-left: -4%;
    }

    pre {
      width: 108%;
      margin-left: -4%;
      padding: 1.5rem 2.2rem;
    }
  }
`;

const StyledHeader = styled.header`
  h1 {
    display: block;
    font-size: 23px;
    font-size: 2.3rem;
    line-height: 1.15;
  }

  time {
    display: block;
    font-size: 0.85em;
    color: #767676;
  }

  @media (min-width: 770px) {
    h1 {
      font-size: 26px;
      font-size: 2.6rem;
    }
  }
`;

const PostHeader: FC<PostHeaderProps> = ({ title, date }: PostHeaderProps) => (
  <StyledHeader>
    <h1>{title}</h1>
    {!date ? null : <time>{moment(date).tz(moment.tz.guess()).format('LL')}</time>}
  </StyledHeader>
);

const PostPage: FC<PostPageProps> = ({ repo, doc }: PostPageProps) => {
  let __html = doc.body_html.replace(CDN_ROOT, '/api/img');
  __html = sanitizeHtml(__html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  });
  return (
    <>
      <Head>
        <title>{`${doc.title} - ${repo.name}`}</title>
      </Head>
      <SiteHeader siteTitle={repo.name} />
      <PostContainer>
        <PostHeader title={doc.title} date={doc.created_at} />
        <div dangerouslySetInnerHTML={{ __html }} />
      </PostContainer>
      <Footer />
    </>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const api = new YuqueApi(process.env.yuqueToken);

  const { data: currentUser } = await api.getUser();
  const { data: repos } = await api.getRepos(currentUser.login);
  const [blogRepo] = repos.filter((repo) => repo.slug === 'blog');
  const { data: docs } = await api.getDocs(blogRepo.namespace);

  const paths: Array<{ params: { [key: string]: string | string[] } }> = docs
    .filter((doc) => doc.status === 1)
    .map((doc) => ({ params: { slug: doc.slug } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }): Promise<{ props: PostPageProps }> => {
  const api = new YuqueApi(process.env.yuqueToken);

  const { data: currentUser } = await api.getUser();
  const { data: repos } = await api.getRepos(currentUser.login);
  const [blogRepo] = repos.filter((repo) => repo.slug === 'blog');

  const { namespace } = blogRepo;

  const { data: doc } = await api.getDoc(namespace, slug as string);
  console.log(doc);

  return {
    props: {
      repo: blogRepo,
      doc,
    },
  };
};
