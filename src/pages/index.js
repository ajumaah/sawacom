import Sidebar from "@/components/Home";

function Home({ 
  bookedPhones, 
  repairedPhones, 
  collectedPhones, 
  pendingCollection, 
  phoneModels 
}) {
  return (
    <div>
      <Sidebar 
        bookedPhones={bookedPhones} 
        repairedPhones={repairedPhones} 
        collectedPhones={collectedPhones} 
        pendingCollection={pendingCollection} 
        phoneModels={phoneModels} 
      />
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from your API here
  const bookedPhones = []; // Fetch booked phones
  const repairedPhones = []; // Fetch repaired phones
  const collectedPhones = []; // Fetch collected phones
  const pendingCollection = []; // Fetch pending collection phones
  const phoneModels = []; // Fetch phone models

  return {
    props: {
      bookedPhones,
      repairedPhones,
      collectedPhones,
      pendingCollection,
      phoneModels,
    },
  };
}
export default Home;