import React, { useEffect, useState, useMemo } from "react";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "@firebase/firestore";
import { dbService } from "fbase";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

/*
    2021/11/15
    앞으로의 기능 추가 예정
    4. CSS
*/

const AboutForm = ({ userObj }) => {
    const [artistName, setArtistName] = useState("");
    const [artistIntroduction, setArtistIntroduction] = useState("");

    // Firebase Database에서 정보들 가져오기
    const getAbouts = async() => {
        const docs = doc(dbService, "abouts", "artistInfo");
        const docSnapshot = await getDoc(docs);
        const dbAbouts = docSnapshot.data();   

        setArtistName(dbAbouts.name);
        setArtistIntroduction(dbAbouts.introduction);
    }
    
    // 초기 실행
    useEffect(() => {
        getAbouts();
    }, []);
    
    // 저장 버튼 입력 후 동작
    const onSubmit = async (event) => {
        event.preventDefault();
        await setDoc(doc(dbService, "abouts", "artistInfo"), {
            name : artistName,
            introduction : artistIntroduction,
            createAt : serverTimestamp(),
            creatorId : userObj.uid,
        });
    }

    // 실시간으로 input 값 받기
    const onChange = (event) => {
        const { target: {value},} = event;
            setArtistName(value);
    }


const modules = useMemo (() => {
    return {
        toolbar : [
            [{ 'header': '1'}, {'header': '2'}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
                {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean']
            ]
        }
}, []);


const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link'
    ];

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>Artist Name</div> <input id="input-artist-name" value={artistName} onChange={onChange} type="text" maxLength={50}/>
                <div>Introduction</div>
                <ReactQuill theme="snow" modules={modules} formats={formats} value={artistIntroduction} onChange={setArtistIntroduction} />
                <input id="input-artist-submit" type="submit" value="Save" /> 
            </form>
        </>
    );
}

export default AboutForm;