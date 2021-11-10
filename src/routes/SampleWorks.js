import React from "react";
import { useHistory } from "react-router";

const SampleWorks = ( {isLoggedIn} ) => {
    const history = useHistory();
    
    
    // 로그인 안하면 내쫒기
    if(!isLoggedIn) {
        history.push("/");
    }

    return (

        <>
        <form>
            
            <input type="file" name=""/>
            <select name="">
                <option>Regular</option>
                <option>EP</option>
                <option>Guest</option>
            </select>
            <select name="">
                <option>Original</option>
                <option>Remix</option>
                <option>Special</option>
            </select>
            <select name="">
                <option>CD</option>
                <option>Digital</option>
                <option>CD & Digital</option>
                <option>Etc.</option>
            </select>
            <input type="text" required placeholder="Title"/>
            <input type="text" placeholder="Catalog"/>
            <input type="text" placeholder="Event"/>
            <input type="text" placeholder="Price"/>
            <input type="text" placeholder="Hompage Link"/>
            <input type="text" placeholder="Youtube Link"/>
            
            <input type="submit" value="Save"/>
        </form>
        </>
    );
}

export default SampleWorks;