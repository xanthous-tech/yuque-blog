import fetch from 'node-fetch';

const CDN_ROOT = 'https://cdn.nlark.com';

export default async (req, res) => {
  const {
    query: { slug },
  } = req;

  const response = await fetch(`${CDN_ROOT}/${slug.join('/')}`);
  const buffer = await response.buffer();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/png');
  res.end(buffer);
};
