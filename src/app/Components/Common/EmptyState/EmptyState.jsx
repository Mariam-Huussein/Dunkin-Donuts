import { Link } from "react-router-dom";

export default function EmptyState({ title, imgPath }) {
  return (
    <div className="empty-cart text-center d-flex flex-column align-items-center mt-2 mb-2">
      <h2 className="title hero-title fs-1 mb-4">{title}</h2>
      <h1 className="title hero-title fs-2 ">No Item To Show</h1>
      
      <img
        src={imgPath}
        alt="Empty"
        className="empty-cart-img mb-4"
        style={{ maxWidth: "300px", width: "100%" }} 
      />
      
      <Link to="/menu" className="my-btn my-btn-primary fs-5">
        Back To Menu
      </Link>
    </div>
  );
}