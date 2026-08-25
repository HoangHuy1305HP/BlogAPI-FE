const sponsors = [
  {
    name: "Google AI",
    logo: "https://media2.dev.to/dynamic/image/width=880,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fxjlyhbdqehj3akhz166w.png",
    description: "Google AI is the official AI Model and Platform Partner",
    href: "https://aistudio.google.com/",
  },
  {
    name: "Neon",
    logo: "https://media2.dev.to/dynamic/image/width=880,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fbnl88cil6afxzmgwrgtt.png",
    description: "Neon is the official database partner",
    href: "https://neon.tech/",
  },
  {
    name: "Algolia",
    logo: "https://media2.dev.to/dynamic/image/width=880,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fv30ephnolfvnlwgwm0yz.png",
    description: "Algolia is the official search partner",
    href: "https://www.algolia.com/",
  },
];

export default function SponsorBanner() {
  return (
    <div className="bg-white rounded-lg border p-6 h-auto items-center mt-5 ">
      <p className="font-bold mb-1">💎 Diamond Sponsors</p>
      <p className="text-xs text-gray-500 mb-3">
        Thank you to our sponsors for supporting the community
      </p>
      <div className="flex flex-col gap-3 items-center">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="text-center text-xs italic text-gray-600 items-center"
          >
            <a href={sponsor.href} target="_blank" rel="noopener noreferrer">
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-48 items-center px-6 rounded mb-2 ml-1"
              />
            </a>
            <p>{sponsor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}