import { useEffect, useState } from "react";
import { teamStyles } from "../interfaces/teamColors";
import { invoke } from "@tauri-apps/api/tauri";
import '../styles/styles.css'

interface TeamSelectButtonProps {
    teamId: number;
    selectedTeam: (data: number) => void;
}

const TeamSelectButton: React.FC<TeamSelectButtonProps> = ({teamId,selectedTeam}) => {
    const [teamName, setTeamName] = useState<string>("");

    const determineTeam = (teamId: number) => {
        selectedTeam(teamId);
    }

    async function getTeamName() {
        setTeamName(await invoke("get_team_name",{teamId: teamId}))
    }

    useEffect(() => {
        getTeamName();
    },[])

    return(
        <button 
            onClick={() => determineTeam(teamId)} 
            className="btn width-95" 
            style={teamStyles[teamId]}>{teamName}
        </button>
    )
}

export default TeamSelectButton;