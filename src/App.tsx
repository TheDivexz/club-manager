import { useEffect, useState } from "react";
import SquadView from "./squadview";
import MatchView from "./MatchView";
import MainSideBar from "./MainSidebar";
import './styles/utility.css'
import './styles/app.css'

const App = () => {

    const [currentView, setCurrentView] = useState(0);

    const handleCurrentView = (view: number) => {
        setCurrentView(view);
    }
    return (
        <div className="h-flex">
            <div className="border-green"></div>
            <div className=""><MainSideBar whichView={handleCurrentView}/></div>
            <div className="">{currentView === 0 ? <SquadView /> : ''}</div>
            <div className="">{currentView === 1 ? <MatchView /> : ''}</div>
        </div>
    )
}
export default App;