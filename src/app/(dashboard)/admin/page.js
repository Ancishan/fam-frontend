"use server";

import AddProduct from "@/component/product/AddProduct";
import AllProduct from "@/component/product/AllProduct";
import ComboProduct from "@/component/product/ComboProduct";



const adminPage = () => {
    return (
        <div>
            <AddProduct></AddProduct>
            <ComboProduct></ComboProduct>
            <AllProduct></AllProduct>
        </div>
    );
};

export default adminPage;