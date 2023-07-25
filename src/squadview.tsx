import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { playerObject } from "./playerObject";
import PlayerCard from "./PlayerCard";
import './styles/styles.css'

const SquadView = () => {

    const [squad,setSquad] = useState<playerObject[]>([]);
    const [teamName,setTeamName] = useState("");

    async function getSquad() {
        setSquad(await invoke("get_players_in_team", {teamId: 0}));
        setTeamName(await invoke("get_team_name",{teamId: 0}));
    }

    const sortByAttack = () => { setSquad([...squad].sort((a,b) => b.attack - a.attack)) }
    const sortByDefense = () => { setSquad([...squad].sort((a,b) => b.defense - a.defense)) }
    const sortBySpeed = () => { setSquad([...squad].sort((a,b) => b.speed - a.speed)) }
    const sortByAccuracy = () => { setSquad([...squad].sort((a,b) => b.accuracy - a.accuracy)) }
    const sortByStamina = () => { setSquad([...squad].sort((a,b) => b.stamina - a.stamina)) } 

    useEffect(() => {
        getSquad();
    },[])

    return (
        <div className="background">
            <h1 className="team-name">{teamName}</h1>
            <div className="filter-bar">
                <span>Filter By: </span>
                <button className="filter-btn" onClick={sortByAttack}>Attack</button>
                <button className="filter-btn" onClick={sortByDefense}>Defense</button>
                <button className="filter-btn" onClick={sortBySpeed}>Speed</button>
                <button className="filter-btn" onClick={sortByAccuracy}>Accuracy</button>
                <button className="filter-btn" onClick={sortByStamina}>Stamina</button>
            </div>
            <div className="squad-view">
                {squad.map(member => {        
                    return (
                        <PlayerCard key={member.attack+member.defense} playerInfo={member}/>
                    )
                })}
            </div>
        </div>
    )
}

export default SquadView