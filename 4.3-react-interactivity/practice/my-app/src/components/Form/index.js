import {useState} from "react";

const sendFromNetworkCall = (data) => console.log(data);

export default function Index() {
  const [form, setForm] = useState({
    myText1: "",
    myText2: "",
    myText3: "",
    myText4: "",
    myText5: ""
  });

  const handleForm = (e) => {
    e.preventDefault();
    sendFromNetworkCall(form);
  };

  const handleMyText = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  return (
    <>
      <h1>Form</h1>
      <form onSubmit={handleForm}>
        <label htmlFor="myText1">Text 1</label>
        <input
          id="myText1"
          type="text"
          name="myText1"
          value={form.myText1}
          onChange={handleMyText}
          required
        />
        <label htmlFor="myText2">Text 2</label>
        <input
          id="myText2"
          type="text"
          name="myText2"
          value={form.myText2}
          onChange={handleMyText}
          required
        />
        <label htmlFor="myText3">Text 3</label>
        <input
          id="myText3"
          type="text"
          name="myText3"
          value={form.myText3}
          onChange={handleMyText}
          required
        />
        <label htmlFor="myText4">Text 4</label>
        <input
          id="myText4"
          type="text"
          name="myText4"
          value={form.myText4}
          onChange={handleMyText}
          required
        />
        <label htmlFor="myText4">Text 5</label>
        <input
          id="myText4"
          type="text"
          name="myText5"
          value={form.myText5}
          onChange={handleMyText}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}