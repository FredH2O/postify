import Header from "./components/Header";
import Posts from "./components/Posts";

function App() {
  return (
    <>
      <Header />
      <main className="bg-slate-700 h-screen">
        <div className="container m-auto">
          <Posts />
        </div>
      </main>
    </>
  );
}

export default App;
