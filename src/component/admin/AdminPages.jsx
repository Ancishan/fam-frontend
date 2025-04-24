"use server";
import Link from "next/link";

const AdminPages = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap gap-4 mb-8">
          <Link href="/admin/producttt">
            <p className="p-4 border-2 border-transparent hover:border-blue-500 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white cursor-pointer">
              Add Product
            </p>
          </Link>
          <Link href="/admin/combop">
            <p className="p-4 border-2 border-transparent hover:border-green-500 rounded-lg transition-all duration-300 hover:bg-green-500 hover:text-white cursor-pointer">
              Add Combo Product
            </p>
          </Link>
          <Link href="/admin/banner">
            <p className="p-4 border-2 border-transparent hover:border-yellow-500 rounded-lg transition-all duration-300 hover:bg-yellow-500 hover:text-white cursor-pointer">
              Add Banner
            </p>
          </Link>
        </div>

        
      </div>
    </div>
  );
};

export default AdminPages;
