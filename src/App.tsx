import { useEffect, useState } from "react";
import SquadView from "./squadview";
import MatchView from "./MatchView";
import MainSideBar from "./MainSidebar";
import './styles/utility.css'

const App = () => {

    const [currentView, setCurrentView] = useState(0);

    const handleCurrentView = (view: number) => {
        setCurrentView(view);
    }
    return (
        <div className="h-flex">
            <div className="main-sidebar"><MainSideBar whichView={handleCurrentView}/></div>
            {currentView === 0 ? <SquadView /> : ''}
            {currentView === 1 ? <MatchView /> : ''}
        </div>
    )
}
export default App;