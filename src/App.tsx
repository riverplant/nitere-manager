import './App.css'
import reactLogo from './assets/react.svg'
import { NavLink, useNavigate } from 'react-router-dom'

function App() {
  //不能放入if中，只能在函数组件中定义
  const navigate = useNavigate()

  return (
    <div className='App'>
      <div>
        <NavLink to={'/vite'}>
          <img src='/vite.svg' className='logo' alt='Vite logo'></img>
        </NavLink>

        <NavLink to={'/react'}>
          <img src={reactLogo} className='logo react' alt='React logo'></img>
        </NavLink>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button
          onClick={() => {
            navigate('/react')
          }}
        >
          点击跳转
        </button>
      </div>
    </div>
  )
}

export default App
