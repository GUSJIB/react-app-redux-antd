import React, { CSSProperties } from 'react';
import { Menu, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import './cheat-menu.css';
export interface ICheatMenuProps {
  handleModel: (e) => void;
  menus: any;
  iconDropdownStyle?: CSSProperties | undefined;
  placement?: any;
  align?: any;
}

const CheatMenu = ({ handleModel, menus, iconDropdownStyle, placement, align }: ICheatMenuProps) => {
  const menu = () => (
    <Menu className="chatmenu-container">
      {menus.map(e => (
        <Menu.Item key={e.id}>
          <a style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer" onClick={() => handleModel(e)}>
            {e.name}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu()} trigger={['click']} placement={placement} align={align}>
        <MoreOutlined style={iconDropdownStyle} />
      </Dropdown>
    </div>
  );
};

export default CheatMenu;
