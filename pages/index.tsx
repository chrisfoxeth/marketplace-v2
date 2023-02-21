import Layout from 'components/Layout'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import { paths } from '@reservoir0x/reservoir-sdk'
import setParams from 'lib/params'
import Head from 'next/head'
import TrendingCollectionTable from 'components/TrendingCollectionTable'
import Footer from 'components/Footer'
import { useMediaQuery } from '@react-hookz/web'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import hunnysHeader from 'public/hunnysHeaderBG.png'
import hupeScouts from 'public/hupeScoutsBG.png'
import hunnysOGsHeader from 'public/hunnysOGsBG.png'

// Environment variables
// For more information about these variables
// refer to the README.md file on this repository
// Reference: https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
// REQUIRED
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
const RESERVOIR_API_BASE = process.env.NEXT_PUBLIC_RESERVOIR_API_BASE

// OPTIONAL
const RESERVOIR_API_KEY = process.env.NEXT_PUBLIC_RESERVOIR_API_KEY
const REDIRECT_HOMEPAGE = process.env.NEXT_PUBLIC_REDIRECT_HOMEPAGE
const META_TITLE = process.env.NEXT_PUBLIC_META_TITLE
const META_DESCRIPTION = process.env.NEXT_PUBLIC_META_DESCRIPTION
const META_IMAGE = process.env.NEXT_PUBLIC_META_OG_IMAGE
const TAGLINE = process.env.NEXT_PUBLIC_TAGLINE
const COLLECTION = process.env.NEXT_PUBLIC_COLLECTION
const COMMUNITY = process.env.NEXT_PUBLIC_COMMUNITY
const COLLECTION_SET_ID = process.env.NEXT_PUBLIC_COLLECTION_SET_ID

type Props = InferGetStaticPropsType<typeof getStaticProps>

const metadata = {
  title: (title: string) => <title>{title}</title>,
  description: (description: string) => (
    <meta name="description" content={description} />
  ),
  tagline: (tagline: string | undefined) => (
    <>{tagline || 'Shop the Bunny Kingdom'}</>
  ),
  image: (image?: string) => {
    if (image) {
      return (
        <>
          <meta name="twitter:image" content={image} />
          <meta name="og:image" content={image} />
        </>
      )
    }
    return null
  },
}

