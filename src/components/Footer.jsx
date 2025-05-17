import { FaLinkedin, FaTwitter, FaYoutube, FaGithub } from "react-icons/fa";

const socialLinks = [
  { href: "https://linkedin.com/company/techanv", icon: <FaLinkedin /> },
  { href: "https://twitter.com/techanv", icon: <FaTwitter /> },
  { href: "https://youtube.com/techanv", icon: <FaYoutube /> },
  { href: "https://github.com/techanv", icon: <FaGithub /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#1a2b47] py-4 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          ©TECHANV Security 2024. All rights reserved | security.techanv.com
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors duration-500 ease-in-out hover:text-blue-300"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href="#privacy-policy"
            className="text-center text-sm font-light hover:underline md:text-right"
          >
            Privacy Policy
          </a>
          <a
            href="#terms-of-service"
            className="text-center text-sm font-light hover:underline md:text-right"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
