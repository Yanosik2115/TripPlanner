import '@styles/globals.css';

export const metadata = {
  title: 'Promptopia',
  description: 'Promptopia is a platform for writing prompts and stories.',
};

const RootLayout = ({ children }) => {
  return (
    <html lang={'en'}>
      <body>
        <div className="main">
          <div className={'gradient'} />
        </div>
        <main className={'app'}>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
