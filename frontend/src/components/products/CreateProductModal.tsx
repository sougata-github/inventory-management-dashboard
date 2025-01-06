import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateProductMutation } from "@/state/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 } from "uuid";
import * as z from "zod";

const productSchema = z.object({
  productId: z.string(),
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  rating: z.number().min(0).max(5).optional(),
  stockQuantity: z
    .number()
    .int()
    .min(0, "Stock quantity must be a non-negative integer"),
});

const ProductForm = ({
  setIsOpen,
}: {
  setIsOpen: (value: boolean) => void;
}) => {
  const [createProduct] = useCreateProductMutation();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productId: v4(),
      name: "",
      price: 0,
      rating: 0,
      stockQuantity: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    try {
      startTransition(() => {
        createProduct(values)
          .then(() => {
            toast.success("New Product created.");
          })
          .catch(() => {
            toast.error("Error creating product!");
          });
      });
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("There was an error creating product");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-sm"
                  placeholder="Enter product name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-sm"
                  type="number"
                  placeholder="Enter price"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? 0 : parseFloat(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating (Optional)</FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-sm"
                  type="number"
                  placeholder="Enter rating (0-5)"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? 0 : parseFloat(value));
                  }}
                />
              </FormControl>
              <FormDescription>Leave empty if not applicable</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stockQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Quantity</FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-sm"
                  type="number"
                  placeholder="Enter stock quantity"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? 0 : parseInt(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader className="size-4 animate-spin transition-all" />
          ) : (
            "Create Product"
          )}
        </Button>
      </form>
    </Form>
  );
};

const CreateProductModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="size-5" />
          <span>Create New Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new product.
          </DialogDescription>
        </DialogHeader>
        <ProductForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
