import React from 'react';
import Banner from '../../../../components/Banner';
import PhotoForm from '../../components/PhotoForm';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto, updatePhoto } from 'features/Photo/photoSlice';
import { useHistory, useParams } from 'react-router-dom';
import { randomNumber } from 'utils/common';

AddEditPage.propTypes = {
    
};

function AddEditPage(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const {photoId} = useParams();
 
  const isAddMode = !photoId;

  const editedPhoto = useSelector( state => {
    return state.photos.find( x=> x.id === +photoId)});

  const initialValues = isAddMode ?
    {
        title: '',
        categoryId: null,
        photo: '',
    } : editedPhoto ; 

  const handleSubmit = (value)=> {
    if(isAddMode) {
      const newPhoto = {
        ...value,
        id: randomNumber(10000,99999),
      }
      const action =addPhoto(newPhoto);
      dispatch(action);
    }else {
      const action = updatePhoto(value);
      dispatch(action);
    }
    history.push('/photos');
  }

    return (
        <div className="photo-edit">
          <Banner title="Pick your amazing photo 😎" />
    
          <div className="photo-edit__form">
            <PhotoForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              isAddMode = {isAddMode}
            />
          </div>
        </div>
      );
}

export default AddEditPage;