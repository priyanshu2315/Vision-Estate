import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMesage] = useState("");

  useEffect(() => {
    const fetchlandlord = async () => {
      const res = await fetch(`/api/user/${listing.userRef}`);
      const data = await res.json();
      setLandlord(data);
    };
    fetchlandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex gap-4 flex-col">
          <p>
            Contact <span className="font-semibold">{landlord.username} </span>
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold">Email -</p>
            <h1 className="text-xl  ">{landlord.email}</h1>
          </div>
          <textarea
            placeholder="enter your message here"
            value={message}
            onChange={(e) => setMesage(e.target.value)}
            name="message"
            id="message"
            rows="2"
            className="w-full border p-3 rounded-lg"
          ></textarea>
          <Link
            target="_top"
            className="bg-slate-700 p-3 uppercase text-white hover:opacity-90 text-center rounded-lg"
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
