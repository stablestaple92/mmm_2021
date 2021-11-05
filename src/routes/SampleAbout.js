import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { dbService, storageService } from "fbase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const SampleAbout = ({isLoggedIn, userObj}) => {
    const history = useHistory();
    const [sampleImg, setSampleImg] = useState("");
    const [fileName, setFileName] = useState("");
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
    
    // Firebase Storage에서 아티스트 이미지 가져오기
    const getArtistImg = () => {
    /*
        onst getDownloadURL(ref(storageService, fileName))
            .then((url) => {
                
            }).catch((error) => {
                console.log(error)
            });
            */
    }

    // 초기 실행
    useEffect(() => {
        getAbouts();
        getArtistImg();
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
        const { target: {name, value},} = event;
        if (name === "artistName") {
            setArtistName(value);
        } else if (name === "artistIntroduction") {
            setArtistIntroduction(value);
        }
    }

    // 아티스트 사진 선택하고 보여주기
    const onArtistImage = (event) => {
        const reader = new FileReader();
        const { 
            target: { files },
        } = event;
        const file = files[0];

        reader.onloadend = (event) => {
            // 업로드할 이미지 미리보기
            const {
                currentTarget: {result},
            } = event;  
            setSampleImg(result);
            setFileName(file.name);
        };
        reader.readAsDataURL(file);
    }

    // 아티스트 사진 선택 후 삭제
    const onClearSampleImg = () => {
        setSampleImg(null);
        setFileName("");
    }

    // 아티스트 사진 업로드
    const onArtistImageUpload = async () => {
        const storageRef = ref(storageService, fileName);
        await uploadString(storageRef, sampleImg, "data_url");
    }

    return (
        <div>
            <span>변경할 데이터를 입력해주세요</span>
            
            {sampleImg && 
                <div>
                    <img src={sampleImg}/>
                    <button onClick={onClearSampleImg}>Clear</button>
                </div>
            }
            <input id="imgSelect" name="artistImg" type="file" accept="img/*" onChange={onArtistImage}/>
            <button onClick={onArtistImageUpload}>Upload</button>
            <form onSubmit={onSubmit}>
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