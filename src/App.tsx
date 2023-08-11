import { useEffect, useState } from "react";
import SquadView from "./squad_view/squadview";
import MatchView from "./MatchView";
import MainSideBar from "./MainSidebar";
import TeamSelect from "./team_select/TeamSelect";
import './styles/utility.css'
import './styles/app.css'

const App = () => {

    const [currentView, setCurrentView] = useState(0);
    const [playerTeam, setPlayerTeam] = useState(-1);

    const handleCurrentView = (view: number) => {
        setCurrentView(view);
    }

    const handlePlayerTeam = (team: number) => {
        setPlayerTeam(team);
    }

    return (
        <div>
            {
                playerTeam !== -1 ?
                (
                    <div className="h-flex">
                        <div className="border-green"></div>
                        <div className=""><MainSideBar whichView={handleCurrentView}/></div>
                        <div className="">{currentView === 0 ? <SquadView playerTeam={playerTeam}/> : ''}</div>
                        <div className="">{currentView === 1 ? <MatchView teamOne={playerTeam}/> : ''}</div>
                    </div>
                )
                :
                (<TeamSelect whichTeam={handlePlayerTeam}/>)
            }
            
        </div>
    )
}
export default App;