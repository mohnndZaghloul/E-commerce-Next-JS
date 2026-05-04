import { CartProduct_TP } from "@/lib/types";
import Image from "next/image";
import CartController from "./CartController";
import { RatingStars } from "../shop/RatingStars";
import Link from "next/link";

export default function CartCard({ item }: { item: CartProduct_TP }) {
  return (
    <div className="flex gap-4 bg-card border-2 p-4 md:p-6 rounded-xl hover:bg-card transition">
      <div className="relative w-24 md:w-50 md:aspect-square">
        <Image
          src={item.product.images[0]}
          alt={item.product.title}
          fill
          className="w-full h-full object-cover object-center rounded-xl"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-center w-full">
          <Link
            href={`/products/${item.product.id}`}
            className="text-sm md:text-xl capitalize hover:underline">
            {item?.product?.title}
          </Link>
          <p className="font-thin text-nowrap">
            EGP
            <span className="font-semibold text-xl md:text-2xl">
              {" "}
              {item?.product?.price}
            </span>
          </p>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-3 my-4">
          {item?.product?.description}
        </p>
        <div className="flex gap-2 my-2">
          {item?.product?.rating}{" "}
          <RatingStars rating={item?.product?.rating} size={21} />
        </div>
        <CartController item={item} />
      </div>
    </div>
  );
}
