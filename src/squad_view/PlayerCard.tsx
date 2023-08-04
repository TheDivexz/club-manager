import { useEffect, useState } from "react";
import { playerObject } from "../interfaces/playerObject";
import '../styles/player_card.css'

interface playerObjectProps {
    playerInfo: playerObject,
    detailed_view: boolean
}

const PlayerCard: React.FC<playerObjectProps> = ({playerInfo,detailed_view}) => {
    const [attack,setAttack] = useState(0.0);
    const [defense,setDefense] = useState(0.0);
    const [accuracy,setAccuracy] = useState(0.0);
    const [averageScore,setAverageScore] = useState(0)

    // Converts the stats from 1-255 to 1-100
    useEffect(() => {
        let attack_val = Math.round(playerInfo.attack/255.0*100)
        let defense_val = Math.round(playerInfo.defense/255.0*100)
        let acc_val = Math.round(playerInfo.accuracy/255.0*100)
        let avg_val = Math.round((attack_val + defense_val +  acc_val) / 3)
        setAttack(attack_val);
        setDefense(defense_val);
        setAccuracy(acc_val);
        setAverageScore(avg_val)
    },[])

    return (
        <div className="player-card">
            <p className="player-name">{playerInfo.name}</p>
            {/* Detailed View or Simplified View */}
            {
                detailed_view ? 
                (
                    <div className="property-wrap">
                        <p className="property-text">Attack: {attack}</p>
                        <p className="property-text">Defense: {defense}</p>
                        <p className="property-text">Accuracy: {accuracy}</p>
                    </div>
                )
                :
                (
                    <div className="property-wrap">
                        <h1 className="property-text">{averageScore}</h1>
                    </div>
                ) 
            } 
        </div>
    )
}

export default PlayerCard;