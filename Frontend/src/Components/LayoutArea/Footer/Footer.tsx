import "./Footer.css";
import { FaGithub, FaLinkedin, FaEnvelope, FaFacebookF, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="Footer" role="contentinfo" aria-label="Site footer">
      <p className="footer-copy">
        Build with Punk 🤘🏽 <br />
        All Rights Reserved 2025 © | Eliav Mendelsohn
      </p>

      <nav className="social-links" aria-label="Social links">
        <a
          href="https://github.com/PZABOY"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <FaGithub />
        </a>

        <a
          href="https://www.linkedin.com/in/eliav-mendelsohn-49bb0313/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <FaLinkedin />
        </a>

        <a
          href="mailto:eliavman@gmail.com"
          aria-label="Email"
          title="Email"
        >
          <FaEnvelope />
        </a>

        <a
          href="https://www.facebook.com/eliav.mendelsohn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          title="Facebook"
        >
          <FaFacebookF />
        </a>

        <a
          href="https://www.instagram.com/pizzacrustcore/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          title="Instagram"
        >
          <FaInstagram />
        </a>
      </nav>
    </footer>
  );
}
