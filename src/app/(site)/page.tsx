import ProductList from '@/components/products/product-lists';
// import sampleData from '@/lib/seeder';
import { getLatestProducts } from '@/server/product';

export default async function Home() {
  const latestProducts = await getLatestProducts();

  return (
    <div className="space-y-8">
      <h2 className="h2-bold">Latest Products</h2>
      <ProductList data={latestProducts} />
    </div>
  );
}
