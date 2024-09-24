import React from "react";
import './Loading.css';

const Loading = () => {
    return (
        <div className="sh-loading" id="sh_loading">
            <ul className="sh-loading-element">
                <li className="sh-loadin-element-item"></li>
                <li className="sh-loadin-element-item"></li>
                <li className="sh-loadin-element-item"></li>
                <li className="sh-loadin-element-item"></li>
            </ul>
        </div>
    )
}

export default Loading;