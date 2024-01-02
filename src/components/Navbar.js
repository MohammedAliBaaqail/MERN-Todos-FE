import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";

import darkenColor from "../utils/darkenColor";
import lightenColor from "../utils/lightenColor";

export default function Navbar() {
  const [firstColor, setFirstColor] = useState("#09aa9a");
  const [firstColorDark, setFirstColorDark] = useState(
    darkenColor(firstColor, 30)
  );
  const [firstColorLight, setFirstColorLight] = useState(
    lightenColor(firstColor, 40)
  );
  const [secondColor, setSecondColor] = useState("#e5b311");
  const [secondColorDark, setSecondColorDark] = useState(
    darkenColor(secondColor, 15)
  );
  const [secondColorLight, setSecondColorLight] = useState(
    lightenColor(secondColor, 12)
  );
  const [selectedPreset, setSelectedPreset] = useState(null);

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  const applyPresetPalette = (first, second, name) => {
    setFirstColor(first);
    setSecondColor(second);
    setSelectedPreset(name);
  };
  const presetPalettes = [
    { name: "Soybean   &Eclipse ", first: "#D7C49E", second: "#343148" },
    { name: "White & Purple", first: "#f1ecfe", second: "#7a47b8" },
    { name: "Red & Orange", first: "#cc0017", second: "#f39c12" },
    { name: "Gray  & Lime ", first: "#606060", second: "#D6ED17" },
    { name: "Royal Blue  & Peach", first: "#00539C", second: "#EEA47F" },
    {
      name: "Mellow Yellow & Green",
      first: "#FFE77A",
      second: "#2C5F2D",
    },
   
  ];

  const handleFirstColorChange = (e) => {
    setFirstColor(e.target.value);
    setFirstColorDark(darkenColor(e.target.value, 30));
    setFirstColorLight(lightenColor(e.target.value, 18));
  };
  const handleSecondColorChange = (e) => {
    setSecondColor(e.target.value);
    setSecondColorDark(darkenColor(e.target.value, 7));
    setSecondColorLight(lightenColor(e.target.value, 10));
  };

  useEffect(() => {
    const updateColors = () => {
      document.documentElement.style.setProperty("--first-color", firstColor);
      document.documentElement.style.setProperty(
        "--first-color-dark",
        darkenColor(firstColor, 30)
      );
      document.documentElement.style.setProperty(
        "--first-color-light",
        lightenColor(firstColor, 18)
      );
      document.documentElement.style.setProperty("--second-color", secondColor);
      document.documentElement.style.setProperty(
        "--second-color-dark",
        darkenColor(secondColor, 7)
      );
      document.documentElement.style.setProperty(
        "--second-color-light",
        lightenColor(secondColor, 10)
      );
    };

    updateColors();
  }, [firstColor, secondColor]);
  return (
    <div className="nav-container">
      <div className="nav">
        <Link to="/">
          <h2>Home</h2>
        </Link>
        {/* <input type='color' value={firstColor} onChange={handleFirstColorChange}/>
            <input type='color' value={secondColor} onChange={handleSecondColorChange}/> */}
        <div className="presets">

          <div class="dropdown">
            <button class="dropbtn">Color Pallet</button>
            <div class="dropdown-content">

              {presetPalettes.map((palette, index) => (
                <a
                  key={index}
                  onClick={() =>
                    applyPresetPalette(palette.first, palette.second)
                  }
                >
                  {palette.name}
                </a>
              ))}
            </div>
          </div>
          {/* {presetPalettes.map((palette, index) => (
            <button
              key={index}
              onClick={() => applyPresetPalette(palette.first, palette.second)}
            >
              {palette.name}
            </button>
          ))} */}
        </div>
        {user && user.role === "admin" ? (
          <Link to="/alltodos">
            <h2>All Todos</h2>
          </Link>
        ) : (
          ""
        )}
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
  );
}
