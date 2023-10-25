import { Progress } from "antd";

interface PlayerStatViewProps {
    current: number,
}

const PlayerStatView: React.FC<PlayerStatViewProps> = ({current}) => {
    return (
        <>
            <Progress percent={Math.round(current/255.0*100)} type="dashboard" format={() => `${Math.round(current/255.0*100)}`} size="small"/>
        </>
    )
}

export default PlayerStatView;