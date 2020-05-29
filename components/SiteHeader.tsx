import React, { FC } from 'react';
import Link from 'next/link';

import styled from 'styled-components';

interface SiteHeaderProps {
  siteTitle: string;
}

const StyledHeader = styled.header`
  margin: 25px 0;

  a {
    color: #313a3d;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  h2 {
    display: inline;
    font-size: 21px;
    font-size: 2.1rem;
    margin: 0 8px 0 0;
  }

  nav {
    display: inline-block;
  }

  nav ul {
    list-style-type: none;
    font-size: 1.05em;
    text-transform: lowercase;
    margin: 0;
    padding: 0;
  }

  nav ul li {
    display: inline;
    margin: 0 3px;
  }

  nav ul li a {
    color: #454545;
  }

  @media (min-width: 770px) {
    h2 {
      font-size: 25px;
      font-size: 2.5rem;
    }
  }
`;

const Header: FC<SiteHeaderProps> = ({ siteTitle }: SiteHeaderProps) => (
  <StyledHeader>
    <h2>
      <Link href="/">
        <a>{siteTitle}</a>
      </Link>
    </h2>
    <nav>
      <ul>
        <li key="posts">
          <Link href="/">
            <a>博客列表</a>
          </Link>
        </li>
      </ul>
    </nav>
  </StyledHeader>
);

export default Header;
