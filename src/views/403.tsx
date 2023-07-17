import Button from 'antd/es/button'
import Result from 'antd/es/result'
import { useNavigate } from 'react-router-dom'

function Forbidden() {
  const navigate = useNavigate()
  return (
    <Result
      status={403}
      title='403'
      subTitle='没有权限访问此页面'
      extra={
        <Button
          type='primary'
          onClick={() => {
            navigate('/')
          }}
        >
          返回首页
        </Button>
      }
    ></Result>
  )
}

export default Forbidden
