import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import '../styles/utility.css'
import '../styles/team_colors.css'
import '../styles/styles.css'
import {Space, Card} from 'antd';
import ConferenceTeams from "./ConferenceTeams";

interface TeamSelectProps { 
    whichTeam: (data: number) => void;
}

const TeamSelect: React.FC<TeamSelectProps> = ({whichTeam}) => {

    const determineTeam = (team: number) => {
        whichTeam(team);
    }

    return (
        <div className="justify-center">
            <h1>Team Select</h1>
            <Space direction="vertical">

                <Card title='United States Conference'>
                    <Space>
                        <ConferenceTeams title='USC East' teamNumber={0} detTeam={determineTeam}/>
                        <ConferenceTeams title='USC North' teamNumber={4} detTeam={determineTeam}/>
                        <ConferenceTeams title='USC South' teamNumber={8} detTeam={determineTeam}/>
                        <ConferenceTeams title='USC West' teamNumber={12} detTeam={determineTeam}/>
                    </Space>
                </Card>

                <Card title='American Patriot Conference'>
                    <Space>
                        <ConferenceTeams title='APC East' teamNumber={16} detTeam={determineTeam}/>
                        <ConferenceTeams title='APC North' teamNumber={20} detTeam={determineTeam}/>
                        <ConferenceTeams title='APC South' teamNumber={24} detTeam={determineTeam}/>
                        <ConferenceTeams title='APC West' teamNumber={28} detTeam={determineTeam}/>
                    </Space>
                </Card>
            </Space>
        </div>
    )
}

export default TeamSelect;