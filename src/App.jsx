import { useState } from 'react'
import ProfileList from './components/profilelist.jsx'
import Addcard from './components/profileform.jsx'
import './App.css'

function App() {
 const [profiles, setProfiles] = useState([]);

  function deleteProfile(id) {
    setProfiles(
      profiles.filter(profile => profile.id !== id)
    );
  }
  
 
  return(
  <section className="app">

   <div className="navbar">
     <h1> TEAM MANAGER </h1>
   </div>

   <Addcard   
   setProfiles={setProfiles} 
   />

   <ProfileList profiles= {profiles} onDelete={deleteProfile} />

  </section>
  );
}

export default App
