import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { dbService, storageService } from "fbase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const SampleAbout = ({isLoggedIn, userObj}) => {
    const history = useHistory();
    const [artistImg, setArtistImg] = useState("");
    const [imgFile, setImgFile] = useState();
    const [artistName, setArtistName] = useState("");
    const [artistIntroduction, setArtistIntroduction] = useState("");
    const [abouts, setAbouts] = useState([]);

    if(!isLoggedIn) {
        history.push("/");
    }

    // firebase DB 에서 값 가져오기
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
            creatorId: userObj.uid,
        });
    }

    // 실시간으로 input 값 받기
    const onChange = (event) => {
        const { target: {name, files, value},} = event;
        /*]   
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = (event) => {
            const {currentTarget : {result}} = event;
            console.log(result);
        }
        */
        if (name === "artistName") {
            setArtistName(value);
        } else if (name === "artistIntroduction") {
            setArtistIntroduction(value);
        } else if (name === "artistImg"){
            
        }
    }

    /*
    // 아티스트 이미지 없애기 (미리보기 까지)
    const onClearImg = () => {
        setArtistImg(null);
        setImgFile("");
    }
    */
    return (
        <div>
            <span>변경할 데이터를 입력해주세요</span>
            <form onSubmit={onSubmit}>
                <div id="artistImgSample"></div>
                <input name="artistImg" type="file" onChange={onChange}/>
                <button onChange={onClearImg}>Clear</button>
                <span id="imageName"></span>
                <span id="imageSize"></span>
                <input id="artistName" name="artistName" value={artistName} onChange={onChange} type="text" maxLength={50}/>
                <textarea id="artistIntroduction" name="artistIntroduction" value={artistIntroduction} onChange={onChange} type="text" maxLength={1500} />
                <input type="submit" value="Save" /> 
            </form>

            <h4>현재 저장된 데이터</h4>
            <span>아티스트 이름 : {abouts.artist}</span>
            <span>아티스트 소개 : {abouts.introduction}</span>
        </div>
    );
}

export default SampleAbout;