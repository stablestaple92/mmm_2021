import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { dbService } from "fbase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const SampleAbout = (isLoggedIn, userObj) => {
    const [artistName, setArtistName] = useState("");
    const [artistIntroduction, setArtistIntroduction] = useState("");
    const [abouts, setAbouts] = useState([]);
    const history = useHistory();

    console.log(isLoggedIn);
    if(!isLoggedIn) {
        history.push("/");
    }

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
            // creatorId: userObj.uid,
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

    const onClear = (event) => {
        console.log(event);
        document.querySelector("#artistName").value = "";
        document.querySelector("#artistName").value = "";
    }

    return (
        <div>
            <span>변경할 데이터를 입력해주세요</span>
            <form onSubmit={onSubmit}>
                <input id="artistName" name="artistName" value={artistName} onChange={onChange} type="text" maxLength={50}/>
                <textarea id="artistIntroduction" name="artistIntroduction" value={artistIntroduction} onChange={onChange} type="text" maxLength={1500} />
                <input type="submit" value="Save" /> 
            </form>
                <button type="button" onChange={onClear}>Clear</button>
            <h4>현재 저장된 데이터</h4>
            <span>아티스트 이름 : {abouts.artist}</span>
            <span>아티스트 소개 : {abouts.introduction}</span>
        </div>
    );
}

export default SampleAbout;