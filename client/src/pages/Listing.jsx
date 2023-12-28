import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import "swiper/css/bundle";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const listingId = params.listingId;

    try {
      setLoading(true);
      setError(false);
      const fetchListing = async () => {
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(true);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      };
      fetchListing();
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }, []);
  return (
    <main>
      {loading && <p className="text-center text-2xl my-7">Loading...</p>}
      {error && (
        <p className="text-center text-red-700 text-2xl my-7">
          Something went wrong...
        </p>
      )}
      {listing && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]  "
                  style={{
                    background: `url(${url}) center no-repeat `,
                    margin: "10px",
                    backgroundSize: "contain",
                  }}
                ></div>
                {/* <div className="h-[550px] border flex items-center justify-center m-2">
                  <img
                    src={`${url}`}
                    alt=""
                    className="text-center object-contain h-full w-auto "
                  />
                </div> */}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <FaShare
              className="text-slate-500 hover:cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-6">
            <p className="text-xl sm:text-2xl  font-semibold">
              {listing.name} - ₹{" "}
              {listing.offer
                ? listing.discountedPrice.toLocaleString("en-us")
                : listing.regularPrice.toLocaleString("en-us")}
              {listing.type === "rent" && " /month"}
            </p>
            <p className="flex items-center  gap-2 text-sm mt-6 text-slate-600">
              <FaMapMarkerAlt />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-800 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ₹{+listing.regularPrice - +listing.discountedPrice}
                  <span className="text-sm ml-2">(discount)</span>
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className=" text-green-900 font-semibold flex items-center  gap-4 sm:gap-10 flex-wrap">
              <li className="flex items-center gap-2 whitespace-nowrap">
                {" "}
                <FaBed className="text-lg" />{" "}
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                {" "}
                <FaBath className="text-lg" />{" "}
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                {" "}
                <FaParking className="text-lg" />{" "}
                {listing.parking ? "Parking" : "No Parking"}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap">
                {" "}
                <FaChair className="text-lg" />{" "}
                {listing.furnished ? "Furnished" : "Not Furnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 p-3"
              >
                Contact Landloard
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
