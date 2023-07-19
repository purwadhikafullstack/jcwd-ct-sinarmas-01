export default function CarouselItem (props) {
  return (
    <div id={props.id} className="carousel-item flex justify-center items-center w-full">
      <img src={props.src} alt={props.alt} className={`${props.imgClass} max-w-[450px]`} />
    </div>
  )
}