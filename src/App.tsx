import { useEffect, useState } from "react";
import SquadView from "./squad_view/squadview";
import MatchView from "./MatchView";
import MainSideBar from "./MainSidebar";
import TeamSelect from "./team_select/TeamSelect";
import './styles/utility.css'
import './styles/app.css'
import { teamStyles } from "./interfaces/teamColors";
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
                        <div style={teamStyles[playerTeam]} className="border-primary"></div>
                        <div style={teamStyles[playerTeam]}><MainSideBar whichView={handleCurrentView}/></div>
                        <div style={teamStyles[playerTeam]}>{currentView === 0 ? <SquadView playerTeam={playerTeam}/> : ''}</div>
                        <div style={teamStyles[playerTeam]}>{currentView === 1 ? <MatchView teamOne={playerTeam} teamTwo={opponentTeam}/> : ''}</div>
                        <div style={teamStyles[playerTeam]}>{currentView === 2 ? <CalenderView/> : ''}</div>
                    </div>
                )
                :
                (<TeamSelect whichTeam={handlePlayerTeam}/>)
            }
            
        </div>
    )
}
export default App;