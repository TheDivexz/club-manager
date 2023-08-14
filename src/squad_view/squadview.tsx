import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { playerObject } from "../interfaces/playerObject";
import PlayerCard from "./PlayerCard";
import '../styles/styles.css'

interface SquadViewProps {
    playerTeam: number
}

const SquadView: React.FC<SquadViewProps> = ({playerTeam}) => {

    const [squad,setSquad] = useState<playerObject[]>([]);
    const [teamName,setTeamName] = useState("");
    const [detailedView, setDetailedView] = useState(false)

    async function getSquad() {
        setSquad(await invoke("get_players_in_team", {teamId: playerTeam}));
        setTeamName(await invoke("get_team_name",{teamId: playerTeam}));
    }

    const sortByAttack = () => { setSquad([...squad].sort((a,b) => b.attack - a.attack)) }
    const sortByDefense = () => { setSquad([...squad].sort((a,b) => b.defense - a.defense)) }
    const sortByAccuracy = () => { setSquad([...squad].sort((a,b) => b.accuracy - a.accuracy)) }
    const sortByPass = () => { setSquad([...squad].sort((a,b) => b.pass - a.pass)) }
    const sortBySteal = () => { setSquad([...squad].sort((a,b) => b.steal - a.steal)) }
    const sortByGameSense = () => { setSquad([...squad].sort((a,b) => b.game_sense - a.game_sense)) }
    const sortByEgo = () => { setSquad([...squad].sort((a,b) => b.ego - a.ego)) }

    const sortByAverage = () => {
        setSquad([...squad].sort((a,b) => {
            const a_avg = (a.attack + a.defense + a.accuracy + a.pass + a.steal + a.game_sense - a.ego)/6;
            const b_avg = (b.attack + b.defense + b.accuracy + b.pass + b.steal + b.game_sense - b.ego)/6;
            return b_avg - a_avg;
        }))
    }

    useEffect(() => {
        getSquad();
    },[])

    return (
        <div className="background vw-85">
            <h1 className="team-name">{teamName}</h1>
            <div className="filter-bar">
                <span>Card View: </span>
                <button className="btn-alt btn-small" onClick={() => setDetailedView(false)}>Simplified</button>
                <button className="btn-alt btn-small" onClick={() => setDetailedView(true)}>Detailed</button>
            </div>
            <div className="filter-bar">
                <span>Filter By: </span>
                {
                    detailedView ?
                    (
                        <div>
                            <button className="btn-alt btn-small" onClick={sortByAttack}>Attack</button>
                            <button className="btn-alt btn-small" onClick={sortByDefense}>Defense</button>
                            <button className="btn-alt btn-small" onClick={sortByAccuracy}>Accuracy</button>
                            <button className="btn-alt btn-small" onClick={sortByPass}>Pass</button>
                            <button className="btn-alt btn-small" onClick={sortBySteal}>Steal</button>
                            <button className="btn-alt btn-small" onClick={sortByGameSense}>Game Sense</button>
                            <button className="btn-alt btn-small" onClick={sortByEgo}>Ego</button>
                        </div>
                        
                    ):<button className="btn-alt btn-small" onClick={sortByAverage}>Average</button>
                }
            </div>
            <div className="squad-view">
                {squad.map((member,index) => {        
                    return (
                        <PlayerCard key={index} playerInfo={member} detailed_view={detailedView}/>
                    )
                })}
            </div>
        </div>
    )
}

export default SquadView