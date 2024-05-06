import React from "react";

const users = [
  {
    id: 3,
    name: "محمد",
  },
  {
    id: 2,
    name: "محمد",
  },
];

export default function Home() {
  return (
    <>
      {users.map(user => {
        return (
          <div className="card" key={user.id}>
            <ul>
              <li>id : {user.id}</li>
              <li>name : {user.name}</li>
            </ul>
          </div>
        );
      })}
    </>
  );
}