const Home: NextPage<Props> = ({ fallback }) => {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 600px)')
  const router = useRouter()

  const title = META_TITLE && metadata.title(META_TITLE)
  const description = META_DESCRIPTION && metadata.description(META_DESCRIPTION)
  const image = metadata.image(META_IMAGE)
  const tagline = metadata.tagline(TAGLINE)

  useEffect(() => {
    if (REDIRECT_HOMEPAGE && COLLECTION) {
      router.push(`/collections/${COLLECTION}`)
    }
  }, [COLLECTION, REDIRECT_HOMEPAGE])

  // Return error page if the API base url or the environment's
  // chain ID are missing
  if (!CHAIN_ID) {
    console.debug({ CHAIN_ID })
    return <div>There was an error</div>
  }

  if (REDIRECT_HOMEPAGE && COLLECTION) return null

  return (

    <Layout navbar={{}}>
      <Head>
        {title}
        {description}
        {image}
      </Head>
      <header className="col-span-full bg-hunnyslightpurple">
      <img
        className={`h-auto m-auto w-full`}
        alt={`Logo`}
        src={"hunnysHeaderBG.png"}
      />
        <h1 className="reservoir-h1 tagline text-center text-8xl mt-24 mb-8 dark:text-white">{tagline}</h1>
      </header>
      <div className="col-span-full px-6 md:px-16 bg-hunnyslightpurple">

        <div className="mb-9 grid 2xl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-1 gap-2 flex w-full bg-hunnyslightpurple">
          <div className="reservoir-h4 md:flex dark:text-white m-auto">
          <div className="max-w-sm md:shrink-0 rounded m-auto bg-hunnysviolet mt-20 overflow-hidden shadow-xl">
          <img
          className={`w-full md:flex`}
          alt={`Card1`}
          src={"hunnysHeaderBG.png"}
          />
          <div className="px-6 py-4">
          <h1 className="text-center text-4xl mb-2">HUNNYS</h1>
          <p className="text-white text-base">
          Unleash your creativity with Hunnys - the revolutionary digital doll on the Ethereum blockchain. <br></br><br></br><br></br>Collect unique items, customize with over 1 million combinations, & explore The Bunny Kingdom🐰💎.
          </p>
          </div>
          <div className="p-14 vc-button">
          <Link href={"/collections/0x5dfeb75abae11b138a16583e03a2be17740eaded"} legacyBehavior={true}>
            <a className="transition duration-500 ease-in-out border border-hunnysyellow transform hover:-translate-y-1 hover:scale-110 bg-hunnysbutton text-hunnysdarkpurple hover:bg-hunnysyellow font-bold p-5">
                VIEW COLLECTION</a>
          </Link>
          </div>
          <p className="text-white text-base px-6 py-4">
          Ownership benefits include:
          </p>
          <ul className="max-w-md p-6 space-y-1 text-gray-500 list-inside dark:text-gray-400">
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">Access to Hupe Scouts</p>
    </li>
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">Exclusive Merchandise</p>
    </li>
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">Creative Licensing</p>
    </li>
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">Monthly Rewards</p>
    </li>
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">And more!</p>
    </li>
</ul>
          </div>
          </div>
          <div className="reservoir-h4 dark:text-white m-auto">
          <div className="max-w-sm rounded m-auto bg-hunnysviolet mt-20 overflow-hidden shadow-xl">
          <img
          className={`w-full`}
          alt={`Card1`}
          src={"hunnysOGsBG.png"}
          />
          <div className="px-6 py-4">
          <h1 className="text-center text-4xl mb-2">HUNNYS OGs</h1>
          <p className="text-white text-base">
          Hunnys OGs is an exclusive collection of hand-drawn 1/1 avatars created by the artist CryptoStacys.<br></br><br></br>The collection contains the first 100 hand-drawn Hunnys, which inspired the 10k collection, as well as 50 others by gift, commission, and invitation.
          </p>
          </div>
          <div className="p-14 vc-button">
          <Link href={"/collections/0x64bd44df5590cfe4f0395b05fa0e6f096734bb77"} legacyBehavior={true}>
            <a className="transition duration-500 ease-in-out border border-hunnysyellow transform hover:-translate-y-1 hover:scale-110 bg-hunnysbutton text-hunnysdarkpurple hover:bg-hunnysyellow font-bold py-5 px-5">
                VIEW COLLECTION</a>
          </Link>
          </div>
          <p className="text-white text-base px-6 py-4">
          Ownership benefits include:
          </p>
          <ul className="max-w-md p-6 space-y-1 text-gray-500 list-inside dark:text-gray-400">
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">Access to Hupe Scouts</p>
    </li>
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">Exclusive monthly rewards</p>
    </li>
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">Creative Licensing</p>
    </li>
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">Special Discord Access</p>
    </li>
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">And more!</p>
    </li>
</ul>
          </div>
          </div>
          <div className="reservoir-h4 dark:text-white m-auto">
          <div className="max-w-sm rounded m-auto bg-hunnysviolet mt-20 overflow-hidden shadow-xl">
          <img
          className={`w-full`}
          alt={`Card1`}
          src={"hupeScoutsBG.png"}
          />
          <div className="px-6 py-4">
          <h1 className="text-center text-4xl mb-2">HUPE SCOUTS</h1>
          <p className="text-white text-base">
          The Official Hunnys Community-Owned Derivative Brand. This is not a collection run by the Hunnys team.<br></br><br></br>It is run, governed, and maintained by members of the Hunnys community. View the Hunnys Hupe Scouts website for more information.
          </p>
          </div>
          <div className="p-14 vc-button">
          <Link href={"/collections/0x1d595b1b360e2240e85f06bec1d1679d5c005be3"} legacyBehavior={true}>
            <a className="transition duration-500 ease-in-out border border-hunnysyellow transform hover:-translate-y-1 hover:scale-110 bg-hunnysbutton text-hunnysdarkpurple hover:bg-hunnysyellow font-bold py-5 px-5">
                VIEW COLLECTION</a>
          </Link>
          </div>
          <p className="text-white text-base px-6 py-4">
          Ownership benefits include:
          </p>
          <ul className="max-w-md p-6 space-y-1 text-gray-500 list-inside dark:text-gray-400">
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">Commissions of Hunnys derivatives</p>
    </li>
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">Use the Hupe Scouts brand</p>
    </li>
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">Access to our network of other artists</p>
    </li>
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">Regular airdrop rewards</p>
    </li>
    <li className="flex items-center">
        <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        <p className="text-white text-base">And more!</p>
    </li>
</ul>
          </div>
          </div>
        </div>
        <TrendingCollectionTable fallback={fallback} />
      </div>
      <Footer />
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps<{
  fallback: {
    collections: paths['/collections/v5']['get']['responses']['200']['schema']
  }
}> = async () => {
  const options: RequestInit | undefined = {}

  if (RESERVOIR_API_KEY) {
    options.headers = {
      'x-api-key': RESERVOIR_API_KEY,
    }
  }

  const url = new URL('/collections/v5', RESERVOIR_API_BASE)

  let query: paths['/collections/v5']['get']['parameters']['query'] = {
    limit: 20,
    sortBy: '1DayVolume',
    normalizeRoyalties: true,
  }

  if (COLLECTION && !COMMUNITY) query.contract = [COLLECTION]
  if (COMMUNITY) query.community = COMMUNITY
  if (COLLECTION_SET_ID) query.collectionsSetId = COLLECTION_SET_ID

  const href = setParams(url, query)
  const res = await fetch(href, options)

  const collections = (await res.json()) as Props['fallback']['collections']

  return {
    props: {
      fallback: {
        collections,
      },
    },
  }
}
