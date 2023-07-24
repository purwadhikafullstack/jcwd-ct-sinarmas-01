import { getCategories } from "@/api/common";
import CarouselItem from "@/components/CarouselItem";
import Promotional from "@/components/Promotional";
import { useEffect, useState } from "react";
import { Button, Hero } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { getRole } from "@/api/token";

export default function Home() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const link = getRole() || "login";
  useEffect(() => {
    (async () => {
      const categories = await getCategories(0);
      setData(categories);
    })();
  }, []);
  return (
    <>
      <Hero className="mb-10">
        <Hero.Overlay className="bg-base-300" />
        <Hero.Content className="text-center flex justify-center items-center flex-col gap-3 p-4">
          <div className="text-2xl mb-6">Let's go shopping</div>
          <Button onClick={() => navigate(link)}>
            Start Shopping
          </Button>
        </Hero.Content>
      </Hero>
      <Promotional />
      <div className="text-3xl font-extrabold mt-4">Categories</div>
      <div className="carousel my-6 bg-base-300 p-5 carousel-center">
        {data.rows?.map((val, key) => (
          <CarouselItem onClick={() => navigate(link)} text={val.category_name} key={key} />
        ))}
      </div>
    </>
  );
}
