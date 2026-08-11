import { useState } from 'react'
import ProfileList from './components/profilelist.jsx'
import Addcard from './components/profileform.jsx'
import './App.css'

function App() {


const [profiles, setProfiles] = useState([]);


  return(
  <section className="app">

   <div className="navbar">
     <h1> TEAM MANAGER </h1>
   </div>

   <Addcard   
   setProfiles={setProfiles} 
   />

   <ProfileList profiles= {profiles} />

  </section>
  );
}

export default App
