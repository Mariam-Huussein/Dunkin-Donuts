import OfferCard from "./OfferCard";
import offersItems from "../../../../data/offer.json";
import { Link } from "react-router-dom";

const OfferList = () => {
  return (
    <div className="offer-container bg-light min-vh-100 py-5">
      <div className="text-center mb-5">
        <h1 className="title">MEMBER EXCLUSIVE OFFERS</h1>
        <p className="text-muted">
          Discover our most popular items, crafted with love and the finest
          ingredients
        </p>
      </div>

      {offersItems && offersItems.length > 0 ? (
        <div className="offers-grid row-gap-3 row-gap-lg-0">
          {offersItems.map((item, index) => (
            <OfferCard key={item.id || `offer-${index}`} product={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-5 w-100">
          <p className="text-muted">No items found.</p>
        </div>
      )}
      <div className="text-center mt-4">
        <Link to={"/menu"} className="my-btn my-btn-outline">
          View Full Menu
        </Link>
      </div>
    </div>
  );
};

export default OfferList;