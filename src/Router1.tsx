import { Link, Navigate, useRoutes } from 'react-router-dom'
import App from './App'

function ReactDemo() {
  return (
    <h2>
      welcom...react <Link to='..'>Back</Link>
    </h2>
  )
}

function ViteDemo() {
  return (
    <h2>
      welcom...vite<Link to='..'>Back</Link>
    </h2>
  )
}

function Test() {
  return <Navigate to='/react' />
}

function Appel() {
  return (
    <h2>
      welcom...appel<Link to='..'>Back</Link>
    </h2>
  )
}

function NotFound() {
  return (
    <h2>
      404,当前页面不存在<Link to='/'>Back</Link>
    </h2>
  )
}

function BaseRouter() {
  const routes = useRoutes([
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/react',
      element: <ReactDemo />,
    },
    {
      path: '/vite',
      element: <ViteDemo />,
    },
    {
      path: '/test',
      element: <Test />,
    },
    {
      path: '/appel',
      element: <Appel />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ])
  return routes
}

export default BaseRouter
