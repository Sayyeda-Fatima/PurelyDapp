import React, { useState, useContext, useEffect } from "react";
import "./ProfileHeader.css";
import { ProfilePosts, ProfileUserCard } from "../Index";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { InscribleContext } from "../../Context/Context";

const ProfileHeader = ({}) => {
  const [isPost, setIsPost] = useState(true);
  const [isFollower, setIsFollower] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowingBtn, setIsFollowingBtn] = useState(false);
  const [followerListing, setfollowerListing] = useState([]);
  const [followingList, setfollowingList] = useState([]);
  const {
    userLists,
    addFriends,
    removeFriends,
    checkAlreadyFriend,
    ConnectWallet,
    connectedAccount,
    contract,
    getMyProfilePost,
    myProfilePosts,
  } = useContext(InscribleContext);

  const getFollowers = async () => {
    const followerListing = await contract.getMyFollowersList(address);
    setfollowerListing(followerListing);
  };

  const getFollowing = async () => {
    const followingList = await contract.getMyFollowingsList(address);
    setfollowingList(followingList);
  };

  useEffect(() => {
    const checkFriends = async () => {
      const isFollowStatus = await checkAlreadyFriend({
        connectedAccountAddress: connectedAccount,
        accountAddress: address,
      });
      setIsFollowingBtn(isFollowStatus);
      console.log("isFollowStatus    " + isFollowStatus);
    };

    checkFriends();
    getFollowing();
    getFollowers();
    getMyProfilePost(address);
  }, [connectedAccount, contract]);

  const { username, address } = useParams();

  // Function to handle the follow/unfollow action
  const handleFollowToggle = async () => {
    if (isFollowingBtn) {
      // Perform the unfollow action
      await removeFriends({ accountAddress: address });
      setIsFollowingBtn(false); // Update the state to reflect unfollowing
      await getFollowers(); // Update the follower list
    } else {
      // Perform the follow action
      await addFriends({ accountAddress: address });
      setIsFollowingBtn(true); // Update the state to reflect following
      await getFollowers(); // Update the follower list
    }
  };

  const users = [
    {
      name: "Anna Wintour",
      pic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      address: "0x00030503554385247875847200048nt2457vn",
    },
    {
      name: "Alia Chaudhary",
      pic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      address: "0x00030503554385247875847200048nt2457vn",
    },
    {
      name: "Nathan Freeman",
      pic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      address: "0x00030503554385247875847200048nt2457vn",
    },
    {
      name: "Samuel Drake",
      pic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      address: "0x00030503554385247875847200048nt2457vn",
    },
  ];

  return (
    <>
      <div className="profile-header">
        <div className="profile-header_image">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?
                        ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=
                        format&fit=crop&w=1170&q=80"
            alt="Pofile"
          />
        </div>
        <div className="profile-header_content">
          <div className="profile-header_content-name-edit">
            <p id="profile-name" className="bold-5 size-l">
              {username}
            </p>
            <button
              onClick={() =>
                addFriends({ name: username, accountAddress: address })
              }
            >
              Follow
            </button>
            <button
              onClick={() =>
                removeFriends({ name: username, accountAddress: address })
              }
            >
              UnFollow
            </button>
          </div>
          <div className="profile-header_content-info">
            <div>
              <span className="bold-5">12</span>
              <span
                className={isPost ? "bold-7" : ""}
                onClick={() => {
                  setIsFollower(false);
                  setIsFollowing(false);
                  setIsPost(true);
                }}
              >
                {" "}
                Posts
              </span>
            </div>
            <div>
              <span className="bold-5">12</span>
              <span
                className={isFollower ? "bold-7" : ""}
                onClick={() => {
                  setIsFollower(true);
                  setIsFollowing(false);
                  setIsPost(false);
                }}
              >
                {" "}
                Followers
              </span>
            </div>
            <div>
              <span className="bold-5">12</span>
              <span
                className={isFollowing ? "bold-7" : ""}
                onClick={() => {
                  setIsFollower(false);
                  setIsFollowing(true);
                  setIsPost(false);
                }}
              >
                {" "}
                Following
              </span>
            </div>
          </div>
        </div>
      </div>

      {isPost && <ProfilePosts />}

      {isFollower && (
        <div className="profile-usercard-container">
          <div className="profile-usercard-header">
            <h3>Followers</h3>
          </div>
          <div className="profile-usercard-body">
            {users.map((item, i) => {
              return (
                <ProfileUserCard
                  userName={item.name}
                  profilePic={item.pic}
                  address={item.address}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      )}

      {isFollowing && (
        <div className="profile-usercard-container">
          <div className="profile-usercard-header">
            <h3>Following</h3>
          </div>
          <div className="profile-usercard-body">
            {users.map((item, i) => {
              return (
                <ProfileUserCard
                  userName={item.name}
                  profilePic={item.pic}
                  address={item.address}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;
