import { Hero } from "react-daisyui";

export default function Home() {
  return (
    <Hero className='mb-80'>
      <Hero.Overlay className='bg-base-300' />
      <Hero.Content className='text-center p-4'>
        <div className='text-2xl'>Let's go shopping</div>
      </Hero.Content>
    </Hero>
  );
}
