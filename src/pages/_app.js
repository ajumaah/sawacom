import Layout from '../components/Layout';
import '../../styles/global.css';

function MyApp({ Component, pageProps }) {
    // You can add a custom layout property to the component if needed
    const useLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  
    return useLayout(<Component {...pageProps} />);
  }
  
 

export default MyApp;