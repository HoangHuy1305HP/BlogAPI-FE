import {
  FaXTwitter,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitch,
} from "react-icons/fa6";

const socialLinks = [
  { icon: FaXTwitter, href: "#", label: "X" },
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaGithub, href: "#", label: "GitHub" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaTwitch, href: "#", label: "Twitch" },
];

function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-2 p-2 mb-4">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-800 text-white hover:bg-gray-700"
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;