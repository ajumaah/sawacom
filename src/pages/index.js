// import Sidebar from "@/components/Home";


// function Home({ 
//   bookedPhones, 
//   dispatchedPhones,
//   repairedPhones, 
//   collectedPhones, 
//   pendingCollection, 
//   phoneModels 
// }) {
//   return (
//     <div>
  
//       <Sidebar 
//         bookedPhones={bookedPhones} 
//         dispatchedPhones={dispatchedPhones}
//         repairedPhones={repairedPhones} 
//         collectedPhones={collectedPhones} 
//         pendingCollection={pendingCollection} 
//         phoneModels={phoneModels} 
//       />
//     </div>
//   );
// }

// export async function getServerSideProps() {
//   // Fetch data from your API here
//   const bookedPhones = []; // Fetch booked phones
//   const dispatchedPhones = [];
//   const repairedPhones = []; // Fetch repaired phones
//   const collectedPhones = []; // Fetch collected phones
//   const pendingCollection = []; // Fetch pending collection phones
//   const phoneModels = []; // Fetch phone models

//   return {
//     props: {
//       bookedPhones,
//       dispatchedPhones,
//       repairedPhones,
//       collectedPhones,
//       pendingCollection,
//       phoneModels,
//     },
//   };
// }

// export default Home;
import Login from '@/components/Login'
import React from 'react'

const index = () => {
  return (
    <div>
      <Login />
    </div>
  )
}
index.getLayout = (page) => <>{page}</>; // No layout or custom layout
export default index