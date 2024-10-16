import Login from "@/components/Login";

function Home() {
  return <Login />;
}
Home.getLayout = (page) => <>{page}</>; // No layout or custom layout
export default Home;
