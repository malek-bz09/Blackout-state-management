import { useState } from 'react'
import ProfileList from './components/profilelist.jsx'
import Addcard from './components/profileform.jsx'
import './App.css'

function App() {
const profiles = [
  {
    id: 1,
    name: "Abdelmalek",
    role: "Frontend Developer",
    skills: ["JavaScript", "React", "Git"]
  },
  {
    id: 2,
    name: "Sarah",
    role: "UI/UX Designer",
    skills: ["Figma", "UI Design", "Prototyping"]
  },
  {
    id: 3,
    name: "Yacine",
    role: "Backend Developer",
    skills: ["Python", "FastAPI", "MySQL"]
  },
  {
    id: 4,
    name: "Lina",
    role: "Full Stack Developer",
    skills: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 5,
    name: "Amine",
    role: "Cybersecurity Student",
    skills: ["Linux", "Networking", "Python"]
  }
];


  return(
  <>
   <Addcard />
   <ProfileList profiles= {profiles} />
  </>
  );
}

export default App
