import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Button } from "antd";
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
        <Button block onClick={() => determineTeam(teamId)}>
            {teamName}
        </Button>
    )
}

export default TeamSelectButton;