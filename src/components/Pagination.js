import React, { Fragment } from 'react'

const Pagination = ({ paginate, currentPage, hasNext, hasPrev, gotoPage, maxPage }) => {
    return (
        <Fragment>
            <div className='d-flex align-items-center justify-content-center flex-column'>
                <nav>
                    <ul className='pagination'>
                        {currentPage !== 1 && <li className='page-item mx-2'>
                            <a onClick={() => paginate(1)} href='!#' className='page-link'>
                                Go To Start
                            </a>
                        </li>}

                        {hasPrev && <li className='page-item'>
                            <a onClick={() => paginate(+currentPage - 1)} href='!#' className='page-link'>
                                Prev
                            </a>
                        </li>}

                        <li className='page-item mx-2'>
                            <a onClick={() => paginate(+currentPage)} href='!#' className='page-link'>
                                {currentPage}
                            </a>
                        </li>

                        {hasNext && <li className='page-item'>
                            <a onClick={() => paginate(+currentPage + 1)} href='!#' className='page-link'>
                                Next
                            </a>
                        </li>}

                        {hasNext && <li className='page-item mx-2'>
                            <a onClick={() => paginate(maxPage)} href='!#' className='page-link'>
                                Go To End
                            </a>
                        </li>}
                    </ul>
                </nav>
                
                <span>Go to Page <input type='number' min={1} max={maxPage} onChange={e => gotoPage(e.target.value)} /></span>
            </div>
        </Fragment>

    )
}

export default Pagination
