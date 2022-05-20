import './site.css';

import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const Site = ({ children }) => {
  return <Content style={{ margin: '0' }}>{children}</Content>;
};

export default Site;
