import {IMetaInterface} from './Meta.interface';
import Head from 'next/head';
export const Meta = ({
  titleShort,
  titleLong,
  description,
  url,
  keywords,
}: IMetaInterface): JSX.Element => {
  return (
    <Head>
      <title>{titleShort}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={titleLong} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
    </Head>
  );
};
