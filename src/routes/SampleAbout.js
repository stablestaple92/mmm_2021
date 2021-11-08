import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { dbService, storageService } from "fbase";
import { doc, getDoc, setDoc, updateDoc, deleteField, serverTimestamp } from "firebase/firestore";
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';


/*
    2021/11/08
    앞으로의 기능 추가 예정
    1. 파일 크기 제한
    2. 아티스트 이름, 아티스트 소개를 input쪽에 다시 value값으로 넣을 수 있는 방법 찾기
*/


const SampleAbout = ({isLoggedIn, userObj}) => {
    const history = useHistory();
    const [sampleImg, setSampleImg] = useState("");
    const [fileName, setFileName] = useState("");    const [artistName, setArtistName] = useState("");
    const [artistIntroduction, setArtistIntroduction] = useState("");
    const [abouts, setAbouts] = useState([]);
    const [artistImage, setArtistImage] = useState([]);
    
    // 로그인 안하면 내쫒기
    if(!isLoggedIn) {
        history.push("/");
    }

    // firebase DB 에서 값 가져오기
    const getAbouts = async() => {
        const docs = doc(dbService, "abouts", "artistInfo");
        const docSnapshot = await getDoc(docs);
        const dbAbouts = docSnapshot.data();   
        setAbouts({
            artist : dbAbouts.artist,
            introduction : dbAbouts.introduction
        });
    }
    
    // Firebase에서 아티스트 이미지 가져오기
    const getArtistImg = async () => {
        const docs = doc(dbService, "abouts", "artistImage");
        const docSnapshot = await getDoc(docs);
        const dbImage = docSnapshot.data();
        setArtistImage({
            imgName : dbImage.imgName,
            imgURL : dbImage.imgURL,
        });
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
            artist : artistName,
            introduction : artistIntroduction,
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

    // 아티스트 사진 선택하고 보여주기
    const onArtistImage = (event) => {
        const reader = new FileReader();
        const { 
            target : { files },
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

    // 아티스트 사진 선택 후 취소
    const onClearSampleImg = () => {
        setSampleImg(null);
        setFileName("");
    }

    // 아티스트 사진 업로드
    const onUploadArtistImg = async (event) => {
        event.preventDefault();
        const storageRef = ref(storageService, `artistImg/${fileName}`);
        const response = await uploadString(storageRef, sampleImg, "data_url");
        const fileURL = await getDownloadURL(response.ref);
        await setDoc(doc(dbService, "abouts", "artistImage"), {
            imgURL : fileURL,
            imgName : fileName,
            createAt : serverTimestamp(),
            creatorId : userObj.uid,
        });
    }

    // 아티스트 사진 삭제
    const onDeleteArtistImg = async () => {
        const ok = window.confirm("Are you sure you want to delete artist image?");
        if (ok) {
            const imgRef = doc(dbService, "abouts", "artistImage");
            await updateDoc(imgRef, {
                imgName : deleteField(),
                imgURL : deleteField(),
                createAt : deleteField(),
                creatorId : deleteField()
            })
            
            const storageRef = ref(storageService, `artistImg/${artistImage.imgName}`);
            await deleteObject(storageRef).then(() => {  
            }).catch((error) => {
                console.log(error);
            });
            setArtistImage([]);
        }


        
    }

    return (
        <div>
            <span>변경할 데이터를 입력해주세요</span>
            {artistImage.imgURL ? (
                <div>
                    <img src={artistImage.imgURL} alt="artistimage"/>
                    <button onClick={onDeleteArtistImg}>Delete</button>
                </div>
            ):(
                <form onSubmit={onUploadArtistImg}>
                    <input id="imgSelect" name="artistImg" type="file" accept="img/*" onChange={onArtistImage}/>
                    <input type="submit" value="Upload"></input>
                </form>
            )}
            {sampleImg && 
                <div>
                    <img src={sampleImg} alt="imagesample"/>
                    <button onClick={onClearSampleImg}>Clear</button>
                </div>
            }
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