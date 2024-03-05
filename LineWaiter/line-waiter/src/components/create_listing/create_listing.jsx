import { useState } from "react";
import ListingInput from "./create_listing_input";

const Create_Listing = () => {
  const [values, setValues] = useState({
    name: "",
    where: "",
    when: "",
    price: "",
    duration: ""
  });

  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Listing Title",
      label: "title",
      required: true,
    },
    {
      id: 2,
      name: "location",
      type: "text",
      placeholder: "Location",
      label: "location",
      required: true,
    },
    {
      id: 3,
      name: "when",
      type: "text",
      placeholder: "When is the listing?",
      label: "when",
      required: true
    },
    {
      id: 5,
      name: "price",
      type: "text",
      placeholder: "Price",
      label: "price",
      required: true,
    },
    {
      id: 5,
      name: "duration",
      type: "text",
      placeholder: "How long is the line?",
      label: "duration",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Create a Listing</h1>
        {inputs.map((input) => (
          <ListingInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Create_Listing;