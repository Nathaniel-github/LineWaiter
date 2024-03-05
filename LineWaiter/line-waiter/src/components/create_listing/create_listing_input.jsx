import "./create_listing_input.css"

import { useState } from "react";
import "./create_listing_input.css";

const ListingInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { title, location, when, price, duration, id, label, ...inputProps } = props;


  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
      />
    </div>
  );
};

export default ListingInput;