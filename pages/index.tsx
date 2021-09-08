import {IFilmCard} from '../interfaces';
import {useState} from 'react';
import {Layout} from './../components/Layout/index';
import {Meta} from '../components/Meta';
import {Chooser} from './../components/Choser/Choser';
import {GetStaticProps, GetStaticPropsContext} from 'next';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {GET_ALL_FILMS} from './../graphql/queries';
import {Grid} from '../components/Grid';
import {Card} from './../components/Card/Card';
import {__filterFilms} from './../utils/__filter';

const IndexPage = ({films}: IndexProps) => {
  const [genre, setGenre] = useState('all');
  const [year, setYear] = useState('all');
  const result = __filterFilms([genre, year], films);
  return (
    <>
      <Layout>
        <Meta
          titleShort="21MOVIES"
          titleLong="21MOVIES - Learn more about great movies & persons"
          description="21MOVIES is a website for fans of old and high-quality movies. Here you will find the best movies of the past time. There is a collection of more than 30 films from popular to avant-garde."
          keywords="21MOVIES, Movies in black and white, Retro movies, Classics of cinematograph, cinematography, black and white movies, Full-length cinema, Fiction cinema, History cinema, LIGHT FILMS, Light Films"
        />

        <Chooser h1="CINEMA">
          <ul id="countrys">
            <li
              onClick={() => {
                setGenre('all');
              }}
              className={genre === 'all' ? 'sq sq_bright' : 'sq'}
            />
            {['Drama', 'Romance', 'Action', 'Comedy', 'Mystery', 'History'].map(
              (element) => {
                return (
                  <li
                    onClick={() => {
                      setGenre(element);
                    }}
                    className={genre === element ? 'bright' : ''}
                    key={element}
                  >
                    {element}
                  </li>
                );
              }
            )}
          </ul>
          <ul id="years">
            <li
              onClick={() => {
                setYear('all');
              }}
              className={year === 'all' ? 'sq sq_bright' : 'sq'}
            />
            <li
              onClick={() => {
                setYear('1950');
              }}
              className={year === '1950' ? 'bright' : ''}
            >
              50’s
            </li>
            <li
              onClick={() => {
                setYear('1960');
              }}
              className={year === '1960' ? 'bright' : ''}
            >
              60’s
            </li>
            <li
              onClick={() => {
                setYear('1970');
              }}
              className={year === '1970' ? 'bright' : ''}
            >
              70’s
            </li>
            <li
              onClick={() => {
                setYear('1980');
              }}
              className={year === '1980' ? 'bright' : ''}
            >
              80’s
            </li>
          </ul>
        </Chooser>
        <Grid>
          {result &&
            result.map((film) => {
              return (
                <Card
                  HREF={`/film/[id]`}
                  AS={`/film/${film.id}`}
                  ALT={`Film ${film.title} ${film.producedBy}. ${film.year}. ${film.genres[0]}`}
                  key={film.id}
                  h3={film.title}
                  h6top={film.producedBy}
                  h6bot={film.countries[0]}
                  img={film?.coverIMG}
                  type="single"
                />
              );
            })}
        </Grid>
      </Layout>
    </>
  );
};
export default IndexPage;
export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  try {
    const client = new ApolloClient({
      uri: process.env.API_URL,
      cache: new InMemoryCache(),
    });

    const {data} = await client.query({query: GET_ALL_FILMS});
    console.log(data);

    return {
      props: {
        films: data.getAllFilms,
      },
    };
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};
export interface IndexProps extends Record<string, unknown> {
  films: IFilmCard[];
}
