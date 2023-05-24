//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;

contract Inscrible {
    
    //USER STRUCT
    struct User{
        string username;
        friend[] friendList;
        // string profilePic; do add later
    }

    struct AllUserStruck{
        string username;
        address accountAddress;
    }

    AllUserStruck[] AllUsers;
    
   struct friend{
        address pubkey;
        string name;
    }
    //POST COUNT
    uint postCount = 0;

    //CONTAINING ALL THE POSTS UPLOADED BY USERS
    struct Post{
        string createrName;
        address payable userAddress;
        string imageHash;
        string caption;
        string imageText;
        uint256  tipAmount;
        uint256 id;
        uint likeCount;
        string [] likedByUser;
    }


    mapping(address=>User) userList;
    mapping(address=>Post[]) singleUserPostList;
    Post [] allposts;


    //FUNCTIONS----------------------------

    //CHECK IS A USER HAS AN ACCOUNT
    function checkUser(address key) public view returns(bool){
        if(AllUsers.length > 0)
        return bytes(userList[key].username).length > 0;
        else{
            return false;
        }
    }

    //GET USER NAME
    function getUsername(address key) public view returns(string memory){
        return userList[key].username;
    }

    //CREATE ACCOUNT
    function createAccount(string calldata _username) external {
        require(checkUser(msg.sender) == false, "User alredy has an account!");
        require(bytes(_username).length > 0, "User name should not be empty!");

        userList[msg.sender].username = _username;
        AllUsers.push(AllUserStruck(_username, msg.sender));
    }
    //addFriend
     function addFriend(address friend_key, string calldata name) external{
        require(checkUser(msg.sender), "Create an account first");
        require(checkUser(friend_key), "User is not registered!");
        require(msg.sender != friend_key, "Users cannot add themeselves as friends");
        require(checkAlreadyFriends(msg.sender, friend_key)== false, "These users are already friends");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].username);
    }

    //checkAlreadyFriend
    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns (bool){

        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for(uint256 i = 0; i < userList[pubkey1].friendList.length; i++){
            
            if(userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }
        return false;
    }

    //_AddFriend
    function _addFriend(address me, address friend_key, string memory name) internal{
        friend memory newFriend = friend(friend_key, name);
       userList[me].friendList.push(newFriend);
    }

    //GETMY FRIEND
    function getMyFriendList() external view returns(friend[] memory){
        return userList[msg.sender].friendList;
    }

    //TO POST IMAGES TO BLOCKCHAIN
    function addPostImage(string memory _imgHash, string memory desc, string memory imgText) public 
    {   
        require(checkUser(msg.sender), "User not registered!");
        require(bytes(_imgHash).length > 0);
        postCount++;
        Post memory newPost = Post({
            createrName: userList[msg.sender].username,
            userAddress: payable(msg.sender),
            imageHash: _imgHash,
            caption: desc,
            imageText: imgText,
            tipAmount:0,
            id:postCount,
            likeCount:0,
            likedByUser : new string[](0)         
        });

        singleUserPostList[msg.sender].push(newPost);
        allposts.push(newPost);
    }

    function getAllPosts() public view returns(Post [] memory){
        return allposts;
    }
    
   function getAllAppUser() public view returns(AllUserStruck[] memory){
        return AllUsers;
    }

    function getSingleUserPost(address key) public view returns(Post [] memory) {
        if (singleUserPostList[key].length > 0) {
            return singleUserPostList[key];
        } else {
            return new Post[](0);
        }
    }

    function getSingleUserLatestPost(address key) public view returns(Post memory){
        
            return  singleUserPostList[key][singleUserPostList[key].length-1]; 
        
    } 
    function removeFriend(address friendAddress) public {
        uint256 friendIndex;
        bool found = false;

        // Find the index of the friend in the array
        for (uint256 i = 0; i < userList[msg.sender].friendList.length; i++) {
            if (userList[msg.sender].friendList[i].pubkey == friendAddress) {
                friendIndex = i;
                found = true;
                break;
            }
        }

        // If the friend is found, remove it
        if (found) {
            // Replace the element at friendIndex with the last element
            userList[msg.sender].friendList[friendIndex] = userList[msg.sender].friendList[userList[msg.sender].friendList.length - 1];
            // Reduce the size of the array by one
            userList[msg.sender].friendList.pop();
    }
    }

    
    receive() external payable {}
}