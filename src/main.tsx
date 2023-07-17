import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <BaseRouter />
  </BrowserRouter>**/

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />

  //通过/#/eva/...来访问
  /**  <HashRouter>
    <Routes>
      <Route path='/eva' element={<App />}></Route>
      <Route path='/eva/react' element={<ReactDemo />}></Route>
    </Routes>
  </HashRouter>*/
)
