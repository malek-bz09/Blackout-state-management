import { useState } from 'react'
import ProfileList from './components/profilelist.jsx'
import Addcard from './components/profileform.jsx'
import EditCard from './components/profileedit.jsx'
import './App.css'

function App() {
 const [profiles, setProfiles] = useState([]);

  function deleteProfile(id) {
    setProfiles(
      profiles.filter(profile => profile.id !== id)
    );
  }

function editProfile(updatedProfile) {
  setProfiles(
    profiles.map(profile =>
      profile.id === updatedProfile.id
        ? updatedProfile
        : profile
    )
  );
}
  
 
  return(
  <section className="app">

   <div className="navbar">
     <h1> TEAM MANAGER </h1>
   </div>

   <Addcard   setProfiles={setProfiles} />

   <ProfileList profiles= {profiles} onDelete={deleteProfile} onEdit={editProfile} />


  </section>
  );
}

export default App
