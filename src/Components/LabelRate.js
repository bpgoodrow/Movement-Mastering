import React, {useEffect, useState} from "react";


const LabelRate = () => {

  const [labelRate, setLabelRate] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `you clicked ${count} times`;
  })

  const handleSubmit = event => {
    console.log('handle sumbit ran');
    event.preventDefault();
    alert(labelRate);
  };

  return(
    <div>
      <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
      <h1>Label Rate</h1>
      <p>More Money</p>
      <p>{handleSubmit}</p>
      <form onSubmit={handleSubmit}>
        <input
          id="label_rate"
          name="label_rate"
          type="text"
          onChange={event => setLabelRate(event.target.value)}
          value={labelRate}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LabelRate;