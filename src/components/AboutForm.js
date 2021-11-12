import { deleteField, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "@firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable, uploadString } from "@firebase/storage";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";

/*
    2021/11/12
    앞으로의 기능 추가 예정
    1. 파일 크기 제한
    2. 파일 업로드 현황 보여주기 업로드 완료 등 - UploadBytesResumable로 모두 변환??
*/

const AboutForm = ({ userObj }) => {
    const [sampleImg, setSampleImg] = useState("");
    const [fileName, setFileName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [artistIntroduction, setArtistIntroduction] = useState("");
    const [artistImage, setArtistImage] = useState([]);
    const [progress, setProgress] = useState(0);

    // Firebase Database에서 정보들 가져오기
    const getAbouts = async() => {
        const docs = doc(dbService, "abouts", "artistInfo");
        const docSnapshot = await getDoc(docs);
        const dbAbouts = docSnapshot.data();   

        setArtistName(dbAbouts.artist);
        setArtistIntroduction(dbAbouts.introduction);
    }
    
    // Firebase Database에서 아티스트 이미지 가져오기
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
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setSampleImg("");
            setFileName("");
        }
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
        },
        () => {
            const complete = document.querySelector("#img-complete");
            complete.innerText = "Upload Complete!";
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
        <>
        {artistImage.imgURL ? (
            <div>
                <img src={artistImage.imgURL} alt="artistimage"/>
                <button onClick={onDeleteArtistImg}>Delete</button>
            </div>
        ):(
            <>
            <form onSubmit={onUploadArtistImg}>
                <input id="imgSelect" name="artistImg" type="file" accept="img/*" onChange={onArtistImage}/>
                <input type="submit" value="Upload"></input>
            </form>
            <span>{progress}</span>
            <span id="img-complete"></span>
            </>
        )}

        {sampleImg && 
            <div>
                <img src={sampleImg} alt="imagesample"/>
                <button onClick={onClearSampleImg}>Clear</button>
            </div>
        }
        <form onSubmit={onSubmit}>
        <input id="input-artist-name" name="artistName" value={artistName} onChange={onChange} type="text" maxLength={50}/>
        <textarea id="input-artist-introduction" name="artistIntroduction" value={artistIntroduction} onChange={onChange} type="text" maxLength={1500} />
        <input id="input-artist-submit" type="submit" value="Save" /> 
        </form>
        </>
    );
}

export default AboutForm;