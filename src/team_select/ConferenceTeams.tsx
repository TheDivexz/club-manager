import { useEffect, useState } from "react";
import TeamSelectButton from "./TeamSelectButton";
import {Space,Card} from 'antd';

interface ConferenceTeamsProps {
    title: String,
    teamNumber: number
    detTeam: (data: number) => void;
}

const ConferenceTeams: React.FC<ConferenceTeamsProps> = ({title,teamNumber,detTeam}) => {

    const whichTeam = (team: number) => {
        detTeam(team);
    }

    return(
        <Card title={title} type="inner">
            <Space direction="vertical" style={{ width: '100%' }}>
                <TeamSelectButton teamId={teamNumber} selectedTeam={whichTeam} />
                <TeamSelectButton teamId={teamNumber+1} selectedTeam={whichTeam} />
                <TeamSelectButton teamId={teamNumber+2} selectedTeam={whichTeam} />
                <TeamSelectButton teamId={teamNumber+3} selectedTeam={whichTeam} />
            </Space>
        </Card>
    )
}

export default ConferenceTeams;