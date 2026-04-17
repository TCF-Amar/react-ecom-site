import { formatDate } from "../../../utils/dateFormater";
import { useAuth } from "../../auth/hooks/useAuth";

function HomePage() {
    const {signOutUser,  user} = useAuth();
  
  return (
      <div>HomePage
      {user?.email}
      { formatDate(user?.createdAt as string)}
    
          <button type="button" onClick={signOutUser}>Logout</button>
    </div>
  )
}

export default HomePage