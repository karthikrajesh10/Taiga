import taigaLogo from "../../assets/icons/taiga_logo_captioned.svg";
import "./Login.css";

export default function Login() {
  return (
    <div className="login">
      <div className="login__container">
        <img
          src={taigaLogo}
          alt="Taiga"
          className="login__logo"
        />

        <div className="login__tagline">
          LOVE YOUR PROJECT
        </div>

        <form className="login__form">
          <input
            type="text"
            placeholder="Username or email (case sensitive)"
          />

          <div className="login__password">
            <input
              type="password"
              placeholder="Password (case sensitive)"
            />
            <span className="login__forgot">Forgot it?</span>
          </div>

          <button type="button" className="login__button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}