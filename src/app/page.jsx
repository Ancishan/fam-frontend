
import ShowProductt from './showProduct/page';
import Carousel from '@/component/product/Carousel';
import ShowComboProduct from './combo/page';

const HomePage = () => {
  return (
    <div>
      <Carousel></Carousel>
     <ShowProductt></ShowProductt>
     <ShowComboProduct></ShowComboProduct>
    </div>
  );
};

export default HomePage;