/* eslint-disable react/no-unescaped-entities */
import {Layout} from '../../components/Layout';
import {Meta} from './../../components/Meta/index';
import Link from 'next/link';
const TimePage = () => {
  return (
    <>
      <Layout>
        <Meta
          titleShort="Keep up to time with temporary events."
          titleLong="21MOVIES. Keep up to time with temporary events."
          description="Best time of cinema. Read more about the time. 21MOVIES. 1940s 1950s 1960s 1970s."
          keywords="21MOVIES, 1940s, 1950s, 1960s, 1970s"
        />
        <div id="time">
          <section id="time__traveler">
            <h1 className="h2-fk">Keep up to time with temporary events.</h1>
            <ul>
              <li>
                <Link href="/time/[id]" as="/time/1940">
                  <a>40's</a>
                </Link>
              </li>
              <li>
                <Link href="/time/[id]" as="/time/1950">
                  <a>50's</a>
                </Link>
              </li>
              <li>
                <Link href="/time/[id]" as="/time/1960">
                  <a>60's</a>
                </Link>
              </li>
              <li>
                <Link href="/time/[id]" as="/time/1970">
                  <a>70's</a>
                </Link>
              </li>
              <li>
                <Link href="/time/[id]" as="/time/1980">
                  <a>80's</a>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </Layout>
    </>
  );
};
export default TimePage;
