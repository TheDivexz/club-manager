import { useEffect, useState } from "react";
import SquadView from "./squad_view/squadview";
import MatchView from "./MatchView";
import MainSideBar from "./MainSidebar";
import TeamSelect from "./team_select/TeamSelect";
import './styles/utility.css'
import './styles/app.css'
import CalenderView from "./Calender/CalenderView";

const App = () => {

    const [currentView, setCurrentView] = useState(0);
    const [playerTeam, setPlayerTeam] = useState(-1);
    const [opponentTeam, setOpponentTeam] = useState(-1);

    const handleCurrentView = (view: number) => {
        setCurrentView(view);
    }

    const handlePlayerTeam = (team: number) => {
        setPlayerTeam(team);
    }

    useEffect(() => {
        setOpponentTeam(Math.floor(Math.random() * 32));
    }, [playerTeam]);




    return (
        <div>
            {
                playerTeam !== -1 ?
                (
                    <div className="h-flex">
                        <MainSideBar whichView={handleCurrentView}/>
                        {currentView === 0 ? <SquadView playerTeam={playerTeam}/> : ''}
                        {currentView === 1 ? <MatchView teamOne={playerTeam} teamTwo={opponentTeam}/> : ''}
                        {currentView === 2 ? <CalenderView/> : ''}
                    </div>
                )
                :
                (<TeamSelect whichTeam={handlePlayerTeam}/>)
            }
            
        </div>
    )
}
export default App;