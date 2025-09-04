import React from "react";

const Homepage = () => {
  return (
    <div className="flex flex-col gap-4 p-5 w-fit">
      <h1>
        This is a dummy homepage.Click on the links to go to the following pages
      </h1>
      <section className="flex flex-col text-blue-400 w-fit">
        <a href="/login">Login</a>
        <a href="/dashboard">Dashboard</a>
      </section>
    </div>
  );
};

export default Homepage;
