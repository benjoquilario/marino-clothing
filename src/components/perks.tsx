import { desc } from "drizzle-orm"
import { FaShippingFast, FaCalendar, FaGift } from "react-icons/fa"
import { FaEarthAsia } from "react-icons/fa6"

const PERKS = [
  {
    title: "Free Shipping",
    description: "Free shipping on all orders over $100",
    icon: <FaShippingFast className="h-10 w-10 text-foreground" />,
  },
  {
    title: "Same day delivery",
    description:
      "We offer a delivery service that has never been done before. Checkout today and receive your products within hours.",
    icon: <FaCalendar className="h-10 w-10 text-foreground" />,
  },
  {
    title: "All year discount",
    description: `Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round`,
    icon: <FaGift className="h-10 w-10 text-foreground" />,
  },
  {
    title: "For the planet",
    description:
      "We’ve pledged 1% of sales to the preservation and restoration of the natural environment.",
    icon: <FaEarthAsia className="h-10 w-10 text-foreground" />,
  },
]

const Perks = () => {
  return (
    <div className="relative overflow-hidden bg-foreground px-4">
      <div className="px-3 pb-12 pt-28 text-white md:pb-20 md:pt-48">
        <h3 className="w-full text-2xl font-bold md:text-3xl lg:text-5xl">
          Final Stock. Up to 50% off.
        </h3>
        <button>Shop the sales</button>
      </div>
      <div className="absolute right-8 top-3 hidden gap-4 lg:flex">
        <div className="relative flex -translate-y-72 flex-col gap-3">
          <img
            className="rounded-lg"
            width={256}
            height={256}
            src="https://down-ph.img.susercontent.com/file/ph-11134207-7qul9-limq9a60efwma8.webp"
          />
          <img
            className="rounded-lg"
            width={256}
            height={256}
            src="https://down-ph.img.susercontent.com/file/ph-11134207-7qul9-limq9a60efwma8.webp"
          />
        </div>
        <div className="flex -translate-y-24 flex-col-reverse gap-3">
          <img
            className="rounded-lg"
            width={256}
            height={256}
            src="https://down-ph.img.susercontent.com/file/ph-11134207-7qul9-limq9a60efwma8.webp"
          />
          <img
            className="rounded-lg"
            width={256}
            height={256}
            src="https://down-ph.img.susercontent.com/file/ph-11134207-7qul9-limq9a60efwma8.webp"
          />
        </div>
      </div>
    </div>
  )
}
export default Perks
