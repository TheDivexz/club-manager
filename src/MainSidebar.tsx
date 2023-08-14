import { useEffect, useState } from "react";
import './styles/utility.css'
import './styles/styles.css'

// Define the type for the props
interface MainSideBarProps {
    whichView: (data: number) => void; // Function that accepts a string parameter and returns void
  }

const MainSideBar: React.FC<MainSideBarProps> = ({whichView}) => {

    const determineView = (view: number) => {
        whichView(view);
    }

    return (
        <div className="background">
            <div className="v-flex main-sidebar">
                <button className="btn" onClick={() => determineView(0)}> Squad View </button>
                <button className="btn" onClick={() => determineView(1)}> Match View </button>
            </div>
        </div>
    )
}

export default MainSideBar;