import Button from 'antd/es/button'
import Result from 'antd/es/result'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  return (
    <Result
      status={404}
      title='404'
      subTitle='访问的页面不存在'
      extra={
        <Button
          type='primary'
          onClick={() => {
            navigate('/welcome')
          }}
        >
          返回首页
        </Button>
      }
    ></Result>
  )
}

export default NotFound
