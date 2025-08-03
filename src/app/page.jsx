
import ShowProductt from './showProduct/page';
import Carousel from '@/component/product/Carousel';
import ShowComboProduct from './combo/page';
// import TitleSection from '@/component/product/TitleSection';

const HomePage = () => {
  return (
    <div>
      {/* <TitleSection></TitleSection> */}
      <Carousel></Carousel>
     <ShowProductt></ShowProductt>
     {/* <ShowComboProduct></ShowComboProduct> */}
    </div>
  );
};

export default HomePage;