import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { doc, getDoc } from "firebase/firestore";

const About = () => {
    const [abouts, setAbouts] = useState([]);
    const getAbouts = async() => {
        const docs = doc(dbService, "abouts", "artistInfo");
        const docSnapshot = await getDoc(docs);
        const dbAbouts = docSnapshot.data();  
        try {
            const docSnapshot = await getDoc(docs);
            if (docSnapshot.exists()){
                setAbouts({
                    artist : dbAbouts.artist,
                    introduction : dbAbouts.introduction
                });
            } else {
                console.log("ERROR");
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        getAbouts();
    }, []);
    
    return (
        <div>
            
            <h1>About</h1>
            <h2>{abouts.artist}</h2>
            <h4>{abouts.introduction}</h4>
        </div>
    );
}

export default About;