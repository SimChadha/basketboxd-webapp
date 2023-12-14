import React from 'react';

const WikiPage = () => {
  return (
    <div>
      <h1>Wiki Page</h1>
      <img src={require("./uml.png")} alt="UML Diagram" width={800} height={500} />
    </div>
  );
};

export default WikiPage;
