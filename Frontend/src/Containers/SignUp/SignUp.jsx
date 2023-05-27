import React, { useContext, useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router';
import { InscribleContext } from '../../Context/Context';
import { toast } from 'react-toastify';
import { ProfilePic } from '../../Components/Index';
import axios from 'axios';

const SignUp = () => {

  const navigate = useNavigate();
  const { connectedAccount, CheckIfUserIsRegistered, RegisterUser } = useContext(InscribleContext);

  const notify = (msg) => toast.error(msg);

  const [input, setInput] = useState({
    username: ""
  });
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("");
  const [picModal, setPicModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUsername = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const manageSelectedFile = async (e) => {

    setUploading(true);
    const selectedFile = e.target.files[0];

    let reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);
    reader.onload = function () {
      setFile(selectedFile);
    };

    await _uploadToPinata(selectedFile);

    setUploading(false);
  };

  const _uploadToPinata = async (selectedFile) => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        pinata_api_key: `d197e147935b17d3208e`,
        pinata_secret_api_key: `8dd2463b95e8afc7d062b1d41efe12e57d15ee54116d9d0e320445ce92e94882`,
        "Content-Type": "multipart/form-data",
      },
    });
    const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
    setImg(ImgHash);
  };

  return (
    <>
      <div className='signup-container'>

        <div className="signup-container-header">
          <h1>Inscrible</h1>
        </div>

        <div className="signup-container-body">
          <label htmlFor="username" className='signup-lable'>Username :</label>
          <input type="text" placeholder='Enter Username' className='signup-input' name='username' id='username' onChange={handleUsername} value={input.username} />

          <label htmlFor="address" className='signup-lable'>Address :</label>
          <input type="text" placeholder='Metamask Account Address' className='signup-input' id='address' disabled={true} value={connectedAccount} />

          <label htmlFor="btn-pic" className='signup-pic'>Choose Profile pic</label>
          <input type='file' className='d-none' name='profilePic' id='btn-pic' onChange={manageSelectedFile} />

          <button className='signup-button' disabled={uploading}
            onClick={async () => {
              if (input.username === "" || img === "") {
                notify("Please Enter Username and Profile Pic!");
              }
              else {
                const isRegistered = await CheckIfUserIsRegistered(connectedAccount);
                if (isRegistered) {
                  notify("User Already Exists. Go to SignIn !");
                }
                else {
                  await RegisterUser(input.username, img);
                  navigate('/');
                }
              }
            }}
          >
            Create
          </button>
        </div>
        <div className='link-signin'>
          Already have an Account?
          <span
            onClick={() => {
              navigate('/');
            }}
          >
            SignIn
          </span>
        </div>
      </div>
      {picModal && (<ProfilePic closeModal={setPicModal} />)}
    </>
  );
};

export default SignUp;
