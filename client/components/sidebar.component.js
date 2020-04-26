import React from 'react';

const style = {
    width: '300px',
    height: '100%',
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    overflowY: 'auto'
};

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
                                <li key={key} className="px-4 py-2 cursor-pointer" onClick={() => {
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
    console.log(content);
    return (
        !content ? <div >Loading...</div> :
            <div style={style}>
                {
                    buildContent(content, currentVideo, setCurrentVideo)
                }
            </div>
    );
}
