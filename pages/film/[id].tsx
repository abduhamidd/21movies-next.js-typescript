/* eslint-disable @next/next/no-img-element */
import {Layout} from '../../components/Layout';
import {ID, IFilm} from './../../interfaces/index.d';
import {Meta} from './../../components/Meta/index';
import {Card} from './../../components/Card/Card';
import {GetStaticPropsContext, GetStaticProps, GetStaticPaths} from 'next';
import {ApolloClient} from '@apollo/client';
import {InMemoryCache} from '@apollo/client';
import {gql} from '@apollo/client';
import {ALL_FILM_FIELDS, ALL_TIME_FIELDS} from './../../graphql/fragments';
import router, {useRouter} from 'next/router';

interface FilmProps {
  film: IFilm;
}
const FilmPage = ({film}: FilmProps) => {
  const router = useRouter();
  const id = router.query.id;
  console.log(id);

  const filmImage1 = film.producer.imgs && film.producer.imgs[0];
  const filmImage2 = film.producer.imgs && film.producer.imgs[1];
  return (
    <>
      <Layout>
        <Meta
          titleShort={`21MOVIES | ${film.title}`}
          titleLong={`21MOVIES | ${film.title}`}
          description={`${film.title}. Read about ${film.title} ${film.year} ${film.countries[0]} ${film.producedBy}. 21MOVIES. Film about ${film.briefAbout} `}
          keywords={`${film.title}, ${film.year} History, ${film.countries[0]} Cinema, LIGHTFILMS, ${film.producedBy}`}
        />
        <div id="grid-wrap">
          <section className="left">
            <header id="text__header">
              <h1 className="h2-fk">{film.title}</h1>
              <h4>
                Genres :{' '}
                <i>
                  {' '}
                  {film.genres[0]}
                  {`${
                    film.genres[1] !== undefined ? `,${film.genres[1]}.` : '.'
                  }`}
                </i>
                Countries :
                <i>
                  {' '}
                  {film.countries[0]}
                  {`${
                    film.countries[1] !== undefined
                      ? `,${film.countries[1]}.`
                      : '.'
                  }`}
                </i>
                Director: <i>{film.producedBy}</i>
              </h4>
              <p>{film.briefAbout}</p>
            </header>
            <img
              id="collage"
              src={film.collage}
              alt={`Film ${film.title} image `}
            />
            <div className="about">
              <h5>What about?</h5>
              <p>{film.about.paragraphs[0]}</p>
              <img src={film.coverIMG} alt={`Film ${film.title} image`} />
              {film.about.paragraphs
                .filter((empty, index) => {
                  return index > 0;
                })
                .map((paragraph, index) => {
                  return <p key={index}>{paragraph}</p>;
                })}
            </div>
          </section>
          <section id="right">
            <header className="prod">
              <h5 className="producerName">Producer</h5>
              <Card
                type="double"
                HREF="/person/[id]"
                AS={`/person/${film.producer.id}`}
                ALT={`Producer | Director ${film.producer.h3} ${film.producer.h6bot} ${film.producer.h6top}`}
                img={filmImage1}
                img2={filmImage2}
                h6bot={film.producer.h6bot}
                h3={film.producer.h3}
                h6top={film.producer.h6top}
              />
            </header>
            <section id="acters-grid">
              <h5>MAIN ACTERS</h5>
              <div id="acters">
                {film.acters.map((acter) => {
                  const img1 = acter.imgs && acter.imgs[0];
                  const img2 = acter.imgs && acter.imgs[1];
                  return (
                    <Card
                      AS={`/person/${acter.id}`}
                      key={acter.id}
                      HREF="/person/[id]"
                      type="double"
                      img={img1}
                      img2={img2}
                      h6bot={acter.h6bot}
                      h6top={acter.h6top}
                      h3={acter.h3}
                    />
                  );
                })}
              </div>
            </section>
          </section>
        </div>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps<FilmProps> = async (
  ctx: GetStaticPropsContext
) => {
  try {
    const client = new ApolloClient({
      uri: process.env.API_URL,
      cache: new InMemoryCache(),
    });
    const data = await client.query({
      query: gql`
          query getFilm{
              getFilm(id:${ctx.params?.id}){
                ...FilmFragment
              }
          }
          ${ALL_FILM_FIELDS.fragment}

          `,
    });
    console.log(data);

    return {
      props: {
        film: data.data.getFilm,
      },
    };
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  try {
    const client = new ApolloClient({
      uri: process.env.API_URL,
      cache: new InMemoryCache(),
    });
    const data = await client.query({
      query: gql`
        query getAllFilms {
          getAllFilms {
            id
          }
        }
      `,
    });
    const paths = await data.data.getAllFilms.map(({id}: any) => {
      return {params: {id: id}};
    });
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};
export default FilmPage;
