import React, {useState} from 'react';
import {View, Text, Image, Button} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const App = () => {
  const [state, setState] = useState({photo: null});

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setState({photo: response});
      }
    });
  };

  const createFormData = (photo, body) => {
    const data = new FormData();

    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri,
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  const handleUploadPhoto = () => {
    const options = {
      url: 'http://172.16.0.155:3000/api/upload',
      method: 'POST',
      data: createFormData(state.photo, {userId: '123'}),
    };

    axios(options)
      .then(response => {
        console.log('Upload feito com sucesso', response);
        alert('Upload feito com sucesso!');
        setState({photo: null});
      })
      .catch(error => {
        console.log('Upload falhou', error);
        alert('Upload falhou!');
      });

    //  fetch('', {
    //    method: 'POST',
    //    body: createFormData(state.photo, {userId: '123'}),
    //  })
    //    .then(response => response.json())
    //    .then(response => {
    //      console.log('upload succes', response);
    //      alert('Upload success!');
    //      setState({photo: null});
    //    })
    //    .catch(error => {
    //      console.log('upload error', JSON.stringify(error));
    //      alert('Upload failed!');
    //    });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {state.photo && (
        <>
          <Image
            source={{uri: state.photo.uri}}
            style={{width: 300, height: 300}}
          />
          <Button
            title="Upload Foto"
            onPress={handleUploadPhoto}
            color="black"
          />
        </>
      )}
      <Button title="Escolher foto" onPress={handleChoosePhoto} />
    </View>
  );
};

export default App;
