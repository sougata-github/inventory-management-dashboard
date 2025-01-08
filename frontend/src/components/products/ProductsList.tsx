import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag, Star } from "lucide-react";
import { Product } from "@/types";

interface Props {
  productId?: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

const ProductCard = ({ name, price, rating, stockQuantity }: Props) => {
  return (
    <Card className="text-center">
      <CardHeader className="flex flex-col items-center gap-2">
        <div>
          {/* image */}
          <ShoppingBag className="size-5" />
        </div>

        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <p>${price.toFixed(2)}</p>
        <div className="text-sm text-muted-foreground mt-1">
          Stock: {stockQuantity}
        </div>
      </CardContent>
      {rating && (
        <CardFooter className="flex items-center mt-2 gap-1 justify-center text-muted-foreground">
          <Star className="size-4" /> <span className="text-sm">{rating}</span>
        </CardFooter>
      )}
    </Card>
  );
};

const ProductsList = ({ data }: { data: Product[] }) => {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
      {data.map((product) => (
        <ProductCard key={product.productId} {...product} />
      ))}
    </div>
  );
};

export default ProductsList;