import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
const InfoCard = ({
	img,
	description,
	lat,
	long,
	location,
	price,
	star,
	title,
	total,
}) => {
	return (
		<div className="flex py-7 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg pr-4 transition duration-200 ease-out first:border-t rounded-b-2xl last:rounded-b-none">
			{/* Left */}
			<div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
				<Image className="rounded-2xl" src={img} layout="fill" objectFit="cover" />
			</div>
			{/* Right */}
			<div className="flex flex-col flex-grow pl-5">
				<div className="flex justify-between">
					<p>{location}</p>
					<HeartIcon className="h-7 cursor-pointer" />
				</div>
				<h4 className="text-xl font-semibold">{title}</h4>
				<div className="border-b w-10 pt-2" />
				<p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>
				<div className="flex justify-between items-end pt-5">
					<p className="flex items-center">
						<StarIcon className="h-5 text-red-400" />
						{star}
					</p>
					<div>
						<p className="text-lg lg:text-2xl font-semibold pb-2">{price}</p>
						<p className="text-right font-extralight">{total}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoCard;
