import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // ✅ original data
  const [searchItem, setSearchItem] = useState("");
  useEffect(()=>{
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then((data) =>{
        setProducts(data);
        setAllProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  },[])
  const ItemSearch= ()=>{
    if (searchItem.trim() === "") {
      setProducts(allProducts); // reset if empty search
      return;
    }

    const filteredProducts = allProducts.filter(product =>
      product.title.toLowerCase().includes(searchItem.toLowerCase())
    );

    if (filteredProducts.length === 0) {
      alert("No items found");
    }

    setProducts(filteredProducts);
  };
  return (
    <div className="flex flex-col min-h-screen">
    
      <Navbar />
      <main className="mt-10">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 ">Products</h1>
          <div className=" flex p-2 justify-between  align-center">
            <div className="flex w-[80%]">
              <input placeholder="Search Items" className="border-2 border-gray-300 rounded-md p-2  w-[50%]"
              value={searchItem}
              onChange={(e)=> setSearchItem(e.target.value)}/>
              <button className="border-2 border-gray-300 ml-2 p-2 rounded-md" onClick={ItemSearch}>Search</button>
            </div>
          
          <button className="border-2 border-gray-300 w-[10%]">Filter</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product)=>(
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
export default Home
