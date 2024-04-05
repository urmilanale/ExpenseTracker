import TopHeader from "./navigation-items/TopHeader";
import "./index.css";
import MainView from "./components/MainView";
import Categories from "./components/Categories";
export default function App() {
  return (
    <div className="app-container dflex">
      <div className="left-side-navigation">
        <Categories />
      </div>
      <div className="right-side-display">
        <TopHeader />
        <MainView />
      </div>
    </div>
  );
}
