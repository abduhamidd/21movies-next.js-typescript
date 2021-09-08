import {Card} from '../../components/Card/Card';
import {ITime} from '../../interfaces';
import {Layout} from './../../components/Layout/index';
import {Meta} from './../../components/Meta/index';
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from 'next';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import {ALL_TIME_FIELDS} from './../../graphql/fragments';

interface TimeProps {
  time: ITime;
}

const TimeYear = ({time}: TimeProps): JSX.Element => {
  return (
    <>
      <Layout>
        <Meta
          titleShort={`21MOVIES | ${time.id}`}
          titleLong={`21MOVIES | ${time.id}`}
          description={`Read more about the ${time.id}s. Best Films of ${time.id}s  21MOVIES. The influence of the ${time.id}s on today's cinema`}
          keywords="21MOVIES, 1940s, 1950s, 1960s, 1970s"
        />

        <div id="time-page">
          <section id="time-page__content">
            <h1 className="h2-fk">
              {time.id} <br />
              {time.title}
            </h1>
            {time.sections.map((section: any, index) => {
              return (
                <article key={index}>
                  <h4>{section.title}</h4>
                  {section.p.map((p: string, index: number) => (
                    <p key={index}> {p}</p>
                  ))}
                </article>
              );
            })}
            <article>
              <h4>SOME OF THE BEST MOVIES OF THE DECADE</h4>
              <section id="time-page__filmography">
                {time.bestMovies.map((film) => {
                  return (
                    <Card
                      key={film.id}
                      type="single"
                      HREF="/film/[id]"
                      AS={`/film/${film.id}`}
                      ALT={`${film.h3}, ${film.h6top}, ${film.h6bot}`}
                      h3={film.h3}
                      h6top={film.h6top}
                      h6bot={film.h6bot}
                      img={film.img}
                    />
                  );
                })}
              </section>
            </article>
          </section>
        </div>
      </Layout>
    </>
  );
};
export const getStaticProps: GetStaticProps<TimeProps> = async (
  ctx: GetStaticPropsContext
) => {
  try {
    const client = new ApolloClient({
      uri: process.env.API_URL,
      cache: new InMemoryCache(),
    });
    const data = await client.query({
      query: gql`
          query getTime{
              getTime(id:${ctx.params?.id}){
                  ...TimeFragment
              }
          }
          ${ALL_TIME_FIELDS.fragment}
          `,
    });

    return {
      props: {
        time: data.data.getTime,
      },
    };
  } catch (error) {
    throw new Error(`Error : ${error}`);
  }
};
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const client = new ApolloClient({
      uri: process.env.API_URL,
      cache: new InMemoryCache(),
    });
    const data = await client.query({
      query: gql`
        query getAllTimes {
          getAllTimes {
            id
          }
        }
      `,
    });
    const paths = data.data.getAllTimes.map(({id}: any) => {
      return {params: {id: id}};
    });
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    throw new Error(`Error : ${error}`);
  }
};
export default TimeYear;
