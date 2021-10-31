import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const SampleAbout = () => {
    const [artistName, setArtistName] = useState("");
    const [artistIntroduction, setArtistIntroduction] = useState("");
    const [abouts, setAbouts] = useState([]);
    const getAbouts = async() => {
        const docs = doc(dbService, "abouts", "artistInfo");
        const docSnapshot = await getDoc(docs);
        const dbAbouts = docSnapshot.data();    
        setAbouts({
            artist:dbAbouts.artist,
            introduction:dbAbouts.introduction
        });
    }

    useEffect(() => {
        getAbouts();
    }, []);

  
    // 저장 버튼 입력 후 동작
    const onSubmit = async (event) => {
        event.preventDefault();
        await setDoc(doc(dbService, "abouts", "artistInfo"), {
            artist:artistName,
            introduction:artistIntroduction,
            createAt: serverTimestamp(),
        });
    }

    // 실시간으로 input 값 받기
    const onChange = (event) => {
        const { target: {name, value},} = event;
        if (name === "artistName") {
            setArtistName(value);
        } else if (name === "artistIntroduction") {
            setArtistIntroduction(value);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="artistName" value={artistName} onChange={onChange} type="text" maxLength={50}/>
                <textarea name="artistIntroduction" value={artistIntroduction} onChange={onChange} type="text" maxLength={1500} />
                <input type="submit" value="Save" /> 
            </form>
            <h4>현재 저장된 데이터</h4>
            <span>{abouts.artist}</span>
            <div>{abouts.introduction}</div>
        </div>
    );
}

export default SampleAbout;