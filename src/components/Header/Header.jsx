
// import taigaLogo from "../../assets/icons/taiga_logo_gray.svg";
// import "./Header.css";

// export default function Header() {
//   return (
//     <header className="header">
//       <div className="header__logo">
//         <img src={taigaLogo} alt="Taiga" />
//       </div>
//       <div className="header__login">Login</div>
//     </header>
//   );
// }

import taigaLogo from "../../assets/icons/taiga_logo_gray.svg";
import "./Header.css";

export default function Header({ variant = "public" }) {
  if (variant === "dashboard") {
    return (
      <header className="header header--dashboard">
        <div className="header__left">
          <img src={taigaLogo} alt="Taiga" />
          <span className="header__projects">Projects</span>
        </div>

        <div className="header__right">
          <span className="header__icon">✏️</span>
          <span className="header__icon">❓</span>
          <span className="header__icon">🔔</span>
          <span className="header__avatar">👤</span>
        </div>
      </header>
    );
  }

  // PUBLIC HEADER (Discover / Login)
  return (
    <header className="header header--public">
      <div className="header__logo">
        <img src={taigaLogo} alt="Taiga" />
      </div>
      <div className="header__login">Login</div>
    </header>
  );
}