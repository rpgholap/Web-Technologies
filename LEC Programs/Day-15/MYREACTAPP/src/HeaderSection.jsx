export function HeaderSection(props){
    console.log(props)
    return (
        <div>
            <h1>{props.heading}</h1>
            <p>{props.intro}</p>
            <button>{props.buttonText}</button>
            {
                props.link ? <a href={props.link}>{props.linkText}</a> : null
            }

            {
                props.age >= 18 ? <h3>User is eligible</h3> : <h3>Tu to baccha hai</h3>
            }
            
        </div>
    )
}