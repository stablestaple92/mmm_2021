import React, { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "@firebase/firestore";
import { dbService } from "fbase";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

/*
    2021/11/15
    앞으로의 기능 추가 예정
    1. 파일 크기 제한
    2. 파일 업로드 현황 보여주기 업로드 완료 등 - UploadBytesResumable로 모두 변환??
    3. React-Quill 이미지 캐치 후 스토리지에 저장
    4. CSS
*/

const AboutForm = ({ userObj }) => {
    const [artistName, setArtistName] = useState("");
    const [artistIntroduction, setArtistIntroduction] = useState("");
    const [quillValue, setQuillValue] = useState("");

    // Firebase Database에서 정보들 가져오기
    const getAbouts = async() => {
        const docs = doc(dbService, "abouts", "artistInfo");
        const docSnapshot = await getDoc(docs);
        const dbAbouts = docSnapshot.data();   

        setArtistName(dbAbouts.artist);
        setArtistIntroduction(dbAbouts.introduction);
        setQuillValue(dbAbouts.quill);
    }
    
    // 초기 실행
    useEffect(() => {
        getAbouts();
    }, []);
    
    // 저장 버튼 입력 후 동작
    const onSubmit = async (event) => {
        event.preventDefault();
        await setDoc(doc(dbService, "abouts", "artistInfo"), {
            artist : artistName,
            introduction : artistIntroduction,
            quill : quillValue,
            createAt : serverTimestamp(),
            creatorId : userObj.uid,
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
        <>
            <form onSubmit={onSubmit}>
            <input id="input-artist-name" name="artistName" value={artistName} onChange={onChange} type="text" maxLength={50}/>
            <textarea id="input-artist-introduction" name="artistIntroduction" value={artistIntroduction} onChange={onChange} type="text" maxLength={1500} />
            <input id="input-artist-submit" type="submit" value="Save" /> 
            </form>

            <ReactQuill theme="snow" value={quillValue} onChange={setQuillValue} />
        </>
    );
}

export default AboutForm;