import About from "./components/home/about/about";
import StatisticsList from "./components/home/statistics/statistics";
import { statistics } from "../lib/options/statistics-options";

export default function Home() {
  return (
    <main>
      <div className="container">
        <About />
        <StatisticsList options={statistics} />
      </div>
    </main>
  );
}
