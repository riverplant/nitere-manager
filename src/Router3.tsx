import {
  Link,
  Outlet,
  createBrowserRouter,
  redirect,
  useLoaderData,
  useParams,
  Form,
  useActionData,
} from 'react-router-dom'
import App from './App'

function Login() {
  const errors: any = useActionData()
  return (
    <Form method='post'>
      <p>
        <input type='text' name='email' />
        {errors?.email && <span>{errors.email}</span>}
      </p>

      <p>
        <input type='text' name='password' />
        {errors?.password && <span>{errors.password}</span>}
      </p>
      <p>
        <button type='submit'>Sign up</button>
      </p>
    </Form>
  )
}

function ordreLoader({ params }: any) {
  //验证Token
  return !sessionStorage.token ? redirect('/login') : fetch(`/${params.id}.json`)
}

function Order() {
  const data: any = useLoaderData() //获得ordreLoader的返回值
  const params = useParams() //获取参数!!!!!!!
  return (
    <h2>
      订单Id: {params.id} 订单组件Id:{data.data.orderId}
    </h2>
  )
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
  // <Outlet></Outlet> 用来加载子主键的容器
  return (
    <div>
      <h2>商品主页</h2>
      <Outlet />
    </div>
  )
}

async function loginAction({ request }: any) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const errors: any = {}

  if (typeof email !== 'string' || !email.includes('@')) errors.email = "That doesn't look like an email address"

  if (typeof password !== 'string' || password.length < 6) errors.password = 'Password must be > 6 characters'

  if (Object.keys(errors).length) return errors

  return redirect('/')
}

function NotFound() {
  return (
    <h2>
      404,当前页面不存在<Link to='/'>Back</Link>
    </h2>
  )
}

const router3 = createBrowserRouter([
  {
    path: '/order/:id', //动态路由
    element: <Order />,
    loader: ordreLoader, //执行主键之前先执行loader拦截器
  },
  {
    path: '/login',
    element: <Login />,
    action: loginAction,
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
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router3
