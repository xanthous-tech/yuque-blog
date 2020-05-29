import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';
import moment from 'moment-timezone';

import Container from '../components/Container';
import SiteHeader from '../components/SiteHeader';
import Footer from '../components/Footer';

import { YuqueApi, Repo, Doc } from '../utils/yuque-api';

interface HomePageProps {
  repo: Repo;
  docs: Doc[];
}

const HomePageContainer = styled(Container)`
  h3 {
    font-size: 19px;
    font-size: 1.9rem;
  }

  ul#posts {
    list-style-type: none;
    font-size: 16px;
    font-size: 1.6rem;
    margin-top: 0;
    padding: 0;
  }

  ul#posts li {
    margin: 5px 0;
    padding: 0;
  }

  ul#posts small {
    font-size: 0.8em;
    color: #767676;
    margin-left: 10px;
  }

  ul#posts li a {
    text-decoration: none;
  }

  ul#posts li a:hover {
    color: #369aff;
  }

  ul#posts li a:hover small {
    color: inherit;
  }

  @media (min-width: 770px) {
    h3 {
      font-size: 20px;
      font-size: 2rem;
    }

    ul#posts {
      font-size: 18px;
      font-size: 1.8rem;
    }
  }
`;

const HomePage: FC<HomePageProps> = ({ repo, docs }: HomePageProps) => (
  <>
    <Head>
      <title>{repo.name}</title>
    </Head>
    <SiteHeader siteTitle={repo.name} />
    <HomePageContainer>
      <h3>博客列表</h3>
      <ul id="posts">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link href={`/posts/${doc.slug}`}>
              <a>
                {doc.title}
                <small>
                  <time>{moment(doc.created_at).tz(moment.tz.guess()).format('LL')}</time>
                </small>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </HomePageContainer>
    <Footer />
  </>
);

export default HomePage;

export const getStaticProps: GetStaticProps = async (): Promise<{ props: HomePageProps }> => {
  const api = new YuqueApi(process.env.yuqueToken);

  const { data: currentUser } = await api.getUser();
  const { data: repos } = await api.getRepos(currentUser.login);
  const [blogRepo] = repos.filter((repo) => repo.slug === 'blog');
  const { data: docs } = await api.getDocs(blogRepo.namespace);

  return {
    props: {
      repo: blogRepo,
      docs: docs.filter((doc) => doc.status === 1),
    },
  };
};
