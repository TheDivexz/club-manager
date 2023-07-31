import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import './styles/utility.css'

interface TeamSelectProps { 
    whichTeam: (data: number) => void;
}

const TeamSelect: React.FC<TeamSelectProps> = ({whichTeam}) => {

    const [allTeams, setAllTeams] = useState<string[]>([])

    async function setTeamNames() {
        setAllTeams(await invoke("get_all_team_names"))
    }

    useEffect(() => {
        setTeamNames();
    },[])

    const determineTeam = (team: number) => {
        whichTeam(team);
    }

    return (
        <div>
            <h1 className="justify-center">Team Select</h1>
            <div className="grid justify-center">
                {allTeams.map((teamName,index) => {
                    return (
                        <div key={index}>
                            <button onClick={() => determineTeam(index)} className="btn-green width-95">{teamName}</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TeamSelect;