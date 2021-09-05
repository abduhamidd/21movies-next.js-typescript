/* eslint-disable @next/next/no-img-element */
import {ICardProps} from './Card.interface';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';
export const Card = (props: ICardProps): JSX.Element => {
  return (
    <>
      <LazyLoad height={300} offset={50}>
        <article>
          <Link href={props.HREF} as={props.AS}>
            <a
              className={
                props.type === 'single'
                  ? 'post__preview_single'
                  : 'post__preview_double'
              }
            >
              <div className="post__thumb">
                <div className="post__thumb-cover">
                  <img src={props.img} alt={props.ALT} />
                </div>
                <div className="post__thumb-cover">
                  <img
                    src={props.type === 'double' ? props.img2 : props.img}
                    alt={props.ALT}
                  />
                </div>
              </div>
              <div className="post__tags">
                <h6>{props.h6top}</h6>
                <h3>{props.h3}</h3>
                <h6>{props.h6bot}</h6>
              </div>
            </a>
          </Link>
        </article>
      </LazyLoad>
    </>
  );
};
