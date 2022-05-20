import './header.css';

import React from 'react';
import { Col, Layout, Row } from 'antd';
// import Profile from '../../../components/profile/profile';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const Header = (props: IHeaderProps) => {
  return (
    <Layout.Header className="header-layout-background" style={{ height: '48px', lineHeight: '48px', padding: 0 }}>
      <Row>
        <Col flex={24} xl={24} className={'vertical center'}>
          {/* <Profile /> */}
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
