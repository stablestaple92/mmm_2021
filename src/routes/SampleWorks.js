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
            
            <input name="jacket" type="file"/>
            <select name="releaseType">
                <option>Regular</option>
                <option>EP</option>
                <option>Guest</option>
            </select>
            <select name="originType">
                <option>Original</option>
                <option>Remix</option>
                <option>Special</option>
            </select>
            <select name="formType">
                <option>CD</option>
                <option>Digital</option>
                <option>CD & Digital</option>
                <option>Etc.</option>
            </select>
            <input name="title" type="text" required placeholder="Title"/>
            <input name="catalog" type="text" placeholder="Catalog No."/>
            <input name="event" type="text" placeholder="Event"/>
            <input name="price" type="text" placeholder="Price"/>
            <input name="hplink" type="text" placeholder="Hompage Link"/>
            <input name="ytlink" type="text" placeholder="Youtube Link"/>
            
            <input type="submit" value="Save"/>
        </form>
        </>
    );
}

export default SampleWorks;