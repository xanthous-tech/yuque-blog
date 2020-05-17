import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

import { YuqueApi, Doc } from '../utils/yuque-api';

interface HomePageProps {
  docs: Doc[];
}

const Container = styled.div`
  font-size: 20px;
`;

const HomePage: FC<HomePageProps> = ({ docs }: HomePageProps) => (
  <Container>
    <ul>
      {docs.map((doc) => (
        <li>
          <Link href={`/posts/${doc.slug}`}>
            <a>{doc.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Container>
);

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (): Promise<{ props: HomePageProps }> => {
  const api = new YuqueApi(process.env.yuqueToken);

  const { data: currentUser } = await api.getUser();
  const { data: repos } = await api.getRepos(currentUser.login);
  const [blogRepo] = repos.filter((repo) => repo.slug === 'blog');
  const { data: docs } = await api.getDocs(blogRepo.namespace);

  return {
    props: {
      docs: docs.filter((doc) => doc.status === 1),
    },
  };
};
