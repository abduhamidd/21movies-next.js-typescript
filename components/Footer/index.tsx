export const Footer = (): JSX.Element => {
  return (
    <>
      <footer id="footer" />
      <style jsx>
        {`
          #footer {
            width: 100%;
            height: 110px;
            box-sizing: border-box;
            padding-top: 80px;
            display: 'flex';
            align-items: 'center';
            justify-content: space-between;
          }
        `}
      </style>
    </>
  );
};
