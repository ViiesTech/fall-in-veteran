import { View, Text, ImageBackground, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import Appassets from '../../assets/images/Appassets'
import Colors from '../../assets/utils/colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message'
import { setLoader } from '../../redux/AuthSlice'
import axios from 'axios'
import Base_Api_Url from '../../utls/Base_Api_Url'
import Profile_Image_Base_Url from '../../utls/Profile_Image_Base_Url'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
const Create = () => {

  const token = useSelector(state => state.Data.token)
  const isLoading = useSelector(state => state.Data.isLoading)
  const currentUserData = useSelector(state => state.Data.data)
  const dispatch = useDispatch()

  const [StatusText, setStatusText] = useState("")
  const [pickedImage, setpickedImage] = useState()
  const [Mode, setMode] = useState("Public")

  const [ProfilePage, setPageProfile] = useState()

  const [createPageModal, setCreatePageModal] = useState(false)

  const openLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setpickedImage(image)
    });
  }

  const SelectPageProfile = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setPageProfile(image)
    });
  }

  const CreatePost = () => {
    dispatch(setLoader(true))


    if (pickedImage == undefined && StatusText == "") {
      dispatch(setLoader(false))
      showToast('error', 'What are you trying to create?')
    } else {

      let data = new FormData();
      data.append('Post_Picture', pickedImage ? {
        name: "image",
        type: pickedImage.mime,
        uri: pickedImage.path
      }
        :
        ""
      );
      data.append('message', StatusText);
      data.append('comunityStatus', false);


      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${Base_Api_Url}CreatePost`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          showToast('success', 'Successfully created.')
          setStatusText("")
          setpickedImage("")
          dispatch(setLoader(false))

        })
        .catch((error) => {
          console.log(error);
          showToast('error', 'Not Created')
          dispatch(setLoader(false))

        });
    }
  }

  const CreatePage = () => {

    let data = new FormData()

    data.append('PageName', 'Fall in the veteran');
    data.append('Page_Profile', ProfilePage ? {
      name: 'image',
      type: ProfilePage?.mime,
      uri: ProfilePage?.path
    } : "");
    data.append('Mode', 'Public');


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${Base_Api_Url}CreatePage`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'Multipart/form-data'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg
    })
  }


  return (
    <ImageBackground source={Appassets.slide2} style={{ height: '100%', }}>
      <Text style={{ color: Colors.white, fontSize: 25, padding: 20 }}>Create</Text>

      <View style={{}}>

        <View style={{ position: 'absolute', height: '100%', opacity: 0.6, width: '90%', backgroundColor: '#707070', borderRadius: 10, alignSelf: 'center' }}>
        </View>

        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Create Post</Text>

            <TouchableOpacity>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 1, width: '100%', backgroundColor: 'white', marginTop: 10, marginBottom: 10 }} />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>

            <View style={{ flexDirection: 'row' }}>

              {
                currentUserData ?
                  <Image source={{ uri: `${Profile_Image_Base_Url}${currentUserData.Profile_Picture}` }} style={{ height: 40, width: 40, borderRadius: 200 }} />
                  :

                  <Ionicons
                    name={'person'}
                    color={'white'}
                    size={30}
                    style={{ height: 40, width: 40, borderRadius: 200 }} />
              }

              <View style={{ marginLeft: 10, }}>
                <Text style={{ color: 'white' }}>{currentUserData.name}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                  <FontAwesome5
                    name={'user-friends'}
                    color={'white'}
                    size={15}

                  />
                  <Text style={{ color: 'white', marginLeft: 5 }}>Friends</Text>

                  <Text style={{ color: 'white', marginLeft: 10, fontSize: 20 }}>+</Text>
                  <Text style={{ color: 'white', marginLeft: 5 }}>Friends</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity onPress={() => CreatePost()} style={{ padding: 20, backgroundColor: Colors.red, borderRadius: 10, paddingVertical: 10 }}>
              <Text style={{ color: 'white' }}>Post</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="What's on your mind?"
            placeholderTextColor={'white'}
            style={{
              width: '90%', alignSelf: 'center', marginTop: 10, fontSize: 12, color: 'white', textAlignVertical: 'top' // Set text alignment to top
            }}
            multiline={true}
            numberOfLines={5}
            onChangeText={(txt) => {
              setStatusText(txt)
            }}
            value={StatusText}
          />

          {
            pickedImage &&

            <Image source={{ uri: pickedImage.path }} style={{ height: 100, width: '90%', alignSelf: 'center', borderRadius: 10 }} />
          }

          <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', alignSelf: 'center', marginTop: 10, justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => openLibrary()} style={{ height: 50, width: '45%', borderWidth: 1, borderColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <EvilIcons
                name={'image'}
                color={'white'}
                size={25}
              />
              <Text style={{ color: 'white', marginLeft: 10 }}>Photos</Text>
            </TouchableOpacity>


            <TouchableOpacity style={{ height: 50, width: '45%', borderWidth: 1, borderColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <AntDesign
                name={'tago'}
                color={'white'}
                size={20}
              />
              <Text style={{ color: 'white', marginLeft: 10 }}>Tag People</Text>
            </TouchableOpacity>
          </View>



        </View>


      </View>

      <TouchableOpacity onPress={() => setCreatePageModal(true)} style={{ height: 50, width: '90%', alignSelf: 'center', backgroundColor: Colors.red, marginTop: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: Colors.white, fontSize: 18, fontWeight: 'bold' }}>Create Page</Text>
      </TouchableOpacity>

      {
        //Create Page
      }
      <Modal style={{ margin: 0 }} isVisible={createPageModal} animationIn={'fadeIn'} animationOut={'fadeOut'}>
        <View style={{ backgroundColor: Colors.black, padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 'bold' }}>Create Page</Text>

            <TouchableOpacity onPress={() => setCreatePageModal(false)} style={{ borderWidth: 1, borderColor: Colors.white, alignSelf: 'flex-end', borderRadius: 200, height: 25, width: 25, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: Colors.white, fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity onPress={() => SelectPageProfile()} style={{ marginTop: 20, alignSelf: 'center', padding: 5, borderWidth: 1, borderColor: Colors.white, borderRadius: 200 }}>

            {
              ProfilePage ?

                <Image source={{ uri: ProfilePage.path }} style={{ height: 80, width: 80, alignSelf: 'center', borderRadius: 100 }} />
                :

                <Ionicons
                  name={'person'}
                  color={Colors.white}
                  size={50}
                />
            }





          </TouchableOpacity>

          <TextInput
            placeholder='Enter your page name'
            placeholderTextColor={'white'}
            style={{ borderWidth: 1, borderRadius: 10, borderColor: Colors.white, marginTop: 20, paddingHorizontal: 15, color: Colors.white }}

          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => setMode("Public")} style={{ borderColor: Colors.white, borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, marginTop: 20, paddingVertical: 10, width: '49%', alignItems: 'center', justifyContent: 'center ' }}>
              <Text style={{ color: Colors.white, fontSize: 15, fontWeight: 'bold' }}>Public</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMode("Private")} style={{ borderColor: Colors.white, borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, marginTop: 20, paddingVertical: 10, width: '49%', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: Colors.white, fontSize: 15, fontWeight: 'bold' }}>Private</Text>
            </TouchableOpacity>

          </View>

          <TouchableOpacity onPress={() => CreatePage()} style={{ height: 50, width: '100%', alignSelf: 'center', backgroundColor: Colors.red, marginTop: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 20 }}>Create</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </ImageBackground>
  )
}

export default Create