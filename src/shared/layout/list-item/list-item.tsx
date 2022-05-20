import { List } from 'antd';
import React from 'react';

export interface IListItemProps {
  itemLayout?: 'horizontal' | 'vertical';
  dataSource: any;
  action?: (index?: number, item?: any) => React.ReactNode[];
  content: (item?: any) => React.ReactNode;
  itemStyle?: any;
}

const ListItem = ({ itemLayout = 'horizontal', dataSource, action, content, itemStyle }: IListItemProps) => {
  const renderItem = (item, index) => {
    return (
      <List.Item className={itemStyle}>
        {content(item)}
        {action && action(index, item)}
      </List.Item>
    );
  };

  return <List itemLayout={itemLayout} dataSource={dataSource} renderItem={renderItem} />;
};

export default ListItem;
