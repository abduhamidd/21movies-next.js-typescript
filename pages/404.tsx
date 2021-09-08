// Custom Error Page
import {Meta} from './../components/Meta/index';
import {Header} from './../components/Header/index';

// A 404 page may be accessed very often.
// Server-rendering an error page for every visit increases the load of the Next.js server.
// This can result in increased costs and slow experiences.

// To avoid the above pitfalls, Next.js provides
// a static 404 page by default without having to add any additional files.

const __404: React.FunctionComponent = () => {
  return (
    <>
      <Meta
        titleShort="Page unavailable"
        titleLong="21MOVIES. Page unavailable"
        description="21MOVIES. Page unavailable"
        keywords="21MOVIES, Page unavailable"
      />
      <Header />
      <div className="custom404">
        <div>
          <h1>404</h1>
        </div>
      </div>
    </>
  );
};

export default __404;
