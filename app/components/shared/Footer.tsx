interface FooterLinkProps {
  href: string;
  text: string;
}

const FooterLink = ({ href, text }: FooterLinkProps) => (
  <a href={href} className="text-sm hover:text-white transition-colors">
    {text}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-2xl font-bold text-white tracking-wide">
            RXplorer
          </div>
          <p className="text-sm mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
          <FooterLink href="#" text="Privacy Policy" />
          <FooterLink href="#" text="Terms of Service" />
          <FooterLink href="#" text="Contact" />
          <FooterLink href="https://github.com/mr-chidex" text="GitHub" />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
