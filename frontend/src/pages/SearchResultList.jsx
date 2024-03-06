import React ,{ useContext }from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import roundRating from "../utils/ratings";
import { AuthContext } from "../context/AuthContext"; 

const SearchResultList = ({ searchResults }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!Array.isArray(searchResults) || searchResults.length === 0) {
    return <div className="text-center">No results found.</div>;
  }
  
   const handleBookingClick = (tour) => {
    if (!user) {
      navigate("/login"); // Redirect to login page if not logged in
    } else {
        navigate("/book", { state: { tour } });
    }
  };

  return (
    <div className="flex gap-1">
      {searchResults.map((result, index) => (
        <div key={index} className="w-full md:w-1/4 lg:w-1/4 p-2 ">
          <Card>
            <div className="tour__img">
              <img src="tour-images/tour.jpg" alt="tour" />
            </div>
            <CardBody>
              <h5 className="tour__title mt-2">
                <span>{result.Destination} </span>
              </h5>
              <div className="tour__details">
                <span className="tour__location d-flex align-items-center gap-1">
                  <i className="ri-map-pin-line"></i>
                  {result.Travel_Company} 
                </span>
                <span className="tour__duration d-flex align-items-center gap-1">
                  <i className="ri-time-line"></i>
                  {result.Duration} days
                </span>
                <span className="tour__rating d-flex align-items-center gap-1">
                  <i className="ri-star-fill" style={{ color: 'green' }}></i>
                  {roundRating(result.PredictedRating)} / 5
                </span>
              </div>
              <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                <h5>
                  Rs. {result.Price} <span> /per person</span>
                </h5>
                <button className="booking__btn bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded" onClick={() =>handleBookingClick(result)}>
                  <Link to="#" className="text-white no-underline"> Book Now</Link>
                </button>
              </div>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SearchResultList;
