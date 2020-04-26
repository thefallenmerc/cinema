import React from 'react'

const style = {
    paddingLeft: '300px'
}

function getVideo(src) {
    return src;
}

export default function VideoPlayer({ video }) {
    return (
        <div style={style}>
            {
                !video ?
                    <div className="">Please select a video!</div> :
                    <div>
                        <div className="py-2 px-4 bg-red-500 text-white">
                            {video && video.name}
                        </div>
                        <video src={video.url} controls autoPlay style={{
                            maxWidth: '1000px',
                            margin: 'auto'
                        }} />
                    </div>
            }
        </div>
    )
}
