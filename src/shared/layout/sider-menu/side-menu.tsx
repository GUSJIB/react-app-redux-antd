import './side-menu.css';

import React, { useState } from 'react';
import { Affix, Col, Layout, Menu, MenuProps, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

export const SideLogo = styled('div')`
  overflow: hidden;
  background-image: url('/images/logo.svg');
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: 24px 24px;
  background-position: center;
`;

const menuList = [
  {
    key: 'counter',
    label: <Link to="/counter">Counter</Link>,
    icon: <UserOutlined />,
  },
  {
    key: 'home',
    label: <Link to="/home">Home</Link>,
    icon: <UserOutlined />,
  },
  {
    key: 'dashboard',
    label: <Link to="/dashboard">Dashboard</Link>,
    icon: <UserOutlined />,
  },
  {
    key: 'admin',
    label: <Link to="/admin">Admin</Link>,
    icon: <UserOutlined />,
  },
  {
    key: 'analytics',
    label: <Link to="/analytics">Analytics</Link>,
    icon: <UserOutlined />,
  },
];

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (): void => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps['onClick'] = e => {
    window.history.pushState('','', e.keyPath.join('/'));
  };

  return (
    <>
      <Affix offsetTop={0}>
        <Sider
          collapsed={collapsed}
          collapsible
          onCollapse={onCollapse}
          theme="light"
          collapsedWidth={48}
          style={{
            zIndex: 1,
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
            height: '100vh',
          }}
        >
          <Row>
            {collapsed ? (
              <Col span={24} style={{ padding: '10px' }}>
                <Link to={'/'}>
                  <SideLogo className="logo" />
                </Link>
              </Col>
            ) : (
              <Col span={24} style={{ padding: '10px' }} className="vertical-center">
                <Link to={'/'}>
                  <SideLogo
                    className="logo"
                    style={{
                      backgroundPosition: 'left',
                      marginLeft: '13px',
                      width: '24px',
                      float: 'left',
                    }}
                  />
                </Link>
                <span style={{ float: 'left', marginLeft: '8px' }}>PromptDee</span>
              </Col>
            )}
          </Row>

          <Menu theme="light" onClick={onClick} defaultSelectedKeys={['landing']} mode="vertical" items={menuList} />
        </Sider>
      </Affix>
    </>
  );
};

export default SideMenu;
