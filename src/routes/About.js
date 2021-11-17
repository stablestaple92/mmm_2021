import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { doc, getDoc } from "firebase/firestore";

const About = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [introduction, setIntroduction] = useState("");
    const getAbouts = async() => {
        const docs = doc(dbService, "abouts", "artistInfo");
        const docSnapshot = await getDoc(docs);
        const dbAbouts = docSnapshot.data();  
        try {
            const docSnapshot = await getDoc(docs);
            if (docSnapshot.exists()){
                setName(dbAbouts.name);
                setIntroduction(dbAbouts.introduction);
            } else {
                console.log("ERROR");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getImage = async () => {
        const docs = doc(dbService, "abouts", "artistImage");
        const docSnapshot = await getDoc(docs);
        const dbImage = docSnapshot.data();
        try {
            if (docSnapshot.exists()){
                setImage(dbImage.imgURL);
            } else {
                setImage("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAbouts();
        getImage();
    }, []);
    
    return (
        <div>
            <h1>About</h1>
            <img src={image} alt="artistPhoto"/>
            <h2>{name}</h2>
            <div dangerouslySetInnerHTML={{__html:introduction}}/>
        </div>
    );
}

export default About;