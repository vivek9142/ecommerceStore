import { formatCurrency } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

type ProductCardProps = {
  id: string;
  name: string;
  imagePath: string;
  priceInCents: number;
  description: string;
};

export default function ProductCard({
  id,
  name,
  imagePath,
  priceInCents,
  description,
}: ProductCardProps) {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video">
        <Image
          unoptimized // for image caching, else error
          src={imagePath}
          fill
          alt={name}
        ></Image>
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex overflow-hidden flex-col animate-pulse">
      <div className="w-full h-auto aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <span className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button disabled size="lg" className="w-full"></Button>
      </CardFooter>
    </Card>
  );
}
