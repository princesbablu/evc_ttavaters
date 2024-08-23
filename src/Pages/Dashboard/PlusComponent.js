import React from 'react'
const PlusComponent = (props) => {
    return (
        <div>
            <div className="arrow-container  text-center" style={{ zIndex: '2' }}>
                <button className="px-1 py-1 " >
                    <img
                        src={props.img}
                        className=""
                        height="32px"
                        width="32px"
                        alt=""
                    />
                </button>
            </div>
        </div>
    )
}

export default PlusComponent
