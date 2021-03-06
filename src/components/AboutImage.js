import React, { useEffect, useState } from "react";
import { deleteField, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "@firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadString } from "@firebase/storage";
import { dbService, storageService } from "fbase";
import "./AboutImage.css";

const AboutImage = ({ userObj }) => {
    const [sampleImg, setSampleImg] = useState("");
    const [fileName, setFileName] = useState("");
    const [artistImage, setArtistImage] = useState([]);
    const [progress, setProgress] = useState(0);

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
        getArtistImg();
    }, []);

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
        <div className="about-image-container">
            {artistImage.imgURL ? (
                <div className="about-image-saved-container">
                    <img src={artistImage.imgURL} className="about-image" alt="artistimage"/>
                    <button onClick={onDeleteArtistImg}>Delete</button>
                </div>
            ):(
                <>
                    {sampleImg && 
                        <div className="about-image-sample-container">
                            <img src={sampleImg} className="about-image-sample" alt="imagesample"/>
                            <button onClick={onClearSampleImg}>Clear</button>
                        </div>
                    }
                    <form onSubmit={onUploadArtistImg}>
                        <input id="imgSelect" name="artistImg" type="file" accept="img/*" onChange={onArtistImage}/>
                        <input type="submit" value="Save"></input>
                    </form>
                    <span>{progress}</span>
                    <span id="img-complete"></span>
                </>
            )}

        </div>
    )
}

export default AboutImage;