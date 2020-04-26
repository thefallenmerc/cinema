import React, { useEffect } from 'react';
import Sidebar from './sidebar.component';
import { useState } from 'react';
import VideoPlayer from './video-player.component';

function App() {

    const [content, setContent] = useState(null);

    const [currentVideo, setCurrentVideo] = useState(null);

    useEffect(() => {
        fetch('/api/content')
            .then(r => r.json())
            .then(response => {
                setContent(response.content);
            });
    }, [])

    return (
        <div>
            <Sidebar content={content} currentVideo={currentVideo} setCurrentVideo={setCurrentVideo} />
            <VideoPlayer video={currentVideo} />
        </div>
    );
}

export { App };
