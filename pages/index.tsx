import type { NextPage } from "next";
import HomeWrapper from "../components/HomeWrapper";

const Home: NextPage = () => {
  return (
    <div className="container mx-auto h-full flex flex-col items-center justify-center w-full">
      <HomeWrapper />
    </div>
  );
};

export default Home;
