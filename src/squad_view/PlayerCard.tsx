import { useEffect, useState } from "react";
import { playerObject } from "../interfaces/playerObject";
import '../styles/player_card.css'
import '../styles/styles.css'

interface playerObjectProps {
    playerInfo: playerObject,
    detailed_view: boolean
}

const PlayerCard: React.FC<playerObjectProps> = ({playerInfo,detailed_view}) => {

    return (
        <div className="player-card">
            <p className="player-name">{playerInfo.name}</p>
            {/* Detailed View or Simplified View */}
            {
                detailed_view ? 
                (
                    <div className="property-wrap">
                        <p className="property-text">Attack: {Math.round(playerInfo.attack/255.0*100)}</p>
                        <p className="property-text">Defense: {Math.round(playerInfo.defense/255.0*100)}</p>
                        <p className="property-text">Accuracy: {Math.round(playerInfo.accuracy/255.0*100)}</p>
                        <p className="property-text">Pass: {Math.round(playerInfo.pass/255.0*100)}</p>
                        <p className="property-text">Steal: {Math.round(playerInfo.steal/255.0*100)}</p>
                        <p className="property-text">Game Sense: {Math.round(playerInfo.game_sense/255.0*100)}</p>
                        <p className="property-text">Ego: {Math.round(playerInfo.ego/255.0*100)}</p>
                    </div>
                )
                :
                (
                    <div className="property-wrap">
                        <h1 className="property-text">{
                        Math.round(
                            (Math.round(playerInfo.attack/255.0*100) + 
                            Math.round(playerInfo.defense/255.0*100) + 
                            Math.round(playerInfo.accuracy/255.0*100) + 
                            Math.round(playerInfo.pass/255.0*100) + 
                            Math.round(playerInfo.steal/255.0*100) + 
                            Math.round(playerInfo.game_sense/255.0*100) - 
                            Math.round(playerInfo.ego/255.0*100))/6)
                        }</h1>
                    </div>
                ) 
            } 
        </div>
    )
}

export default PlayerCard;