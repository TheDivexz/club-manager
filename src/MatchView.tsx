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
            <div className="col">
                <div className="row">
                    <div className="box square-blue">{teamOnePlayers[1] ? teamOneSquad[teamOnePlayers[0]].name : ''}</div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red">{teamTwoPlayers[1] ? teamTwoSquad[teamTwoPlayers[0]].name : ''}</div>
                </div>
                <div className="row">
                    <div className="box square-blue">{teamOnePlayers[1] ? teamOneSquad[teamOnePlayers[1]].name : ''}</div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red">{teamTwoPlayers[1] ? teamTwoSquad[teamTwoPlayers[1]].name : ''}</div>
                </div>
                <div className="row">
                    <div className="box square-blue">{teamOnePlayers[2] ? teamOneSquad[teamOnePlayers[2]].name : ''}</div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red">{teamTwoPlayers[2] ? teamTwoSquad[teamTwoPlayers[2]].name : ''}</div>
                </div>
                <div className="row">
                    <div className="box square-blue">{teamOnePlayers[3] ? teamOneSquad[teamOnePlayers[3]].name : ''}</div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red">{teamTwoPlayers[3] ? teamTwoSquad[teamTwoPlayers[3]].name : ''}</div>
                </div>
                <div className="row">
                    <div className="box square-blue">{teamOnePlayers[4] ? teamOneSquad[teamOnePlayers[4]].name : ''}</div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-blue"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red"></div>
                    <div className="box square-red">{teamTwoPlayers[4] ? teamTwoSquad[teamTwoPlayers[4]].name : ''}</div>
                </div>
            </div>
            <h3 className="text-center">{teamOneScore} :: Score :: {teamTwoScore}</h3>
            <div className="justify-center">
                <button className="start-btn" onClick={simulateSetup}>START</button>
            </div>
        </div>
    )
}

export default MatchView;