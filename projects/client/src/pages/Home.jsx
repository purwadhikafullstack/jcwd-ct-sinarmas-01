import { getCategories } from "@/api/common";
import CarouselItem from "@/components/CarouselItem";
import Promotional from "@/components/Promotional";
import { useEffect, useState } from "react";
import { Hero } from "react-daisyui";

export default function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const categories = await getCategories(0);
      setData(categories);
    })();
  }, []);
  return (
    <>
      <Hero className='mb-10'>
        <Hero.Overlay className='bg-base-300' />
        <Hero.Content className='text-center p-4'>
          <div className='text-2xl'>Let's go shopping</div>
        </Hero.Content>
      </Hero>
      <Promotional />
      <div className="text-3xl font-extrabold mt-4">
        Categories
      </div>
      <div className="carousel my-6 bg-base-300 p-5 carousel-center">
        {data.rows?.map((val, key) => (
          <CarouselItem text={val.category_name} key={key} />
        ))}
      </div>
    </>
  );
}
