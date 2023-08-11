import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import './styles/utility.css'
import './styles/team_colors.css'
import './styles/styles.css'
import { teamStyles } from "./interfaces/teamColors";

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
            <div className="v-flex">

                <div className="usc-border margin-bottom-1 padding-half usc-background">
                    <h2 className="text-center usc-text">United States Conference</h2>
                    <div className="h-flex justify-center">

                        <div className="usc-east-border margin-quarter usc-east-background">
                            <h3 className="usc-east-text">USC East</h3>
                            <button 
                                onClick={() => determineTeam(0)} 
                                className="btn width-95" 
                                style={teamStyles[0]}>{allTeams[0]}
                            </button>
                            <button 
                                onClick={() => determineTeam(1)} 
                                className="btn width-95"
                                style={teamStyles[1]}>{allTeams[1]}
                            </button>
                            <button 
                                onClick={() => determineTeam(2)} 
                                className="btn width-95"
                                style={teamStyles[2]}>{allTeams[2]}
                            </button>
                            <button 
                                onClick={() => determineTeam(3)} 
                                className="btn width-95"
                                style={teamStyles[3]}>{allTeams[3]}
                            </button>
                        </div>

                        <div className="usc-north-border margin-quarter usc-north-background">
                            <h3 className="usc-north-text">USC North</h3>
                            <button 
                                onClick={() => determineTeam(4)} 
                                className="btn width-95"
                                style={teamStyles[4]}>{allTeams[4]}
                            </button>
                            <button 
                                onClick={() => determineTeam(5)} 
                                className="btn width-95"
                                style={teamStyles[5]}>{allTeams[5]}
                            </button>
                            <button 
                                onClick={() => determineTeam(6)} 
                                className="btn width-95"
                                style={teamStyles[6]}>{allTeams[6]}
                            </button>
                            <button 
                                onClick={() => determineTeam(7)} 
                                className="btn width-95"
                                style={teamStyles[7]}>{allTeams[7]}
                            </button>
                        </div>

                        <div className="usc-south-border margin-quarter usc-south-background">
                            <h3 className="usc-south-text">USC South</h3>
                            <button 
                                onClick={() => determineTeam(8)} 
                                className="btn width-95"
                                style={teamStyles[8]}>{allTeams[8]}
                            </button>
                            <button 
                                onClick={() => determineTeam(9)} 
                                className="btn width-95"
                                style={teamStyles[9]}>{allTeams[9]}
                            </button>
                            <button 
                                onClick={() => determineTeam(10)} 
                                className="btn width-95"
                                style={teamStyles[10]}>{allTeams[10]}
                            </button>
                            <button 
                                onClick={() => determineTeam(11)} 
                                className="btn width-95"
                                style={teamStyles[11]}>{allTeams[11]}
                            </button>
                        </div>

                        <div className="usc-west-border margin-quarter usc-west-background">
                            <h3 className="usc-west-text">USC West</h3>
                            <button 
                                onClick={() => determineTeam(12)} 
                                className="btn width-95"
                                style={teamStyles[12]}>{allTeams[12]}
                            </button>
                            <button 
                                onClick={() => determineTeam(13)} 
                                className="btn width-95"
                                style={teamStyles[13]}>{allTeams[13]}
                            </button>
                            <button 
                                onClick={() => determineTeam(14)} 
                                className="btn width-95"
                                style={teamStyles[14]}>{allTeams[14]}
                            </button>
                            <button 
                                onClick={() => determineTeam(15)} 
                                className="btn width-95"
                                style={teamStyles[15]}>{allTeams[15]}
                            </button>
                        </div>

                    </div>
                </div>

                <div className="apc-border padding-half apc-background">
                    <h2 className="text-center apc-text">American Patriot Conference</h2>
                    <div className="h-flex justify-center">

                        <div className="apc-east-border margin-quarter apc-east-background">
                            <h3 className="apc-east-text">APC East</h3>
                            <button 
                                onClick={() => determineTeam(16)} 
                                className="btn width-95"
                                style={teamStyles[16]}>{allTeams[16]}
                            </button>
                            <button 
                                onClick={() => determineTeam(17)} 
                                className="btn width-95"
                                style={teamStyles[17]}>{allTeams[17]}
                            </button>
                            <button 
                                onClick={() => determineTeam(18)} 
                                className="btn width-95"
                                style={teamStyles[18]}>{allTeams[18]}
                            </button>
                            <button 
                                onClick={() => determineTeam(19)} 
                                className="btn width-95"
                                style={teamStyles[19]}>{allTeams[19]}
                            </button>
                        </div>

                        <div className="apc-north-border margin-quarter apc-north-background">
                            <h3 className="apc-north-text">APC North</h3>
                            <button 
                                onClick={() => determineTeam(20)} 
                                className="btn width-95"
                                style={teamStyles[20]}>{allTeams[20]}
                            </button>
                            <button 
                                onClick={() => determineTeam(21)} 
                                className="btn width-95"
                                style={teamStyles[10]}>{allTeams[21]}
                            </button>
                            <button 
                                onClick={() => determineTeam(22)} 
                                className="btn width-95"
                                style={teamStyles[22]}>{allTeams[22]}
                            </button>
                            <button 
                                onClick={() => determineTeam(23)} 
                                className="btn width-95"
                                style={teamStyles[23]}>{allTeams[23]}
                            </button>
                        </div>

                        <div className="apc-south-border margin-quarter apc-south-background">
                            <h3 className="apc-south-text">South</h3>
                            <button 
                                onClick={() => determineTeam(24)} 
                                className="btn width-95"
                                style={teamStyles[24]}>{allTeams[24]}
                            </button>
                            <button 
                                onClick={() => determineTeam(25)} 
                                className="btn width-95"
                                style={teamStyles[25]}>{allTeams[25]}
                            </button>
                            <button 
                                onClick={() => determineTeam(26)} 
                                className="btn width-95"
                                style={teamStyles[26]}>{allTeams[26]}
                            </button>
                            <button 
                                onClick={() => determineTeam(27)} 
                                className="btn width-95"
                                style={teamStyles[27]}>{allTeams[27]}
                            </button>
                        </div>

                        <div className="apc-west-border margin-quarter apc-west-background">
                            <h3 className="apc-west-text">West</h3>
                            <button 
                                onClick={() => determineTeam(28)} 
                                className="btn width-95"
                                style={teamStyles[28]}>{allTeams[28]}
                            </button>
                            <button 
                                onClick={() => determineTeam(29)} 
                                className="btn width-95"
                                style={teamStyles[29]}>{allTeams[29]}
                            </button>
                            <button 
                                onClick={() => determineTeam(30)} 
                                className="btn width-95"
                                style={teamStyles[30]}>{allTeams[30]}
                            </button>
                            <button 
                                onClick={() => determineTeam(31)} 
                                className="btn width-95"
                                style={teamStyles[31]}>{allTeams[31]}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamSelect;