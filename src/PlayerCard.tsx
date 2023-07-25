import { useEffect, useState } from "react";
import { playerObject } from "./playerObject";
import './styles/player_card.css'

interface playerObjectProps {
    playerInfo: playerObject;
}

const PlayerCard: React.FC<playerObjectProps> = ({playerInfo}) => {
    const [attack,setAttack] = useState(0.0);
    const [defense,setDefense] = useState(0.0);
    const [speed,setSpeed] = useState(0.0);
    const [accuracy,setAccuracy] = useState(0.0);
    const [stamina,setStamina] = useState(0.0);

    // Converts the stats from 1-255 to 1-100
    useEffect(() => {
        setAttack(Math.round(playerInfo.attack/255.0*100));
        setDefense(Math.round(playerInfo.defense/255.0*100));
        setSpeed(Math.round(playerInfo.speed/255.0*100));
        setAccuracy(Math.round(playerInfo.accuracy/255.0*100));
        setStamina(Math.round(playerInfo.stamina/255.0*100));
    },[])

    return (
        <div className="player-card">
            <p className="player-name">{playerInfo.name}</p>
            <div className="property-wrap">
                <p className="property-text">Attack: {attack}</p>
                <p className="property-text">Defense: {defense}</p>
                <p className="property-text">Speed: {speed}</p>
                <p className="property-text">Accuracy: {accuracy}</p>
                <p className="property-text">Stamina: {stamina}</p>
            </div>
        </div>
    )
}

export default PlayerCard;