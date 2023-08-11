import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import '../styles/utility.css'
import '../styles/team_colors.css'
import '../styles/styles.css'
import { teamStyles } from "../interfaces/teamColors";
import TeamSelectButton from "./TeamSelectButton";

interface TeamSelectProps { 
    whichTeam: (data: number) => void;
}

const TeamSelect: React.FC<TeamSelectProps> = ({whichTeam}) => {

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
                            <TeamSelectButton teamId={0} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={1} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={2} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={3} selectedTeam={determineTeam} />
                        </div>

                        <div className="usc-north-border margin-quarter usc-north-background">
                            <h3 className="usc-north-text">USC North</h3>
                            <TeamSelectButton teamId={4} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={5} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={6} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={7} selectedTeam={determineTeam} />
                        </div>

                        <div className="usc-south-border margin-quarter usc-south-background">
                            <h3 className="usc-south-text">USC South</h3>
                            <TeamSelectButton teamId={8} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={9} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={10} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={11} selectedTeam={determineTeam} />
                        </div>

                        <div className="usc-west-border margin-quarter usc-west-background">
                            <h3 className="usc-west-text">USC West</h3>
                            <TeamSelectButton teamId={12} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={13} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={14} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={15} selectedTeam={determineTeam} />
                        </div>

                    </div>
                </div>

                <div className="apc-border padding-half apc-background">
                    <h2 className="text-center apc-text">American Patriot Conference</h2>
                    <div className="h-flex justify-center">

                        <div className="apc-east-border margin-quarter apc-east-background">
                            <h3 className="apc-east-text">APC East</h3>
                            <TeamSelectButton teamId={16} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={17} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={18} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={19} selectedTeam={determineTeam} />
                        </div>

                        <div className="apc-north-border margin-quarter apc-north-background">
                            <h3 className="apc-north-text">APC North</h3>
                            <TeamSelectButton teamId={20} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={21} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={22} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={23} selectedTeam={determineTeam} />
                        </div>

                        <div className="apc-south-border margin-quarter apc-south-background">
                            <h3 className="apc-south-text">South</h3>
                            <TeamSelectButton teamId={24} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={25} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={26} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={27} selectedTeam={determineTeam} />
                        </div>

                        <div className="apc-west-border margin-quarter apc-west-background">
                            <h3 className="apc-west-text">West</h3>
                            <TeamSelectButton teamId={28} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={29} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={30} selectedTeam={determineTeam} />
                            <TeamSelectButton teamId={31} selectedTeam={determineTeam} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamSelect;