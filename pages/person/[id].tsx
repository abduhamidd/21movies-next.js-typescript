/* eslint-disable @next/next/no-img-element */
import {Layout} from '../../components/Layout';
import {IPerson} from './../../interfaces/index.d';
import {Meta} from './../../components/Meta/index';
import h1 from './../../utils/name';
import {Card} from './../../components/Card/Card';
import {GetStaticProps} from 'next';
import {GetStaticPropsContext} from 'next';
import {ApolloClient} from '@apollo/client';
import {InMemoryCache} from '@apollo/client';
import {gql} from '@apollo/client';
import {ALL_PERSON_FIELDS} from './../../graphql/fragments';
import {GetStaticPaths} from 'next';

interface PersonPageProps {
  person: IPerson;
}

const PersonPage = ({person}: PersonPageProps): JSX.Element => {
  return (
    <Layout>
      <Meta
        titleShort={`21MOVIES | ${person.name}`}
        titleLong={`21MOVIES | ${person.name}`}
        description={`21MOVIES. ${person.name}. Read more biography about ${person.name}, ${person.type}. ${person.countries[0]} ${person.type}. `}
        keywords={`21MOVIES, ${person.name}, ${person.type}, ${person.yearsPopular[0]}, ${person.about.mostPopularFilm.h3}`}
      />

      <section id="person__header">
        <h1>{h1(person.name)[0]}</h1>
        <h1>{h1(person.name)[1]}</h1>
      </section>
      <section id="person__imgs">
        {person.imgs.map((img) => {
          return (
            <div key={img}>
              <img
                src={img}
                alt={`Person image ${person.type} ${person.name}`}
              />
            </div>
          );
        })}
      </section>
      <section id="person__biography">
        <article>
          <div>
            <h5>BIOGRAPHY</h5>
          </div>
          <div className="right">
            <h4>{person.briefAbout}</h4>
            <p>{person.about.paragraphs[0]}</p>
          </div>
        </article>
        <article>
          <div>
            <h5>MOST POPULAR FILM</h5>
          </div>
          <div className="person__magnum">
            <Card
              HREF="/film/[id]"
              AS={`/film/${person.about.mostPopularFilm.id}`}
              ALT={`Film ${person.about.mostPopularFilm.h3} ${person.about.mostPopularFilm.h6bot}`}
              img={person.about.mostPopularFilm.img}
              h3={person.about.mostPopularFilm.h3}
              h6bot={person.about.mostPopularFilm.h6bot}
              h6top={person.about.mostPopularFilm.h6top}
              type="single"
            />
            <p>{person.about.paragraphs[1]}</p>
          </div>
        </article>
        <article>
          <div>
            <h5>LAST ROLES</h5>
          </div>
          <div className="right">
            <p>{person.about.paragraphs[2]}</p>
            <p>{person.about.paragraphs[3]}</p>
          </div>
        </article>
        <section id="filmography__wrap">
          <h5>FILMOGRAPHY</h5>
          <div id="filmography">
            {person.filmography.map((film) => {
              return (
                <Card
                  key={film.id}
                  type="single"
                  HREF="/film/[id]"
                  AS={`/film/${film.id}`}
                  ALT={`Film ${film.h3} ${film.h6bot}`}
                  img={film.img}
                  h3={film.h3}
                  h6top={film.h6top}
                  h6bot={film.h6bot}
                />
              );
            })}
          </div>
        </section>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PersonPageProps> = async (
  ctx: GetStaticPropsContext
) => {
  try {
    const client = new ApolloClient({
      uri: process.env.API_URL,
      cache: new InMemoryCache(),
    });
    const data = await client.query({
      query: gql`
      query getPerson{
          getPerson(id:${ctx.params?.id}){
              ...PersonFragment
          }
      }
      ${ALL_PERSON_FIELDS.fragment}
          `,
    });
    return {
      props: {
        person: data.data.getPerson,
      },
    };
  } catch (error) {
    console.log(error);

    throw new Error(`Error:${error}`);
  }
};

export const getStaticPaths: GetStaticPaths = async ctx=> {
  try {
    const client = new ApolloClient({
      uri: process.env.API_URL,
      cache: new InMemoryCache(),
    });
    const data = await client.query({
      query: gql`
        query getAllPersons {
          getAllPersons {
            id
          }
        }
      `,
    });
    const paths = data.data.getAllPersons.map(({id}: any) => {
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
export default PersonPage;
