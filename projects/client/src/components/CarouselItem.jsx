export default function CarouselItem (props) {
  return (
    <div tabIndex={-1} id={props.id} className="carousel-item gap-3 flex justify-center items-center w-full">
      {props.src && <img src={props.src} alt={props.alt} className={`${props.imgClass} max-w-[450px]`} />}
      {props.text && <div className="text-center text-3xl font-bold p-10 bg-base-100 rounded-box w-full m-4">
        {props.text}
      </div>}
    </div>
  )
}