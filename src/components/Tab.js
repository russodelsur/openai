import './style.css';

const Tab = ({id, title, activeTab, setActiveTab, closeTab}) => (
    <>
    <div
    id={id}
    style={{display: "flex", flexDirection: "row",}}
    className={`tab ${activeTab === id ? 'active' : ''}`}
    onClick={() => setActiveTab(id)}
    >
    {title}
        <div 
        id={id}
        style={{marginLeft: "1rem"}}
        onClick={(e)=>closeTab(e.target)}>
            x
        </div>
    </div>
    </>
);

export default Tab;