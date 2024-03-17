import React , {useContext} from 'react'
import { Context } from './AuthContext'
import { Link } from 'react-router-dom'
const Main = () => {
    const {handleLogout,loggedInUser} = useContext(Context)
  return (
    <div>
        <nav>
            <div className="navigation">
                <Link to={'/products'}>Products</Link>
            </div>
        </nav>
      <h2>Welcome to main Component - {loggedInUser}</h2>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Main
