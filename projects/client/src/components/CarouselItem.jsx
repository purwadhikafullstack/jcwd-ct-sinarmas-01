export default function CarouselItem (props) {
  return (
    <div id={props.id} className="carousel-item relative w-full">
      <img src={props.src} alt={props.alt} className={props.imgClass} />
    </div>
  )
}