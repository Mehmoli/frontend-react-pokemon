import React from 'react'
import './NextAndPreviousButtons.css';

function NextAndPreviousButtons({ gotoPrevPage, gotoNextPage }) {
    return (
        <div className='prev-next-buttons'>
            {gotoPrevPage && <button className="previous-next" onClick={gotoPrevPage}>Vorige</button>}
            {gotoNextPage && <button className="previous-next" onClick={gotoNextPage}>Volgende</button>}
        </div>
    )
}

export default NextAndPreviousButtons;