import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import styled from 'styled-components';

import { YuqueApi, Doc } from '../../utils/yuque-api';

const CDN_ROOT = 'https://cdn.nlark.com';

interface PostPageProps {
  doc: Doc;
}

const Container = styled.div`
  font-size: 20px;
`;

const PostPage: FC<PostPageProps> = ({ doc }: PostPageProps) => (
  <Container dangerouslySetInnerHTML={{ __html: doc.body_html.replace(CDN_ROOT, '/api/img') }} />
);

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const api = new YuqueApi(process.env.yuqueToken);

  const { data: currentUser } = await api.getUser();
  const { data: repos } = await api.getRepos(currentUser.login);
  const [blogRepo] = repos.filter((repo) => repo.slug === 'blog');
  const { data: docs } = await api.getDocs(blogRepo.namespace);

  const paths: Array<{ params: { [key: string]: string | string[] } }> = docs
    .filter((doc) => doc.status === 1)
    .map((doc) => ({ params: { namespace: blogRepo.namespace, slug: doc.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { namespace, slug } }): Promise<{ props: PostPageProps }> => {
  const api = new YuqueApi(process.env.yuqueToken);

  let _namespace = namespace as string;

  if (!_namespace) {
    const { data: currentUser } = await api.getUser();
    const { data: repos } = await api.getRepos(currentUser.login);
    const [blogRepo] = repos.filter((repo) => repo.slug === 'blog');

    _namespace = blogRepo.namespace;
  }

  const { data: doc } = await api.getDoc(_namespace, slug as string);
  console.log(doc);

  return {
    props: {
      doc,
    },
  };
};
