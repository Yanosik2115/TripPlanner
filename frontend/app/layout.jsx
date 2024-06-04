import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const metadata = {
  title: 'Promptopia',
  description: 'Promptopia is a platform for writing prompts and stories.',
};

const RootLayout = ({ children }) => {
  return (
    <html lang={'en'}>
      <body>
        <Provider>
          <div className="main">
            <div className={'gradient'} />
          </div>
          <main className={'app'}>
            <Nav />
            {children}
          </main>
          <ToastContainer position={"bottom-left"}/>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
