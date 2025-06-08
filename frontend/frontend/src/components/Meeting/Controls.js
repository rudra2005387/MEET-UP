import React from 'react';

const Controls = ({ onMute, onVideoToggle, isMuted, isVideoOn }) => {
    return (
        <div className="controls">
            <button onClick={onMute}>
                {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <button onClick={onVideoToggle}>
                {isVideoOn ? 'Turn Video Off' : 'Turn Video On'}
            </button>
        </div>
    );
};

export default Controls;