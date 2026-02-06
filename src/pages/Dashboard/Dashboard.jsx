import Header from "../../components/Header/Header";
import Tabs from "../../components/Tabs/Tabs";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import SkeletonItem from "../../components/SkeletonItem/SkeletonItem";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Header variant="dashboard" />

      <main className="dashboard">
        <h1 className="dashboard__title">Projects Dashboard</h1>

        <Tabs tabs={["Working on", "Watching"]} active="Working on" />

        <div className="dashboard__content">
          {/* Working on */}
          <section>
            <p className="dashboard__hint">
              It feels empty, doesn’t it? Start working with Taiga and
              you’ll see here the stories, tasks and issues you are
              working on.
            </p>

            <SkeletonItem />
            <SkeletonItem />
          </section>

          {/* Watching */}
          <section>
            <p className="dashboard__hint">
              Follow user stories, tasks, issues in your projects and
              be notified about their changes :)
            </p>

            <SkeletonItem />
            <SkeletonItem />
          </section>

          {/* New Project */}
          <EmptyCard
            onNewProject={() => navigate("/project/new")}
          />
        </div>
      </main>
    </>
  );
}