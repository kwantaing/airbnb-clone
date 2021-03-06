import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Map from "../components/Map";

const Search = ({ searchResults }) => {
	const router = useRouter();
	const { location, startDate, endDate, noOfGuests } = router.query;

	const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
	const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
	const range = `${formattedStartDate} - ${formattedEndDate}`;
	return (
		<div>
			<Header
				placeholder={`${location} | ${range} | ${noOfGuests} ${
					noOfGuests == 1 ? "guest" : "guests"
				}`}
			/>
			<main className="grid pb-5 pt-5 pl-10 pr-10 xl:grid-cols-5  space-x-2">
				<section className="xl:col-span-3 xl:overflow-scroll xl:scrollbar-hide xl:max-h-[92vh]">
					<p className="text-xs">
						300+ Stays | {range} for {noOfGuests}{" "}
						{noOfGuests == 1 ? "guest" : "guests"}
					</p>
					<h1 className="text-3xl font semibold mt-2 mb-6">
						Stays in {location}
					</h1>
					<div className="hidden lg:inline-flex b-5 mb-5 space-x-3 text-gray-800 whitespace-nowrap">
						<p className="button">Cancellation Flexibilty</p>
						<p className="button">Type of Place</p>
						<p className="button">Price</p>
						<p className="button">Rooms and Beds</p>
						<p className="button">More filters</p>
					</div>
					<div className="flex flex-col">
						{searchResults.map(
							({
								img,
								description,
								lat,
								long,
								location,
								price,
								star,
								title,
								total,
							}) => (
								<InfoCard
									key={img}
									img={img}
									description={description}
									lat={lat}
									long={long}
									location={location}
									price={price}
									star={star}
									title={title}
									total={total}
								/>
							)
						)}
					</div>
				</section>
				<section className="hidden xl:inline-flex xl:min-w-full xl:col-span-2 border shadow-xl xl:max-h-[92vh]">
					<Map searchResults={searchResults} />
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Search;

export async function getServerSideProps(context) {
	const searchResults = await fetch("https://links.papareact.com/isz").then(
		(res) => res.json()
	);
	return {
		props: {
			searchResults,
		},
	};
}
