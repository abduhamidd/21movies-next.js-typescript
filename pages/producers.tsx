/* eslint-disable react/no-unescaped-entities */
import {IPersonCard} from '../interfaces';
import {useState} from 'react';
import {Layout} from '../components/Layout';
import {Meta} from './../components/Meta/index';
import {Chooser} from '../components/Choser/Choser';
import {Grid} from '../components/Grid';
import {__filterPersons} from '../utils/__filter';
import {Card} from '../components/Card/Card';
import {GetStaticProps} from 'next';
import {ApolloClient} from '@apollo/client';
import {InMemoryCache} from '@apollo/client';
import {GET_PRODUCERS} from '../graphql/queries';

interface ProducerPageProps {
  producers: IPersonCard[];
}

const ProducersPage = ({producers}: ProducerPageProps): JSX.Element => {
  const [country, setCountry] = useState('all');
  const [year, setYear] = useState('all');
  const result = __filterPersons([country, year], producers);
  return (
    <Layout>
      <Meta
        titleShort="21MOVIES : Producers"
        titleLong="Read biographies of the greatest movie directors"
        description={`The best producers, directors of the last century. Read the biography of the best directors, about their works. 21MOVIES. Biographies of directors. ${producers[0].name}, ${producers[1].name}, ${producers[2].name} `}
        keywords={`The best acters, directors, producers of the last century, biography of the best producers, 21MOVIES, Biographies of directors. ${producers[0].name}, ${producers[1].name}, ${producers[2].name} `}
      />
      <Chooser h1="PRODUCERS">
        <ul id="countrys">
          <li
            onClick={() => {
              setCountry('all');
            }}
            className={country === 'all' ? 'sq sq_bright' : 'sq'}
          />
          {['Japan', 'France', 'Russia', 'USA', 'British', 'Germany'].map(
            (element) => {
              return (
                <li
                  onClick={() => {
                    setCountry(element);
                  }}
                  className={country === element ? 'bright' : ''}
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
            50's
          </li>
          <li
            onClick={() => {
              setYear('1950');
            }}
            className={year === '1960' ? 'bright' : ''}
          >
            60's
          </li>
          <li
            onClick={() => {
              setYear('1950');
            }}
            className={year === '1970' ? 'bright' : ''}
          >
            70's
          </li>
          <li
            onClick={() => {
              setYear('1950');
            }}
            className={year === '1980' ? 'bright' : ''}
          >
            80's
          </li>
        </ul>
      </Chooser>
      <Grid>
        {result &&
          result.map((producer) => {
            return (
              <Card
                key={producer.id}
                HREF={`/person/[id]`}
                AS={`/person/${producer.id}`}
                ALT={`Producer ${producer.name}, ${producer.countries[0]}, ${producer.yearsPopular[0]}`}
                h3={producer.name}
                h6bot={producer.countries[0]}
                h6top={producer.title}
                img={producer.imgs[0]}
                img2={producer.imgs[1]}
                type="double"
              />
            );
          })}
      </Grid>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<ProducerPageProps> = async () => {
  try {
    const client = new ApolloClient({
      uri: process.env.API_URL,
      cache: new InMemoryCache(),
    });

    const {data} = await client.query({query: GET_PRODUCERS});
    return {
      props: {
        producers: data.getProducers,
      },
    };
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};
export default ProducersPage;
