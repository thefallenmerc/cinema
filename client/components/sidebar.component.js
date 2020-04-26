import React from 'react';

function buildContent(content = [], currentVideo, setCurrentVideo, name = null, key = 0) {
    return (
        <div key={key} className="">
            {
                name && <div className="bg-red-500 text-white px-4 py-2">
                    {name}
                </div>
            }
            <ul className="">
                {
                    content
                        .filter(section => section.ext ? ['.mp4'].includes(section.ext) ? true : false : true)
                        .map((section, key) => {
                            return section.type === 'file' ?
                                <li key={key}
                                    className={
                                        "px-4 py-2 cursor-pointer" + ((currentVideo && currentVideo.uid === section.uid) ? " bg-red-300 text-white" : "")
                                    }
                                    onClick={() => {
                                        setCurrentVideo(section);
                                    }}>{section.name}</li> :
                                buildContent(section.content, currentVideo, setCurrentVideo, section.name, key)
                        })
                }
            </ul>
        </div>
    )
}

export default function Sidebar({ content, currentVideo, setCurrentVideo }) {
    return (
        !content ? <div >Loading...</div> :
            <div className="sidebar">
                {
                    buildContent(content, currentVideo, setCurrentVideo)
                }
            </div>
    );
}
