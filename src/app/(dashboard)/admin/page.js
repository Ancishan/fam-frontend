"use server";

import AddProduct from "@/component/product/AddProduct";
import AllProduct from "@/component/product/AllProduct";



const adminPage = () => {
    return (
        <div>
            <AddProduct></AddProduct>
            <AllProduct></AllProduct>
        </div>
    );
};

export default adminPage;