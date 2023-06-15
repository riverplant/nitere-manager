import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router3 from './Router3.tsx'

/**ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <BaseRouter />
  </BrowserRouter>**/

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router3} />

  //通过/#/eva/...来访问
  /**  <HashRouter>
    <Routes>
      <Route path='/eva' element={<App />}></Route>
      <Route path='/eva/react' element={<ReactDemo />}></Route>
    </Routes>
  </HashRouter>*/
)
