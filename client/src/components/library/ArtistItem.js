import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import placeholder from '../layout/placeholder.png';
import LibraryContext from '../../context/library/libraryContext';
import useAPIRequest from '../../utils/useAPIRequest';
import LoadingSpinner from '../layout/LoadingSpinner';

const ArtistItem = ({ artist, toggleTrackingSetConfig }) => {
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

  const toggleTracking = e => {
    toggleTrackingSetConfig({
      url: '/api/library',
      method: 'put',
      params: { artistid: e }
    });
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
        <Fragment>
          <input
            type='button'
            value='Set current'
            onClick={() => setCurrentArtist(artist)}
          />
          {!artist.isArchived && (
            <input
              type='button'
              value='Toggle tracking'
              onClick={() => toggleTracking(artist._id)}
            />
          )}
        </Fragment>
      )}
    </div>
  );
};

ArtistItem.propTypes = {
  artist: PropTypes.object.isRequired
};

export default ArtistItem;
