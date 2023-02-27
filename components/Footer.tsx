import { FaTwitter, FaDiscord } from 'react-icons/fa'
import Link from 'next/link'

const FOOTER_ENABLED = process.env.NEXT_PUBLIC_FOOTER_ENABLED == 'true'

const Footer = () => {
  if (FOOTER_ENABLED)
    return (
      <footer className="col-span-full dark:bg-hunnysdarkpurple flex flex-col items-center justify-between py-8 px-6 pb-12 sm:flex-row md:px-16">
        <div className="mb-6 flex flex-row flex-wrap items-center justify-between gap-x-6 sm:mb-0 sm:gap-x-8 sm:text-sm">
          <Link href="https://hunnys.io/" legacyBehavior={true}>
            <a className="" target="_blank" rel="noreferrer">
              Home
            </a>
          </Link>
          <Link href="https://hunnys.io/about/" legacyBehavior={true}>
            <a className=" min-w-max" target="_blank" rel="noreferrer">
              About
            </a>
          </Link>
          <Link href="https://hunnys.io/shopselect/" legacyBehavior={true}>
            <a className=" min-w-max" target="_blank" rel="noreferrer">
              Merch
            </a>
          </Link>
          <Link href="https://hunnys.io/bunnyu/launch-your-own-nft-marketplace/" legacyBehavior={true}>
          <a className=" min-w-max" target="_blank" rel="noreferrer">
          Create Your Own Marketplace
          </a>
          </Link>
        </div>
        <div className="flex flex-row items-center gap-x-6">
          <Link href="https://twitter.com/HunnysNFT" legacyBehavior={true}>
            <a className="" target="_blank" rel="noreferrer">
              <FaTwitter className="h-[20px] w-[25px]" />
            </a>
          </Link>
          <Link href="https://discord.gg/hunnys" className="ml-5" legacyBehavior={true}>
            <a className="" target="_blank" rel="noreferrer">
              <FaDiscord className="h-[19px] w-[25px]" />
            </a>
          </Link>
        </div>
      </footer>
    )

  return null
}

export default Footer
