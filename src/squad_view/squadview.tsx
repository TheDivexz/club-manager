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
    const sortBySpeed = () => { setSquad([...squad].sort((a,b) => b.speed - a.speed)) }
    const sortByAccuracy = () => { setSquad([...squad].sort((a,b) => b.accuracy - a.accuracy)) }
    const sortByStamina = () => { setSquad([...squad].sort((a,b) => b.stamina - a.stamina)) } 
    const sortByAverage = () => {
        setSquad([...squad].sort((a,b) => {
            const a_avg = (a.attack + a.defense + a.speed + a.accuracy + a.stamina)/5
            const b_avg = (b.attack + b.defense + b.speed + b.accuracy + b.stamina)/5
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
                <button className="filter-btn" onClick={() => setDetailedView(false)}>Simplified</button>
                <button className="filter-btn" onClick={() => setDetailedView(true)}>Detailed</button>
            </div>
            <div className="filter-bar">
                <span>Filter By: </span>
                <button className="filter-btn" onClick={sortByAttack}>Attack</button>
                <button className="filter-btn" onClick={sortByDefense}>Defense</button>
                <button className="filter-btn" onClick={sortBySpeed}>Speed</button>
                <button className="filter-btn" onClick={sortByAccuracy}>Accuracy</button>
                <button className="filter-btn" onClick={sortByStamina}>Stamina</button>
                <button className="filter-btn" onClick={sortByAverage}>Average</button>
            </div>
            <div className="squad-view">
                {squad.map(member => {        
                    return (
                        <PlayerCard key={member.attack + member.defense} playerInfo={member} detailed_view={detailedView}/>
                    )
                })}
            </div>
        </div>
    )
}

export default SquadView