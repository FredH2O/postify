import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";
import Posts from "./components/Posts";

function App() {
  return (
    <>
      <Header />
      <main className="bg-slate-700 h-auto">
        <div className="container m-auto py-5">
          <Form />
          <Posts />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
