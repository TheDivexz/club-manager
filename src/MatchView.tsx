import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import './styles/match_view.css'
import { playerObject } from "./playerObject";

const MatchView = () => {

    const [teamOneName,setTeamOneName] = useState("");
    const [teamOneSquad,setTeamOneSquad] = useState<playerObject[]>([]);

    const [teamTwoName,setTeamTwoName] = useState("");
    const [teamTwoSquad,setTeamTwoSquad] = useState<playerObject[]>([]);

    const [teamOneScore,setTeamOneScore] = useState(0);
    const [teamTwoScore,setTeamTwoScore] = useState(0);

    const [teamOnePlayers,setTeamOnePlayers] = useState<number[]>([]);
    const [teamTwoPlayers,setTeamTwoPlayers] = useState<number[]>([]);

    const [rowMask,setRowMask] = useState<number[][]>([[0,9],[0,9],[0,9],[0,9],[0,9]])

    const colNumbersArray = Array.from({ length: 10 }, (_, index) => index);
    const rowNumbersArray = Array.from({ length: 5 }, (_, index) => index);

    async function setTeamNames() {
        setTeamOneName(await invoke("get_team_name",{teamId: 0}));
        setTeamTwoName(await invoke("get_team_name",{teamId: 1}));
    }

    async function setSquads() {
        setTeamOneSquad(await invoke("get_players_in_team", {teamId: 0}));
        setTeamTwoSquad(await invoke("get_players_in_team", {teamId: 1}));
    }

    useEffect(() => {
        setSquads();
        setTeamNames();
    },[])

    const simulateSetup = () => {
        setTeamOnePlayers([])
        setTeamTwoPlayers([])
        teamOneSquad.map((member,index) => {     
            if(member.starter) {
                setTeamOnePlayers(oldArray => [...oldArray,index])
            }
        })

        teamTwoSquad.map((member,index) => {     
            if(member.starter) {
                setTeamTwoPlayers(oldArray => [...oldArray,index])
            }
        })   
    }

    return (
        <div className="match-view background">
            <span className="title-bar">
                <h2 className="blue-text">{teamOneName}</h2>
                <h2 className="red-text">{teamTwoName}</h2>
            </span>
            {/* Generates the game board */}
            {
                rowNumbersArray.map(row_num => {
                    return (
                        <div key={row_num} className="row">
                            {
                                colNumbersArray.map(number => {
                                    return (
                                        number < 5 ? 
                                        (
                                            <div key={number} className="box square-blue">
                                                { rowMask[row_num][0] == number && teamOnePlayers[1] ? teamOneSquad[teamOnePlayers[row_num]].name : '' }
                                                { rowMask[row_num][1] == number && teamTwoPlayers[1] ? teamTwoSquad[teamTwoPlayers[row_num]].name : '' }
                                            </div>
                                        )
                                        :
                                        (
                                            <div key={number} className="box square-red">
                                                { rowMask[row_num][0] == number && teamOnePlayers[1] ? teamOneSquad[teamOnePlayers[row_num]].name : '' }
                                                { rowMask[row_num][1] == number && teamTwoPlayers[1] ? teamTwoSquad[teamTwoPlayers[row_num]].name : '' }
                                            </div>
                                        )
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            <h3 className="text-center">{teamOneScore} :: Score :: {teamTwoScore}</h3>
            <div className="justify-center">
                <button className="start-btn" onClick={simulateSetup}>START</button>
            </div>
        </div>
    )
}

export default MatchView;