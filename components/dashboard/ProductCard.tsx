"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product_TP } from "@/lib/types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../shop/AddToCartButton";
import { RatingStars } from "../shop/RatingStars";
import FavoriteButton from "../shop/FavoriteButton";

export default function ProductCard({
  product,
  isLoggedIn,
  isShopping = true,
  isFavorite = false,
}: {
  product: Product_TP;
  isLoggedIn: boolean;
  isShopping?: boolean;
  isFavorite?: boolean;
}) {
  return (
    <div className="aspect-5/6 flex flex-col shadow-2xl shadow-card-shadow border rounded-xl overflow-hidden">
      <div className="relative h-1/2 overflow-hidden flex justify-center items-center bg-card">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="bg-muted w-fit! object-cover mx-auto hover:scale-105 transition"
        />
        <FavoriteButton
          productId={product.id}
          isFavorite={isFavorite}
          isLoggedIn={isLoggedIn}
        />
        <span className="absolute right-0 bottom-0 bg-muted p-2 font-semibold text-lg">
          {product.price} EGP
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-center p-2 border-y group hover:bg-muted transition">
          <Link
            href={`/products/${product.id}`}
            className="capitalize cursor-pointer w-full group-hover:text-primary font-semibold line-clamp-1">
            {product.title}
          </Link>
          <Badge
            className={`${product.rating >= 4 ? "bg-primary" : product.rating < 4 && product.rating >= 3 ? "bg-amber-300" : product.rating < 3 && product.rating >= 2 ? "bg-amber-500" : "bg-destructive"}`}>
            {product.rating} <Star className="fill-white" />
          </Badge>
        </div>
        <div className="flex-1 flex flex-col justify-between p-2">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {product.description}
          </p>
          <div
            className={`flex py-1 gap-1 ${product?.rating! >= 4 ? "text-primary" : product?.rating! < 4 && product?.rating! >= 3 ? "text-amber-300" : product?.rating! < 3 && product?.rating! >= 2 ? "text-amber-500" : "text-destructive"}`}>
            {product?.rating.toFixed(1)}
            <RatingStars rating={product.rating} size={21} />
          </div>
        </div>
        <div className="bg-muted border-t p-3">
          {isShopping ? (
            <AddToCartButton
              productId={product.id}
              isLoggedIn={isLoggedIn}
              className="w-full capitalize cursor-pointer"
            />
          ) : (
            <Button
              variant="outline"
              className="w-full capitalize cursor-pointer"
              nativeButton={false}
              render={
                <Link href={`./dashboard/products/${product.id}`}>edit</Link>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
