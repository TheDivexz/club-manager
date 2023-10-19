import { useEffect, useState } from "react";
import './styles/utility.css'
import './styles/styles.css'
import type { MenuProps } from "antd";
import { Menu } from 'antd';

// Define the type for the props
interface MainSideBarProps {
    whichView: (data: number) => void; // Function that accepts a string parameter and returns void
}

// Needed Boilerplate for defining what a menu item is
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?:React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem
}

const items: MenuProps['items'] = [
    getItem('Squad View','0'),
    getItem('Match View','1'),
    getItem('Calender View','2'),
]

const MainSideBar: React.FC<MainSideBarProps> = ({whichView}) => {

    const determineView = (view: number) => {
        whichView(view);
    }

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click',e);
        determineView(+e.key)
    }

    return (
        <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    )
}

export default MainSideBar;