import { APP_NAME } from "@/lib/constant"
import Link from "next/link"
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col gap-4 md:flex-1">
            <div className="inline-flex">
              <Link href="/" className="flex flex-col items-start">
                {/* <Image src={logo} fill alt={`${APP_NAME} logo`} /> */}
                <div className="border-b border-black text-xl font-extrabold tracking-[0.5em]">
                  MARINO
                </div>
                <span className="text-[15px] font-semibold uppercase tracking-widest">
                  clothing co.
                </span>
              </Link>
            </div>

            <p className="text-foreground/70">
              Small, artisan label that offers a thoughtfully curated collection
              of high quality everyday essentials made.
            </p>
            <div className="flex items-center gap-2">
              <Link href="https://instagram.com">
                <FaInstagram />
              </Link>
              <Link href="https://instagram.com">
                <FaFacebook />
              </Link>
              <Link href="https://instagram.com">
                <FaXTwitter />
              </Link>
              <Link href="https://instagram.com">
                <FaLinkedin />
              </Link>
            </div>
          </div>
          <div className="mt-4 flex justify-between md:mt-0 md:flex-[2] md:justify-around">
            <div>
              <h4 className="font-semibold">Company</h4>
              <ul className="text-foreground/70">
                <li>About</li>
                <li>Stores</li>
                <li>FAQ</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Contact</h4>
              <ul className="text-foreground/70">
                <li>What's up</li>
                <li>Support 24/7</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Legal</h4>
              <ul className="text-foreground/70">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>How it works</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 text-left">
        2024 Marino Clothing. All Rights reserved.
      </div>
    </footer>
  )
}

export default Footer
