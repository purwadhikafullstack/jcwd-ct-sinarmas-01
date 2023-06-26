import { useRef, useState } from "react"
import { FileInput } from "react-daisyui";

export default function ImgPreview () {
	const [src, setSrc] = useState("");
	const fileRef = useRef();
	return (
		<>
			<FileInput 
				onChange={(e) => setSrc(URL.createObjectURL(e.target.files[0]))} 
				className="hidden"
				ref={fileRef} />
			<img 
				className="max-w-[500px] max-h-[300px]" 
				onClick={() => console.log(fileRef.current)}
				src={src}
			/>
		</>
	)
}