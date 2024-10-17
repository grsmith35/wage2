import './App.css';
import Login from './pages/Login';
import Header from './Components/Header';
import Footer from './Components/Footer';
import OneTimeReport from './pages/OneTimeReport';
import auth from './utils/auth';
import { ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink, } from '@apollo/client';
  import { setContext } from '@apollo/client/link/context';
  import { Routes, Route, Outlet } from 'react-router-dom';


const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URL || "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'network-only',
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<OneTimeReport />} />
            <Route path="/OneTimeReport" element={<OneTimeReport />} />
            <Route path="/Login" element={<Login />} />
          <Route path="*" element={<OneTimeReport />} />
        </Route>  
      </Routes>
      <Footer className="push"></Footer>
   </ApolloProvider>
  );
}

function Layout() {

  const handleLogout = () => {
    auth.logout()
  };

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App;