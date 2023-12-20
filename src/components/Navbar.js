
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState ,useEffect  } from 'react'

import darkenColor from '../utils/darkenColor'
import lightenColor from '../utils/lightenColor'


export default function Navbar() {
const [firstColor , setFirstColor]= useState('#09aa9a')
const [firstColorDark , setFirstColorDark]= useState(darkenColor(firstColor,30))
const [firstColorLight , setFirstColorLight]= useState(lightenColor(firstColor,40))
const [secondColor , setSecondColor]= useState("#e5b311")
const [secondColorDark , setSecondColorDark]= useState(darkenColor(secondColor,15))
const [secondColorLight , setSecondColorLight]= useState(lightenColor(secondColor,12))
  const [selectedPreset, setSelectedPreset] = useState(null);

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }
  const applyPresetPalette = (first, second, name) => {
    setFirstColor(first);
    setSecondColor(second);
    setSelectedPreset(name);
  };
  const presetPalettes = [
    { name: 'Blue & Yellow', first: '#08b0a0', second: '#e5b311' },
    { name: 'White & Purple', first: '#f1ecfe', second: '#7a47b8' },
    { name: 'Red & Orange', first: '#e74c3c', second: '#f39c12' },
    // Add more preset palettes as needed
  ];

const handleFirstColorChange = (e) => {

  setFirstColor(e.target.value)
  setFirstColorDark(darkenColor(e.target.value, 30));
  setFirstColorLight(lightenColor(e.target.value, 18));
}
const handleSecondColorChange = (e) => {
  
  setSecondColor(e.target.value)
  setSecondColorDark(darkenColor(e.target.value,15))
  setSecondColorLight(lightenColor(e.target.value,12))
}

useEffect(() => {
  const updateColors = () => {
    document.documentElement.style.setProperty('--first-color', firstColor);
    document.documentElement.style.setProperty('--first-color-dark', darkenColor(firstColor, 30));
    document.documentElement.style.setProperty('--first-color-light', lightenColor(firstColor, 18));
    document.documentElement.style.setProperty('--second-color', secondColor);
    document.documentElement.style.setProperty('--second-color-dark', darkenColor(secondColor, 14));
    document.documentElement.style.setProperty('--second-color-light', lightenColor(secondColor, 13));
  };

  updateColors();
}, [firstColor, secondColor]);
  return (
    <div className='nav-container'>
        <div className='nav'>
            <Link to='/'><h2>Home</h2></Link>
            <input type='color' value={firstColor} onChange={handleFirstColorChange}/>
            <input type='color' value={secondColor} onChange={handleSecondColorChange}/>
            <div className='presets'>
        <span>Preset Palettes:</span>
        {presetPalettes.map((palette, index) => (
          <button
            key={index}
            onClick={() => applyPresetPalette(palette.first, palette.second)}
          >
            {palette.name}
          </button>
        ))}
      </div>
            {user && user.role ==="admin" ?  <Link to='/alltodos'><h2>All Todos</h2></Link> : ''}
            <nav>
            {user && (
            <div>
              
              <span>{user.username}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
            </nav>
        </div>
    </div>
  )
}
