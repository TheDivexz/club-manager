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
    const [gameStarted,setGameStart] = useState(false);
    // False means Player Two's turn and True means player One's turn
    const [currentTurn, setCurrentTurn] = useState(true);

    const [commentary,setCommentary] = useState<String[]>([]);

    const [winner,setWinner] = useState(0);

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
        setGameStart(true)  
    }
    const getRandomInt = (max: number) => Math.floor(Math.random() * max);

    const randomizePlacements = () => {
        let new_placements = [[0,0],[0,0],[0,0],[0,0],[0,0]]
        for (let i = 0; i < new_placements.length; i++) {
            const rand_val = getRandomInt(4) + ((currentTurn ? 1 : 0) * 4)
            new_placements[i][0] = rand_val
            new_placements[i][1] = rand_val + 1
        }
        setRowMask(new_placements)
    }

    const calcCommentary = (team_one_player_id: number, team_two_player_id: number,attack_success:boolean,did_score:boolean) => {
        const first_player = currentTurn ? teamOneSquad[team_one_player_id].name : teamTwoSquad[team_two_player_id].name
        const second_player = currentTurn ? teamTwoSquad[team_two_player_id].name : teamOneSquad[team_one_player_id].name
        const got_blocked = attack_success ? ' shoots ' : ` shoots and gets blocked by ${second_player}.`
        const missed_shot = attack_success ? (did_score ? ' and scores! ' : ' and misses.') : ''
        const newComment = `${first_player} ${got_blocked} ${missed_shot}`
        setCommentary([newComment,...commentary])
    }

    const scoreing = () => {
        const playing_row = getRandomInt(4)
        const team_one_player_id = teamOnePlayers[playing_row]
        const team_two_player_id = teamTwoPlayers[playing_row]
        let attack_success = false
        let did_score = false
        if (currentTurn) {
            const total = teamOneSquad[team_one_player_id].attack + teamTwoSquad[team_two_player_id].defense
            const actual = getRandomInt(total)
            attack_success = actual <= teamOneSquad[team_one_player_id].attack
            did_score = attack_success && (Math.random() <= (teamOneSquad[team_one_player_id].accuracy/255))
            if(did_score) {
                setTeamOneScore(teamOneScore + 1)
            }
        }
        else {
            const total = teamTwoSquad[team_two_player_id].attack + teamOneSquad[team_one_player_id].defense
            const actual = getRandomInt(total)
            attack_success = actual <= teamTwoSquad[team_two_player_id].attack
            did_score = attack_success && (Math.random() <= (teamTwoSquad[team_two_player_id].accuracy/255))
            if (did_score) {
                setTeamTwoScore(teamTwoScore + 1)
            }
        }
        calcCommentary(team_one_player_id,team_two_player_id,attack_success,did_score)
    }

    const nextTurn = () => {
        if(winner !== 0) {
            return
        }
        randomizePlacements()
        scoreing()
        setCurrentTurn(!currentTurn)
        checkWinner()
    }

    const checkWinner = () => {
        if (teamOneScore >= 21) {
            setWinner(1)
        }
        else if (teamTwoScore >= 21) {
            setWinner(2)
        }
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
                            {/* Makes the table */}
                            {
                                colNumbersArray.map(number => {
                                    return (
                                        number < 5 ? 
                                        (
                                            <div key={number} className="box square-blue">
                                                <p>{ rowMask[row_num][0] == number && teamOnePlayers[1] ? teamOneSquad[teamOnePlayers[row_num]].name : '' }</p>
                                                <p>{ rowMask[row_num][1] == number && teamTwoPlayers[1] ? teamTwoSquad[teamTwoPlayers[row_num]].name : '' }</p>
                                            </div>
                                        )
                                        :
                                        (
                                            <div key={number} className="box square-red">
                                            <p>{ rowMask[row_num][0] == number && teamOnePlayers[1] ? teamOneSquad[teamOnePlayers[row_num]].name : '' }</p>
                                            <p>{ rowMask[row_num][1] == number && teamTwoPlayers[1] ? teamTwoSquad[teamTwoPlayers[row_num]].name : '' }</p>
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
                {
                    winner === 0 ? (
                        gameStarted ?
                        <div>
                            <button className="start-btn" onClick={nextTurn}>NEXT TURN</button>
                        </div>
                        :
                        <button className="start-btn" onClick={simulateSetup}>START</button>
                    ) : (
                        <h1 className="text-center">{winner === 1 ? teamOneName : teamTwoName} WINS!</h1>
                    )
                }
            </div>
            {commentary.map((comment,index) => {return (
                <p key={index} className="comment">{comment}</p>
            )})}
        </div>
    )
}

export default MatchView;