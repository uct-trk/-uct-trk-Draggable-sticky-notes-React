

import React, { useContext } from 'react'
import MainContext from '../MainContext'

function LeaveCommentText() {

    const {position} = useContext(MainContext)

    return (    
        <div>
            <div className="leave-comment-text" style={{position: 'fixed', left: position.x[1] + 20, top: position.y[1]}}>Yorum yazmak için tıklayınız</div>
        </div>
    )
}
export default LeaveCommentText
