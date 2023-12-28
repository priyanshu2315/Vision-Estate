import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import SwiperCore from "swiper";
import ListingItem from "../components/ListingItem";
const Home = () => {
  // SwiperCore.use([Autoplay]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  console.log(saleListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  //top
  return (
    <div className="max-w-6xl m-auto">
      <div className="flex flex-col gap-6 py-28 max-w-6xl m-auto px-5">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span> <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Vision Estate will help you find your home fast, easy and comfortable.{" "}
          <br />
          We have a wide range of properties for you to choose from
        </div>
        <Link
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
          to={"/search"}
        >
          Let's get started...
        </Link>
      </div>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._i}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-6xl flex flex-col gap-8 p-3 my-10 m-auto">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div>
              <h2 className="text-2xl text-slate-600 font-semibold">
                Recent Offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline "
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex gap-3 flex-wrap my-4 ">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div>
              <h2 className="text-2xl text-slate-600 font-semibold">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline "
                to={"/search?type=rent"}
              >
                Show more place for rent
              </Link>
            </div>
            <div className="flex gap-3 flex-wrap my-4 ">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div>
              <h2 className="text-2xl text-slate-600 font-semibold">
                Recent Places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline "
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex gap-3 flex-wrap my-4 ">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
