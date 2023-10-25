import { useEffect, useState } from "react";
import { playerObject } from "../interfaces/playerObject";
import '../styles/player_card.css'
import '../styles/styles.css'
import { Radar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
  

interface playerObjectProps {
    playerInfo: playerObject,
}

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const PlayerCard: React.FC<playerObjectProps> = ({playerInfo}) => {

    return (
        <Radar data={
            {
                labels: ['Attack','Defense','Accuracy','Pass','Steal','Game Sense','Ego'],
                datasets: [
                    {
                        label: 'Current Skill',
                        data: [
                            Math.round(playerInfo.attack/255.0*100),
                            Math.round(playerInfo.defense/255.0*100),
                            Math.round(playerInfo.accuracy/255.0*100),
                            Math.round(playerInfo.pass/255.0*100),
                            Math.round(playerInfo.steal/255.0*100),
                            Math.round(playerInfo.game_sense/255.0*100),
                            Math.round(playerInfo.ego/255.0*100)
                        ],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Potential Skill',
                        data: [
                            Math.round(playerInfo.max_attack/255.0*100),
                            Math.round(playerInfo.max_defense/255.0*100),
                            Math.round(playerInfo.max_accuracy/255.0*100),
                            Math.round(playerInfo.max_pass/255.0*100),
                            Math.round(playerInfo.max_steal/255.0*100),
                            Math.round(playerInfo.max_game_sense/255.0*100),
                            Math.round(playerInfo.ego/255.0*100)
                        ],
                        backgroundColor: 'rgba(35, 110, 232, 0.2)',
                        borderColor: 'rgba(35, 110, 232, 1)',
                        borderWidth: 1,
                    },
                ],
            }
        }
        />
    )
}

export default PlayerCard;