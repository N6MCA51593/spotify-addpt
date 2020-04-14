import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import placeholder from '../layout/placeholder.png';
import LibraryContext from '../../context/library/libraryContext';
import useAPIRequest from '../../utils/useAPIRequest';
import LoadingSpinner from '../layout/LoadingSpinner';

const ArtistItem = ({ artist }) => {
  const { addArtist, setCurrentArtist } = useContext(LibraryContext);

  const [{ data, isError, isLoading }, setConfig] = useAPIRequest({});

  useEffect(() => {
    if (data && !isError) {
      addArtist(data);
    }
    // eslint-disable-next-line
  }, [data, isError]);

  const add = e => {
    e.preventDefault();
    setConfig({
      url: '/api/library/add/new',
      method: 'post',
      params: { id: e.target.value }
    });
  };
  const setCurrent = e => {
    e.preventDefault();
    setCurrentArtist(artist);
  };

  return (
    <div className='card'>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <img
          src={artist.img[2] ? artist.img[2].url : placeholder}
          alt={artist.name}
        />
      )}
      <p>{artist.name}</p>
      {!artist._id ? (
        <button onClick={add} value={artist.spID}>
          Add
        </button>
      ) : (
        <button onClick={setCurrent} value={artist}>
          Set Current
        </button>
      )}
    </div>
  );
};

ArtistItem.propTypes = {
  artist: PropTypes.object.isRequired
};

export default ArtistItem;
