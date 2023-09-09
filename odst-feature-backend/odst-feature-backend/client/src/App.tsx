import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

import Layout from './modules/layout/Layout';

import About from './modules/static/About';
import Contact from './modules/static/Contact';
import NotFound from './modules/static/NotFound';
import Login from './modules/auth/Login';
import Publications from './modules/orders/Publications';
import Subscriptions from './modules/subscriptions/Subscriptions';

import AuthContext from './modules/auth/AuthContext';
import AuthGuard from './modules/auth/AuthGuard';

import { User } from './modules/common/types';


export default function App() {
  // State
  // -----

  const { instance: msal } = useMsal();
  const [user, setUser] = React.useState<User | null>(null);


  // Context
  // -------

  const authContext = React.useMemo(() => ({
    user,
    msal,
  }), [user]);


  // View
  // ----

  return (
    <AuthContext.Provider value={authContext}>
      <Layout>
        <AuthGuard>
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthGuard>
      </Layout>
    </AuthContext.Provider>
  );
}
