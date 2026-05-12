import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
    FiArrowLeft,
    FiHeart,
    FiShare2,
    FiStar,
    FiPackage,
    FiTag,
    FiCheckCircle,
    FiAlertCircle,
} from "react-icons/fi";
import AddToCartButton from "@/components/AddToCartButton"; 
import products from "../../../../public/products.json";

const ProductDetailsPage = async ({ params }) => {
    const { id } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) redirect(`/login?callbackUrl=/products/${id}`);

    // const res = await fetch(`${process.env.BETTER_AUTH_URL}/products.json`);
    // const products = await res.json();
    const product = products.find((p) => p.id === parseInt(id));
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <FiAlertCircle className="mx-auto text-error" size={48} />
                    <h2 className="text-2xl font-bold">Product not found</h2>
                    <Link href="/" className="btn btn-primary">
                        <FiArrowLeft size={16} />
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const fullStars = Math.floor(product.rating);
    const hasHalf = product.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    const isLowStock = product.stock > 0 && product.stock <= 10;
    const isOutOfStock = product.stock === 0;

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-base-content/60 hover:text-base-content transition-colors mb-8 group"
                >
                    <FiArrowLeft
                        size={18}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    <span className="text-sm font-medium">Back to Products</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-base-100 rounded-3xl shadow-xl overflow-hidden">
                    <div className="relative bg-base-200">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover min-h-[400px] lg:min-h-[520px]"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="badge badge-primary badge-lg font-semibold gap-1">
                                <FiTag size={12} />
                                {product.category}
                            </span>
                        </div>
                        <button className="absolute top-4 right-4 btn btn-circle btn-sm bg-base-100/80 border-0 shadow-md hover:bg-base-100">
                            <FiHeart size={16} className="text-error" />
                        </button>
                    </div>

                    <div className="p-8 lg:p-10 flex flex-col justify-between gap-6">
                        <div className="space-y-5">
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-primary uppercase tracking-widest">
                                    {product.brand}
                                </p>
                                <h1 className="text-3xl font-bold text-base-content leading-tight">
                                    {product.name}
                                </h1>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-0.5">
                                    {Array.from({ length: fullStars }).map((_, i) => (
                                        <FiStar
                                            key={`full-${i}`}
                                            size={18}
                                            className="text-warning fill-warning"
                                        />
                                    ))}
                                    {hasHalf && (
                                        <FiStar
                                            size={18}
                                            className="text-warning fill-warning opacity-50"
                                        />
                                    )}
                                    {Array.from({ length: emptyStars }).map((_, i) => (
                                        <FiStar
                                            key={`empty-${i}`}
                                            size={18}
                                            className="text-base-content/20"
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-bold text-base-content">
                                    {product.rating}
                                </span>
                                <span className="text-sm text-base-content/50">/ 5.0</span>
                            </div>

                            <p className="text-base-content/70 text-base leading-relaxed">
                                {product.description}
                            </p>

                            <div className="divider my-1" />

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-base-content/40 uppercase tracking-wider mb-1">
                                        Price
                                    </p>
                                    <p className="text-4xl font-extrabold text-base-content">
                                        ${product.price}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-base-content/40 uppercase tracking-wider mb-1">
                                        Availability
                                    </p>
                                    {isOutOfStock ? (
                                        <span className="inline-flex items-center gap-1.5 text-error font-semibold">
                                            <FiAlertCircle size={15} />
                                            Out of Stock
                                        </span>
                                    ) : isLowStock ? (
                                        <span className="inline-flex items-center gap-1.5 text-warning font-semibold">
                                            <FiPackage size={15} />
                                            Only {product.stock} left
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 text-success font-semibold">
                                            <FiCheckCircle size={15} />
                                            In Stock ({product.stock})
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            
                            <AddToCartButton product={product} disabled={isOutOfStock} />
                            <div className="grid grid-cols-2 gap-3">
                                <button className="btn btn-outline gap-2">
                                    <FiHeart size={16} />
                                    Wishlist
                                </button>
                                <button className="btn btn-outline gap-2">
                                    <FiShare2 size={16} />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;