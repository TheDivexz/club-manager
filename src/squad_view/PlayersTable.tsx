import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Table from "antd/es/table";
import { Modal } from "antd";
import { playerObject } from "../interfaces/playerObject";
import PlayerCard from "./PlayerCard";
import PlayerStatView from "./PlayerStatView";

interface DataType {
    key: string;
    name: string;
    average: number,
    attack: number,
    defense: number,
    accuracy: number,
    pass: number,
    steal: number,
    game_sense: number,
    ego: number
}

interface PlayersTableProps {
    playerTeam: number
}

const PlayersTable: React.FC<PlayersTableProps> = ({playerTeam}) => {

    const [dataSet,setDataSet] = useState<DataType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPlayer,setModalPlayer] = useState<playerObject>();

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_,record: {key: string,name: string}) => <a id={record.key} onClick={handleNameClick}>{record.name}</a>,
        },
        {
            title: 'Average',
            dataIndex: 'average',
            key: 'average',
            render: (_,record: {average: number}) => <PlayerStatView current={record.average}/>,
            sorter: {
                compare: (a,b) => a.average - b.average,
            },
        },
        {
            title: 'Attack',
            dataIndex: 'attack',
            key: 'attack',
            render: (_,record: {attack: number}) => <PlayerStatView current={record.attack}/>,
            sorter: {
                compare: (a,b) => a.attack - b.attack,
            },
        },
        {
            title: 'Defense',
            dataIndex: 'defense',
            key: 'defense',
            render: (_,record: {defense: number}) => <PlayerStatView current={record.defense}/>,
            sorter: {
                compare: (a,b) => a.defense - b.defense,
            },
        },
        {
            title: 'Accuracy',
            dataIndex: 'accuracy',
            key: 'accuracy',
            render: (_,record: {accuracy: number}) => <PlayerStatView current={record.accuracy}/>,
            sorter: {
                compare: (a,b) => a.accuracy - b.accuracy,
            },
        },
        {
            title: 'Pass',
            dataIndex: 'pass',
            key: 'pass',
            render: (_,record: {pass: number}) => <PlayerStatView current={record.pass}/>,
            sorter: {
                compare: (a,b) => a.pass - b.pass,
            },
        },
        {
            title: 'Steal',
            dataIndex: 'steal',
            key: 'steal',
            render: (_,record: {steal: number}) => <PlayerStatView current={record.steal}/>,
            sorter: {
                compare: (a,b) => a.steal - b.steal,
            },
        },
        {
            title: 'Game Sense',
            dataIndex: 'game_sense',
            key: 'game_sense',
            render: (_,record: {game_sense: number}) => <PlayerStatView current={record.game_sense}/>,
            sorter: {
                compare: (a,b) => a.game_sense - b.game_sense,
            },
        },
        {
            title: 'Ego',
            dataIndex: 'ego',
            key: 'ego',
            render: (_,record: {ego: number}) => <PlayerStatView current={record.ego}/>,
            sorter: {
                compare: (a,b) => a.ego - b.ego,
            },
        },
    ]

    async function handleNameClick(e: any) {
        setModalPlayer(await invoke("get_player",{playerId: e.target.id}))
        toggleModal()
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    async function getTableData() {   
        setDataSet(await invoke("get_players_display_data",{teamId: playerTeam}))  
    }

    useEffect(()=>{
        getTableData();
    },[])

    return (
        <>
            <Table columns={columns} dataSource={dataSet}/>
            <Modal title={modalPlayer?.name} onOk={toggleModal} open={isModalOpen} onCancel={toggleModal}>
                {modalPlayer?<PlayerCard playerInfo={modalPlayer}/>:''}
            </Modal>
        </>
    )
}

export default PlayersTable;