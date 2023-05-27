import React, { useContext, useEffect, useState } from 'react';
import './ProfilePic.css';
import { Navbar, Discard, Loader } from '../../Components/Index';
import { useNavigate } from 'react-router';
import { InscribleContext } from '../../Context/Context';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProfilePic = () => {

    const { currentUsername, UploadPost, isLoading, setIsLoading, getSignInState } = useContext(InscribleContext);
    const notify = (msg) => toast.error(msg);

    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(null);
    const [isCrossed, setIsCrossed] = useState(false);
    const [goBack, setGoBack] = useState(false);
    const [next, setNext] = useState(false);

    useEffect(()=>{
        const state = getSignInState();
        if (!state) {
            navigate('/');
        }
    },[]);

    const manageSelectedFile = (e) => {
        const selectedFile = e.target.files[0];

        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = function () {
            setFile(selectedFile);
        };
        filePreview(selectedFile);
    };

    const filePreview = (selectedFile) => {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = function (e) {
            setPreviewSrc(e.target.result);
        };
    };

    const updateProfile = ()=>{

    };

    return (
        <>
            <Navbar />
            <div className='create-main-container'>
                <span className="material-symbols-outlined create-container-close"
                    onClick={() => {
                        if (!file) {
                            navigate('/profile');
                        }
                        else {
                            setIsCrossed(true)
                        }
                    }}
                >
                    close
                </span>
                {isCrossed && (
                    file && (
                        <Discard crossState={isCrossed} setCrossState={setIsCrossed} file={setFile} back={setGoBack} setnext={setNext} />
                    )
                )}

                {goBack && (
                    <Discard crossState={isCrossed} setCrossState={setIsCrossed} file={setFile} back={setGoBack} setnext={setNext} />
                )}

                {isLoading ?
                    (
                        // <Loader /> 
                        notify("Please wait. Uploading Image !")
                    ) :
                    <div className="create-select-post">
                        <div className="create-select-post_header">
                            <span className={!file ? 'd-none' : "material-symbols-outlined back-arrow"}
                                onClick={() => {
                                    setGoBack(true);
                                }}
                            >
                                chevron_left
                            </span>
                            <h5>Edit Profile</h5>
                            <span className={file ? 'next' : 'd-none'}
                                onClick={
                                    updateProfile
                                }
                            >
                                Done
                            </span>
                        </div>

                        {/* BODY OF CREATE POST CONTAINER */}
                        {!file ?
                            <div className="create-select-post_body">
                                <span className="material-symbols-outlined create-select-post_body-icon">
                                    imagesmode
                                </span>
                                <label htmlFor="selectedFile" className='select-post-button'>Select From Computer</label>
                                <input type="file" name="selectedFile" id="selectedFile" className='d-none' onChange={manageSelectedFile} />
                            </div>
                            :
                            <div className='selected-file-preview'>
                                <img src={previewSrc} alt="No Preview" id='imgPreview' />
                            </div>
                        }
                    </div>
                }
            </div>
        </>
    );
};

export default ProfilePic;