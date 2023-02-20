import { FC } from 'react'
import Link from 'next/link'
import { optimizeImage } from 'lib/optmizeImage'
import FormatNativeCrypto from 'components/FormatNativeCrypto'
import usePaginatedCollections from 'hooks/usePaginatedCollections'
import { paths } from '@reservoir0x/reservoir-sdk'
import { formatNumber } from 'lib/numbers'
import { useRouter } from 'next/router'
import { PercentageChange } from './hero/HeroStats'
import { useMediaQuery } from '@react-hookz/web'
import { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'

const FOOTER_ENABLED = process.env.NEXT_PUBLIC_FOOTER_ENABLED == 'true'

type Props = {
  fallback: {
    collections: paths['/collections/v5']['get']['responses']['200']['schema']
  }
}

type Volumes = '1DayVolume' | '7DayVolume' | '30DayVolume'

const TrendingCollectionTable: FC<Props> = ({ fallback }) => {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 600px)')
  const router = useRouter()
  const [expanded, setExpanded] = useState<boolean>(false)

  const { collections, ref } = usePaginatedCollections(
    router,
    fallback.collections
  )

  const shouldInfiniteLoad =
    !FOOTER_ENABLED || (FOOTER_ENABLED && expanded && collections.size < 5)

  const { data } = collections

  const sort = router?.query['sort']?.toString()

  // Reference: https://swr.vercel.app/examples/infinite-loading
  const mappedCollections = data
    ? data.flatMap(({ collections }) => collections)
    : []

  const columns = isSmallDevice
    ? ['Collections', '', 'Current Floor Price']
    : ['Collections', '', 'Current Floor Price']

  return (
    <div className="mb-11 overflow-x-auto overflow-y-hidden">
      <table className="mb-2 min-w-full table-auto">
        <thead>
          <tr>
            {columns.map((item) => (
              <th
                key={item}
                scope="col"
                className="h1 px-6 py-3 text-left dark:text-white"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mappedCollections?.map((collection, index, arr) => {
            const {
              contract,
              tokenHref,
              image,
              name,
              days1,
              days30,
              days7,
              days1Change,
              days7Change,
              days30Change,
              floorSaleChange1Days,
              floorSaleChange7Days,
              floorSaleChange30Days,
              floorPrice,
            } = processCollection(collection)

            if (FOOTER_ENABLED && !expanded && index > 9) {
              return
            }

            return (
              <tr
                key={`${contract}-${index}`}
                ref={
                  index === arr.length - 5 && shouldInfiniteLoad ? ref : null
                }
                className={`${
                  index === arr.length - 1 ||
                  (FOOTER_ENABLED && !expanded && index == 9)
                    ? ''
                    : 'border-b'
                } group h-[88px] border-neutral-300 even:bg-hunnysviolet odd:bg-hunnysdarkpurple dark:border-neutral-600 dark:text-white`}
              >
                {/* COLLECTION */}
                <td className="reservoir-body flex items-center gap-4 whitespace-nowrap px-6 py-4 dark:text-white">
                  <div className="reservoir-h6 mr-6 dark:text-white">
                    {index + 1}
                  </div>
                  <Link href={tokenHref} legacyBehavior={true}>
                    <a className="flex items-center gap-2">
                      <img
                        src={optimizeImage(image, 140)}
                        className="h-[56px] w-[56px] rounded-full object-cover"
                      />
                      <div
                        className={`reservoir-h6 overflow-hidden truncate whitespace-nowrap dark:text-white ${
                          isSmallDevice ? 'max-w-[140px]' : ''
                        }`}
                      >
                        {name}
                      </div>
                    </a>
                  </Link>
                </td>

                {/* SHOP BUTTON */}
                <td className="reservoir-body whitespace-nowrap px-6 py-4 dark:text-white">
                <Link href={tokenHref} legacyBehavior={true}>
                  <a className="transition vc-button duration-500 ease-in-out border border-hunnysyellow transform hover:-translate-y-1 hover:scale-110 bg-hunnysbutton text-hunnysdarkpurple hover:bg-hunnysyellow text-white font-bold py-2 px-4">
                      VIEW COLLECTION
                  </a>
                </Link>
                <div
                  className={`hidden ${
                    isSmallDevice ? 'max-w-[1240px]' : ''
                  }`}
                >
                </div>
                </td>
                {/* FLOOR PRICE */}
                <td className="reservoir-body whitespace-nowrap px-6 py-4 dark:text-white">
                  <FormatNativeCrypto amount={floorPrice} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {FOOTER_ENABLED && expanded && collections.isValidating && (
        <CgSpinner className="mx-auto h-6 w-6 animate-spin" />
      )}

    </div>
  )
}

export default TrendingCollectionTable

function processCollection(
  collection:
    | NonNullable<
        NonNullable<Props['fallback']['collections']>['collections']
      >[0]
    | undefined
) {
  const data = {
    contract: collection?.primaryContract,
    id: collection?.id,
    image: collection?.image,
    name: collection?.name,
    days1: collection?.volume?.['1day'],
    days7: collection?.volume?.['7day'],
    days30: collection?.volume?.['30day'],
    days1Change: collection?.volumeChange?.['1day'],
    days7Change: collection?.volumeChange?.['7day'],
    days30Change: collection?.volumeChange?.['30day'],
    floor1Days: collection?.floorSale?.['1day'],
    floor7Days: collection?.floorSale?.['7day'],
    floor30Days: collection?.floorSale?.['30day'],
    floorSaleChange1Days: collection?.floorSaleChange?.['1day'],
    floorSaleChange7Days: collection?.floorSaleChange?.['7day'],
    floorSaleChange30Days: collection?.floorSaleChange?.['30day'],
    floorPrice: collection?.floorAsk?.price?.amount?.native,
    supply: collection?.tokenCount,
  }

  const tokenHref = `/collections/${data.id}`

  return { ...data, tokenHref }
}
