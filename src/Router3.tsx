import { Outlet, createBrowserRouter, useParams } from 'react-router-dom'

function Order() {
  const params = useParams() //获取参数!!!!!!!
  return <h2>订单组件{params.id}</h2>
}

function GoodsDetails() {
  const params = useParams() //获取参数!!!!!!!
  return (
    <div>
      <h2>商品详情</h2>
      <span>
        <h2>商品ID:{params.goodId}</h2>
      </span>
      <span>
        <h2>订单ID:{params.orderId}</h2>
      </span>
    </div>
  )
}

function Goods() {
  const params = useParams() //获取参数!!!!!!!
  // <Outlet></Outlet> 用来加载子主键的容器
  return (
    <div>
      <h2>商品主页</h2>
      <Outlet></Outlet>
    </div>
  )
}

const router3 = createBrowserRouter(
  [
    {
      path: '/order/:id', //动态路由
      element: <Order />,
    },
    {
      path: '/goods/:goodId/order/:orderId', //动态路由
      element: <GoodsDetails />,
    },
    {
      path: '/goods',
      element: <Goods />,
      children: [
        {
          path: 'list', //不需要写/!!!!
          element: (
            <div>
              <p>商品1</p>
              <p>商品2</p>
              <p>商品3</p>
            </div>
          ),
        },
        {
          path: 'cart',
          element: (
            <div>
              <p>苹果手机，价格5999</p>
              <p>小米手机，价格2999</p>
            </div>
          ),
        },
      ],
    },
  ],
  {
    basename: '/app', // 访问地址由http://127.0.0.1:9999 转成 http://127.0.0.1:9999/app
  }
)

export default router3
