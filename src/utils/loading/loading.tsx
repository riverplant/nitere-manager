import { Spin } from 'antd'
import './loading.less'

export default function Loading() {
  return (
    <Spin size='large' tip='loading'>
      <p>数据读取中.....</p>
    </Spin>
  )
}
