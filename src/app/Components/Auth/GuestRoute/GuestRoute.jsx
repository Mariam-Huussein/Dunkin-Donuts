import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../../context/auth.context';

export default function GuestRoute({children}) {
  const { userData } = useContext(AuthContext);

    if(userData){
        return <Navigate to={'/home'}/>
    }
    else{
        return children;
    }
}
