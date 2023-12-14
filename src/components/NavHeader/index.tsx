import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Switch, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import { useStore } from '@/store'
import storage from '@/utils/storage'
const NavHeader = () => {
  const userinfo = storage.get('userInfo')
  const { collapsed, updateCollapsed } = useStore()
  const breadList = [
    {
      title: '首页',
    },
    {
      title: '工作台',
    },
  ]
  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱：' + userinfo.email,
    },
    {
      key: 'logout',
      label: '退出',
    },
  ]

  // 控制菜单图标关闭和展开
  const toggleCollapsed = () => {
    updateCollapsed()
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      storage.remove('userInfo')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    }
  }

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <div onClick={toggleCollapsed}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
        <Breadcrumb items={breadList} style={{ marginLeft: 10 }} />
      </div>
      <div className='right'>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: 10 }} />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={styles.nickName}>{userinfo.email}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
