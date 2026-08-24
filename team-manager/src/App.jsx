import { useState  , useEffect} from 'react'
import ProfileList from './components/profilelist.jsx'
import Addcard from './components/profileform.jsx'
import EditCard from './components/profileedit.jsx'
import './App.css'
import { AppProvider } from './context/AppContext.jsx'
import Header from './components/header.jsx'

function App() {

 const [profiles, setProfiles] = useState(() => {
  const savedProfiles = localStorage.getItem("profiles");

  return savedProfiles ? JSON.parse(savedProfiles) : [];
})



useEffect(() => {
  const savedProfiles = localStorage.getItem("profiles");

  if (savedProfiles) {
    setProfiles(JSON.parse(savedProfiles));
  }
}, []);


useEffect(() => {
  localStorage.setItem("profiles", JSON.stringify(profiles));
}, [profiles]);


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
  <AppProvider>

  <section className="app">
   
     <Header/>
     <Addcard setProfiles={setProfiles}/>
     <ProfileList profiles={profiles} onDelete={deleteProfile} onEdit={editProfile} />
    
  </section>
  </AppProvider>
  );
}

export default App
