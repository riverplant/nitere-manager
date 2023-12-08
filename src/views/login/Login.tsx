import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import styles from './index.module.less'
import api from '@/api'
import { Login } from '@/types/api'
import storage from '@/utils/storage'

export default function LoginFC() {
  const [loading, setLoading] = useState(false)
  //const updateToken = useStore(state => state.updateToken)
  
  const onFinish = async (values: Login.params) => {
    console.log('onFinish----------------------------------')
    try {
      setLoading(true)
      console.log('login----------------------------------')
      const data = await api.login(values)
     
      setLoading(false)
      storage.set('userInfo', data)
      //updateToken(data.data)
      message.success('登录成功')
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        location.href = params.get('callback') || '/welcome'
      })
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登录</div>
        <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='email' rules={[{ required: true, message: '請輸入您的用戶名!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name='userPwd' rules={[{ required: true, message: '請輸入您的密碼!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' block htmlType='submit' loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
