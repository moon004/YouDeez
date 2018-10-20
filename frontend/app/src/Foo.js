import React from 'react';



const Bar = props => {
    return (
        <div>
            <button>{props.labels}</button>
        </div>
    );
}



const Foo = (props) => (
    <div>
        <Bar labels={props.label}/>
        <button>{props.label}</button>
    </div>
)


export default Foo;