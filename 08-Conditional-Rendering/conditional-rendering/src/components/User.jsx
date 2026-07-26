


function User({ user }) {

    if (!user.isLOggedin) {
        return (
            <div>
                <p>please log in</p>
                <p> nagu soo noqo adoo log in ah mahadsanid</p>
                <h1>no no </h1>
            </div>
        )
    }

   let newMassage =  false;

    return (
        <div>
            {/* {user.isLOggedin ?  
            <h1>welcome {user.name}</h1> 
             : 
             <p>please log in</p> } */}
            <h1 className="heading">welcome {user.name}</h1>

           {newMassage && <p>yo have new massage </p>}

        </div>
    )
}

export default User