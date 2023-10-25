import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import '../styles/styles.css'
import PlayersTable from "./PlayersTable";

interface SquadViewProps {
    playerTeam: number
}

const SquadView: React.FC<SquadViewProps> = ({playerTeam}) => {

    const [teamName,setTeamName] = useState("");

    async function getSquad() {
        setTeamName(await invoke("get_team_name",{teamId: playerTeam}));
    }

    useEffect(() => {
        getSquad();
    },[])

    return (
        <div className="background vw-85">
            <h1 className="team-name">{teamName}</h1>
            <PlayersTable playerTeam={playerTeam}/>
        </div>
    )
}

export default SquadView