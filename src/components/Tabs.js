import './style.css';
import React, { useEffect, useState, useRef} from 'react';
import Tab from './Tab';
import ChatContainer from '../components/ResponseBox';
// import { set } from 'mongoose';

const Tabs = (props) => {
const [tabs, setTabs] = useState([
{ id: 0, title: 'Tab 0'},
]);
const [activeTab, setActiveTab] = useState(0);
const [chats, setChats] = useState([[]]);
const key= useRef(0);


const addTab = () => {
    key.current++;  
    const newId = key.current;
    const newTab = {
    id: newId,
    title: `Tab ${newId}`,
    };
    setChats([...chats, []]);
    setTabs([...tabs, newTab]);
    setActiveTab(newId);
};

const closeTab = (target) => {
    const tabIndex = tabs.findIndex(findId);
    function findId(tab) {
    return Number(tab.id) === Number(target.id);
    }
    // Find the index of the tab with the matching id
    if (tabIndex === -1) {
    return; // Tab not found, so return early
    }
    tabs.splice(tabIndex, 1); // Remove the tab with the matching id
    // Adjusting activeTab if the closed tab was active
    setTabs([...tabs]); // Update state with new tabs array
};

useEffect(() => {
    if (props.message === '') return;
    let x = chats;
    let currentChat = x[activeTab];
    currentChat.push(props.message);
    x[activeTab] = currentChat;
    setChats(x);
    console.log(activeTab, tabs[activeTab])
    let text = props.message.content;
    console.log(text);
    let y = tabs[activeTab];
    y.title = text.split(' ')[0];
    tabs[activeTab] = y;
    setTabs(tabs);
}, [props.message]);

useEffect(() => {
    if (props.response === '') return;
    let x = chats;
    let currentChat = x[activeTab];
    currentChat.push(props.response);
    x[activeTab] = currentChat;
    setChats(x);
}, [props.response]);

return (
    <>
    <div className="tabs">
        {tabs.map((tab, i) => (
        <Tab
        key={tab.id}
        id={tab.id}
        title={tab.title}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        closeTab={closeTab}
        />
        ))}
        <div className="tab add-tab" onClick={addTab}>
            +
        </div>
    </div>
    <div className="container-chat">
        <ChatContainer 
        chatHistory={chats[activeTab]}
        setChats={setChats} 
        activeTab={activeTab}
        chats={chats}
        />
    </div>
    </>
);
};

export default Tabs;