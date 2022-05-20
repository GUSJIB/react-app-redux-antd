import { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import React from 'react';
import ErrorBoundary from '../shared/error/error-boundary';
import SideMenu from '../shared/layout/sider-menu/side-menu';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../shared/layout/header/header';
import Site from '../shared/layout/site/site';
import Footer from '../shared/layout/footer/footer';

const ProtectedRoutes = () => {

  const baseHref = document.querySelector('base')?.getAttribute('href')?.replace(/\/$/, '');

  return (
    <Router basename={baseHref}>
      <Suspense fallback={<div>Loading...</div>}>
        <Spin size="large" spinning={false} delay={0}>
          <Layout style={{ minHeight: '100vh' }}>
            <ToastContainer position={toast.POSITION.TOP_CENTER} className="toastify-container" toastClassName="toastify-toast" />
            <ErrorBoundary>
              <SideMenu />
            </ErrorBoundary>
            <Layout className="site-layout">
              <ErrorBoundary>
                <Header isAuthenticated={true} isAdmin={true} />
              </ErrorBoundary>
              <Site>
                <ErrorBoundary>
                  <AppRoutes />
                </ErrorBoundary>
              </Site>
              <Footer />
            </Layout>
          </Layout>
        </Spin>
      </Suspense>
    </Router>
  );
}

export default ProtectedRoutes;