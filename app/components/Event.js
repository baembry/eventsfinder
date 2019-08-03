import React from 'react';

const Event = ({ eventObj, handleEdit }) => {
  return (
    <tr>
      <td>{eventObj.date}</td>
      <td>{eventObj.description}</td>
      <td>
        <button onClick={() => handleEdit(eventObj.description)}>Edit</button>
      </td>
    </tr>
  );
};

export default Event;
