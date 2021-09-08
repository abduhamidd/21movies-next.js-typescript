/* eslint-disable react/no-unescaped-entities */
import {IPersonCard} from '../interfaces';
import {Layout} from './../components/Layout/index';
import {Meta} from './../components/Meta/index';
import {Chooser} from './../components/Choser/Choser';
import {Grid} from './../components/Grid/index';
import {__filterPersons} from '../utils/__filter';
import {Card} from './../components/Card/Card';
import {useState} from 'react';
import {GetStaticProps, GetStaticPropsContext} from 'next';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {GET_ACTERS} from './../graphql/queries';

interface ActersPageProps {
  acters: IPersonCard[];
}
const ActersPage = ({acters}: ActersPageProps): JSX.Element => {
  const [country, setCountry] = useState('all');
  const [year, setYear] = useState('all');
  const result = __filterPersons([country, year], acters);

  function isTrue(param: any, is: any) {
    if (param === is) {
      return 'bright';
    } else {
      return '';
    }
  }
  return (
    <Layout>
      <Meta
        titleShort="21MOVIES : acters"
        titleLong="Read biographies of the greatest movie directors"
        description={`The best acters, directors of the last century. Read the biography of the best directors, about their works. 21MOVIES. Biographies of directors. ${acters[0].name}, ${acters[1].name}, ${acters[2].name} `}
        keywords={`The best acters, directors, acters of the last century, biography of the best acters, 21MOVIES, Biographies of directors. ${acters[0].name}, ${acters[1].name}, ${acters[2].name} `}
      />
      <Chooser h1="ACTERS">
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
          result.map((acter: any) => {
            return (
              <Card
                key={acter.id}
                HREF={`/person/[id]`}
                AS={`/person/${acter.id}`}
                ALT={`acter ${acter.name}, ${acter.countries[0]}, ${acter.yearsPopular[0]}`}
                h3={acter.name}
                h6bot={acter.countries[0]}
                h6top={acter.title}
                img={acter.imgs[0]}
                img2={acter.imgs[1]}
                type="double"
              />
            );
          })}
      </Grid>
    </Layout>
  );
};
export const getStaticProps: GetStaticProps<ActersPageProps> = async (
  ctx: GetStaticPropsContext
) => {
  try {
    const client = new ApolloClient({
      uri: process.env.API_URL,
      cache: new InMemoryCache(),
    });
    const {data} = await client.query({query: GET_ACTERS});
    return {
      props: {
        acters: data.getActers,
      },
    };
  } catch (error) {
    throw new Error(`Error:${error}`);
  }
};
export default ActersPage;
