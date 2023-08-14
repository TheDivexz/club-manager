import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import './styles/match_view.css'
import { playerObject } from "./interfaces/playerObject";
import './styles/utility.css'
import './styles/styles.css'
import { teamStyles } from "./interfaces/teamColors";

interface MatchViewProps {
    teamOne: number,
    teamTwo: number,
}

const MatchView: React.FC<MatchViewProps> = ({teamOne,teamTwo}) => {

    const [teamOneName,setTeamOneName] = useState("");
    const [teamOneSquad,setTeamOneSquad] = useState<playerObject[]>([]);

    const [teamTwoName,setTeamTwoName] = useState("");
    const [teamTwoSquad,setTeamTwoSquad] = useState<playerObject[]>([]);

    const [teamOneScore,setTeamOneScore] = useState(0);
    const [teamTwoScore,setTeamTwoScore] = useState(0);

    const [rowMask,setRowMask] = useState<number[][]>([[0,9],[0,9],[0,9],[0,9],[0,9]])
    const [gameStarted,setGameStart] = useState(false);
    // False means Player Two's turn and True means player One's turn
    const [currentTurn, setCurrentTurn] = useState(true);

    const [commentary,setCommentary] = useState<String[]>([]);

    const [winner,setWinner] = useState(0);

    const [styling,setStyling] = useState({});

    const colNumbersArray = Array.from({ length: 10 }, (_, index) => index);
    const rowNumbersArray = Array.from({ length: 5 }, (_, index) => index);

    async function setTeamNames() {
        setTeamOneName(await invoke("get_team_name",{teamId: teamOne}));
        setTeamTwoName(await invoke("get_team_name",{teamId: teamTwo}));
    }

    async function setSquads() {
        setTeamOneSquad(await invoke("get_team_lineup", {teamId: teamOne}));
        setTeamTwoSquad(await invoke("get_team_lineup", {teamId: teamTwo}));
        console.log();
        
    }

    useEffect(() => {
        setSquads();
        setTeamNames();
        const home_team_style = teamStyles[teamOne];
        const away_team_style = teamStyles[teamTwo];
        setStyling({
            "--home-color": home_team_style["--primary"],
            "--home-alt-color": home_team_style["--secondary"],
            "--home-text-color": home_team_style["--text-color"],
            "--away-color": away_team_style["--secondary"],
            "--away-alt-color": away_team_style["--primary"],
            "--away-text-color": away_team_style["--alt-text-color"],
        })
    },[])

    const simulateSetup = () => {
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

    // Calls the backend to simulate a turn
    const scoreing = async () => {
        let results: [boolean,String[]];
        if (currentTurn) {
            results = await invoke("simulate_turn",{offenseTeam: teamOneSquad, defenseTeam: teamTwoSquad})
        }
        else {
            results = await invoke("simulate_turn",{offenseTeam: teamTwoSquad, defenseTeam: teamOneSquad})
        }
        if (results[0] === true) {
            if (currentTurn) {
                setTeamOneScore(teamOneScore + 1)
            }
            else {
                setTeamTwoScore(teamTwoScore + 1)
            }
        }
        setCommentary([...results[1].reverse(),...commentary])
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
        <div style={styling} className="match-view background vw-80">
            <span className="title-bar">
                <h2 className="home-text">{teamOneName}</h2>
                <h2 className="away-text">{teamTwoName}</h2>
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
                                            <div key={number} className="box square-home">
                                                <p>{ rowMask[row_num][0] === number && teamOneSquad.length !== 0 ? teamOneSquad[row_num].name : '' }</p>
                                                <p>{ rowMask[row_num][1] === number && teamTwoSquad.length !== 0  ? teamTwoSquad[row_num].name : '' }</p>
                                            </div>
                                        )
                                        :
                                        (
                                            <div key={number} className="box square-away">
                                            <p>{ rowMask[row_num][0] === number && teamOneSquad.length !== 0  ? teamOneSquad[row_num].name : '' }</p>
                                            <p>{ rowMask[row_num][1] === number && teamTwoSquad.length !== 0  ? teamTwoSquad[row_num].name : '' }</p>
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
                            <button className="btn" onClick={nextTurn}>NEXT TURN</button>
                        </div>
                        :
                        <button className="btn" onClick={simulateSetup}>START</button>
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