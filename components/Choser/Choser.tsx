import {IChoser} from './Choser.interface';

export const Chooser = ({h1, children}: IChoser): JSX.Element => {
  return (
    <>
      <section id="selection">
        <h1>{h1}</h1>
        <div id="selection__body">{children}</div>
      </section>
    </>
  );
};
