import styled from 'styled-components';

const Container = styled.main`
  a {
    color: #007dfa;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  p {
    color: #394548;
    margin: 16px 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 0;
    line-height: 1.15;
  }

  h1 + p,
  h2 + p,
  h3 + p,
  h4 + p,
  h5 + p,
  h6 + p {
    margin-top: 5px;
  }
`;

export default Container;
