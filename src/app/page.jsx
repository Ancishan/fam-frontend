
import ShowProductt from './showProduct/page';
import Carousel from '@/component/product/Carousel';
// import ShowComboProduct from './combo/page';
// import SearchProduct from '@/component/searchProduct/SearchProduct';
// import TitleSection from '@/component/product/TitleSection';

const HomePage = () => {
  return (
    <div>
      {/* <SearchProduct></SearchProduct> */}
      {/* <TitleSection></TitleSection> */}
      <Carousel></Carousel>
     <ShowProductt></ShowProductt>
     {/* <ShowComboProduct></ShowComboProduct> */}
    </div>
  );
};

export default HomePage;