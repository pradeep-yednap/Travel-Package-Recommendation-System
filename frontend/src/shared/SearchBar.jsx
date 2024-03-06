import React, { useRef } from "react";

import "./search-bar.css";
import { Form, FormGroup } from "reactstrap";
import toast from "react-hot-toast"


const SearchBar = ({ onSearch }) => {
    const durationRef = useRef(null);
    const priceRef = useRef(null);

    const searchHandler = async () => {
        const durationValue = durationRef.current.value;
        const priceValue = priceRef.current.value;

        if (durationValue === "" || priceValue === "") {
            return alert("All fields are required!");
        }

        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/travel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    duration: parseInt(durationValue, 10),
                    price: parseInt(priceValue, 10),
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.length === 0) {
                toast.error("No tours available for the specified criteria.");
            } else{
                onSearch(data);
            
            }
            console.log(data)
    
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div lg="12">
            <div className="search__bar">
                <Form className="d-flex align-items-center gap-4" onSubmit={(e) => e.preventDefault()}>
                    
                    <FormGroup className="d-flex gap-3 form__group form__group-fast">
                        <span><i className="ri-map-pin-time-line"></i></span>
                        <div>    
                            <h6>Duration</h6>
                            <input
                                type="number"
                                placeholder="Duration(Days)"
                                ref={durationRef}
                            />
                        </div>
                    </FormGroup>

                   <FormGroup className="d-flex gap-3 form__group form__group-last">
                        <span><i class="ri-wallet-3-fill"></i></span>
                        <div>
                            <h6>Price</h6>
                            <input type="number" placeholder="0" ref={priceRef} />
                        </div>
                    </FormGroup>

                    <span className="search__icon" onClick={searchHandler}>
                        <i className="ri-search-line"></i>
                    </span>
                </Form>
            </div>
        </div>
    );
};

export default SearchBar;
