import React from 'react'

function getVideo(src) {
    return src;
}

export default function VideoPlayer({ video, setCurrentById }) {

    return (
        <div className="video-player">
            {
                !video ?
                    <div className="">Please select a video!</div> :
                    <div>
                        <div className="py-2 px-4 bg-red-500 text-white">
                            {video && video.name}
                        </div>
                        <video src={video.url} controls autoPlay
                            onEnded={() => {
                                if (video.next) {
                                    setCurrentById(video.next);
                                }
                            }} />
                        {video.prev && <button onClick={
                            () => { setCurrentById(video.prev) }
                        } >Previous</button>}
                        {video.next && <button onClick={
                            () => { setCurrentById(video.next) }
                        } >Next</button>}
                    </div>
            }
        </div>
    )
}
